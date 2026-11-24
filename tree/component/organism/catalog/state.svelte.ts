import type { RecipeCatalog } from '$stylist/tree/interface/recipe/catalog';
import type { CatalogField } from '$stylist/tree/type/object/catalog-field';
import type { CatalogTreeNode } from '$stylist/tree/type/object/catalog-tree-node';
import { buildCatalogTree } from '$stylist/tree/function/script/build-catalog-tree';
import { filterCatalogTree } from '$stylist/tree/function/script/filter-catalog-tree';
import createTreeExpansionState from '$stylist/tree/function/state/tree-expansion/state.svelte';
import { indexBy } from '$stylist/theme/function/script/collection/index-by';
import { toSet } from '$stylist/theme/function/script/collection/to-set';

type Draft = Record<string, string | boolean | null>;

const empty = (value: unknown) => value === null || value === undefined || value === '';

/** Editor value of a column: booleans stay tri-state, everything else becomes text. */
function draftValue(field: CatalogField, value: unknown): string | boolean | null {
	if (field.kind === 'boolean') return empty(value) ? null : Boolean(Number(value));
	if (empty(value)) return '';
	return typeof value === 'object' ? JSON.stringify(value) : String(value);
}

/** Stored value of an editor value: booleans become 1/0, empty nullable text becomes null. */
function storedValue(field: CatalogField, value: string | boolean | null): unknown {
	if (field.kind === 'boolean') return value === null ? null : value ? 1 : 0;
	if (value === '' && (field.nullable || field.kind === 'reference')) return null;
	return value;
}

export function createCatalogState(getProps: () => RecipeCatalog) {
	const props = $derived(getProps());
	const idKey = $derived(props.idKey ?? 'id');
	const parentKey = $derived(props.parentKey ?? 'parent_id');
	const labelKey = $derived(props.labelKey ?? 'caption');

	const fields: CatalogField[] = $derived(
		props.fields ??
			Object.keys(props.rows[0] ?? {}).map((key) => ({
				key,
				header: key,
				editable: key !== idKey
			}))
	);
	let visibility = $state<Record<string, boolean>>({});
	const isVisible = (field: CatalogField) => visibility[field.key] ?? field.visible ?? false;
	const chipFields = $derived(
		fields.filter(
			(field) => isVisible(field) && field.key !== labelKey && field.key !== props.badgeKey
		)
	);
	const columns = $derived(
		fields
			.filter((field) => field.key !== labelKey)
			.map((field) => ({ key: field.key, header: field.header, visible: isVisible(field) }))
	);
	let labelsOpen = $state(false);
	/** Saves the label panel state; storage may be missing or blocked, the page works without it. */
	function persist() {
		if (!props.storageKey) return;
		try {
			localStorage.setItem(props.storageKey, JSON.stringify({ open: labelsOpen, visibility }));
		} catch {
			// Private mode or blocked storage: settings live until the page is reloaded.
		}
	}
	// Runs after hydration, so the server markup (panel closed, default labels) always matches.
	$effect(() => {
		const key = props.storageKey;
		if (!key) return;
		try {
			const saved = JSON.parse(localStorage.getItem(key) ?? 'null');
			if (!saved || typeof saved !== 'object') return;
			if (typeof saved.open === 'boolean') labelsOpen = saved.open;
			if (saved.visibility && typeof saved.visibility === 'object')
				visibility = Object.fromEntries(
					Object.entries(saved.visibility).filter(([, value]) => typeof value === 'boolean')
				) as Record<string, boolean>;
		} catch {
			// Unreadable settings fall back to the defaults.
		}
	});
	function toggleLabels() {
		labelsOpen = !labelsOpen;
		persist();
	}
	function setColumns(next: { key: string; visible: boolean }[]) {
		visibility = { ...visibility, ...Object.fromEntries(next.map((c) => [c.key, c.visible])) };
		persist();
	}

	const tree = $derived(buildCatalogTree(props.rows, { idKey, parentKey, labelKey }));
	const nodes = $derived.by(() => {
		const flatten = (list: CatalogTreeNode[]): CatalogTreeNode[] =>
			list.flatMap((node) => [node, ...flatten(node.children)]);
		return indexBy(flatten(tree), (node) => node.id);
	});
	/** Rows in tree order with their depth, for reference pickers. */
	const outline = $derived.by(() => {
		const list: { node: CatalogTreeNode; depth: number }[] = [];
		const walk = (items: CatalogTreeNode[], depth: number) => {
			for (const node of items) {
				list.push({ node, depth });
				walk(node.children, depth + 1);
			}
		};
		walk(tree, 0);
		return list;
	});

	let query = $state('');
	const searchKeys = $derived(fields.filter((field) => field.kind !== 'json').map((f) => f.key));
	const visibleTree = $derived(filterCatalogTree(tree, query, searchKeys));
	const searching = $derived(query.trim() !== '');

	const expansion = createTreeExpansionState();
	// Branches start collapsed; search opens every match.
	const isOpen = (node: CatalogTreeNode, _depth: number) =>
		searching || (expansion.expanded[node.id] ?? false);
	function toggle(node: CatalogTreeNode, depth: number) {
		expansion.toggle(node.id, !isOpen(node, depth));
	}
	function setAll(open: boolean) {
		for (const node of nodes.values()) if (node.children.length) expansion.toggle(node.id, open);
	}

	let selectedId = $state(getProps().selectedId ?? '');
	const selected = $derived(nodes.get(selectedId));
	const original: Draft = $derived(
		Object.fromEntries(
			fields.map((field) => [field.key, draftValue(field, selected?.row[field.key])])
		)
	);
	// Overridable: edits write here; a new row object (after saving) resets it.
	let draft: Draft = $derived({ ...original });
	const changedKeys = $derived(
		fields.filter((field) => draft[field.key] !== original[field.key]).map((f) => f.key)
	);
	let saving = $state(false);
	let status = $state<{ tone: 'error' | 'success'; text: string } | null>(null);

	function select(id: string) {
		selectedId = id;
		status = null;
		// Opening the ancestors keeps the chosen row visible when it was picked outside the tree.
		for (let next = nodes.get(id)?.row[parentKey]; !empty(next);) {
			const parent = nodes.get(String(next));
			if (!parent) break;
			expansion.toggle(parent.id, true);
			next = parent.row[parentKey];
		}
	}
	function setValue(key: string, value: string | boolean | null) {
		draft = { ...draft, [key]: value };
		status = null;
	}
	function discard() {
		draft = { ...original };
		status = null;
	}

	/** Ids that cannot become the parent of the selected row: itself and its subtree. */
	const blockedParents = $derived.by(() => {
		const subtree = (node: CatalogTreeNode): string[] => [
			node.id,
			...node.children.flatMap(subtree)
		];
		return toSet(selected ? subtree(selected) : []);
	});
	const editable = (field: CatalogField) =>
		!(props.readonly || !props.onSave) && field.editable !== false;
	const options = (field: CatalogField) =>
		outline.filter(({ node }) => field.key !== parentKey || !blockedParents.has(node.id));

	/** Text of a column for chips: references resolve to the label of the referenced row. */
	function display(field: CatalogField, value: unknown): string {
		if (empty(value)) return '';
		if (field.kind === 'reference') return nodes.get(String(value))?.label ?? String(value);
		if (field.kind === 'boolean') return Number(value) ? '✓' : '✗';
		const text = String(value);
		return text.length > 48 ? `${text.slice(0, 47)}…` : text;
	}
	const badge = (node: CatalogTreeNode) => {
		const value = props.badgeKey ? node.row[props.badgeKey] : null;
		return empty(value) ? '' : (nodes.get(String(value))?.label ?? String(value));
	};
	const inactive = (node: CatalogTreeNode) =>
		props.activeKey !== undefined &&
		!empty(node.row[props.activeKey]) &&
		!Number(node.row[props.activeKey]);

	let toggling = $state<string | null>(null);
	/** Flips the visibility column of one row through `onSave`, without the editor form. */
	async function toggleActive(node: CatalogTreeNode) {
		const key = props.activeKey;
		if (key === undefined || !props.onSave || props.readonly || toggling) return;
		toggling = node.id;
		try {
			const result = await props.onSave(node.id, { [key]: inactive(node) ? 1 : 0 });
			if (typeof result === 'string') status = { tone: 'error', text: result };
		} catch (cause) {
			status = { tone: 'error', text: cause instanceof Error ? cause.message : String(cause) };
		} finally {
			toggling = null;
		}
	}

	async function save(messages: { required: (name: string) => string; saved: string }) {
		if (!selected || !props.onSave || saving || !changedKeys.length) return;
		const missing = fields.find(
			(field) =>
				field.required &&
				typeof draft[field.key] !== 'boolean' &&
				!String(draft[field.key] ?? '').trim()
		);
		if (missing) {
			status = { tone: 'error', text: messages.required(missing.header) };
			return;
		}
		const changes = Object.fromEntries(
			fields
				.filter((field) => changedKeys.includes(field.key))
				.map((field) => [field.key, storedValue(field, draft[field.key])])
		);
		saving = true;
		try {
			const result = await props.onSave(selected.id, changes);
			status =
				typeof result === 'string'
					? { tone: 'error', text: result }
					: { tone: 'success', text: messages.saved };
		} catch (cause) {
			status = { tone: 'error', text: cause instanceof Error ? cause.message : String(cause) };
		} finally {
			saving = false;
		}
	}

	return {
		get fields() {
			return fields;
		},
		get chipFields() {
			return chipFields;
		},
		get columns() {
			return columns;
		},
		get tree() {
			return tree;
		},
		get visibleTree() {
			return visibleTree;
		},
		get total() {
			return nodes.size;
		},
		get query() {
			return query;
		},
		set query(value: string) {
			query = value;
		},
		get searching() {
			return searching;
		},
		get selectedId() {
			return selectedId;
		},
		get selected() {
			return selected;
		},
		get draft() {
			return draft;
		},
		get changedKeys() {
			return changedKeys;
		},
		get saving() {
			return saving;
		},
		get status() {
			return status;
		},
		get readonly() {
			return props.readonly || !props.onSave;
		},
		get labelsOpen() {
			return labelsOpen;
		},
		get activeKey() {
			return props.activeKey;
		},
		get toggling() {
			return toggling;
		},
		toggleActive,
		toggleLabels,
		setColumns,
		isOpen,
		toggle,
		setAll,
		select,
		setValue,
		discard,
		editable,
		options,
		display,
		badge,
		inactive,
		save
	};
}

export default createCatalogState;
