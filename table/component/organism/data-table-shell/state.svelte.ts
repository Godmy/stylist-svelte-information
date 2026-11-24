import { untrack } from 'svelte';
import type { RecipeDataTableShell } from '$stylist/table/interface/recipe/data-table-shell';
import { ObjectManagerTableControls } from '$stylist/table/class/manager/table-controls';
import { toSet } from '$stylist/theme/function/script/collection/to-set';
import { unique } from '$stylist/theme/function/script/collection/unique';

type Row = Record<string, unknown>;

export function createDataTableShellState(props: RecipeDataTableShell<Row>) {
	let searchTerm = $state('');
	let pageSize = $state(props.defaultPageSize ?? 10);
	let currentPage = $state(1);
	let sortKey = $state<string | null>(null);
	let sortDirection = $state<'asc' | 'desc'>('asc');
	let pillFilters = $state<Record<string, string[]>>({});
	let columnVisibility = $state<Record<string, boolean>>(
		Object.fromEntries(props.schema.map((col) => [String(col.key), !(col.hidden ?? false)]))
	);

	let columnsOpen = $state(false);
	/** Storage may be missing or blocked (private mode); the table then works without it. */
	const store = (key: string | undefined, value: unknown) => {
		if (!key) return;
		try {
			localStorage.setItem(key, JSON.stringify(value));
		} catch {
			// Settings live until the page is reloaded.
		}
	};
	// Runs after hydration, so the server markup always shows the defaults.
	// Only the storage keys are tracked: a new key (another table) restores its own settings.
	$effect(() => {
		const panelKey = props.storageKey;
		const columnsKey = props.columnsStorageKey;
		untrack(() => restore(panelKey, columnsKey));
	});
	function restore(panelKey: string | undefined, columnsKey: string | undefined) {
		try {
			const open = panelKey ? JSON.parse(localStorage.getItem(panelKey) ?? 'null') : null;
			if (typeof open === 'boolean') columnsOpen = open;
			const saved = columnsKey ? JSON.parse(localStorage.getItem(columnsKey) ?? 'null') : null;
			if (saved && typeof saved === 'object' && !Array.isArray(saved)) {
				const known = toSet(props.schema.map((col) => String(col.key)));
				columnVisibility = {
					...columnVisibility,
					...Object.fromEntries(
						Object.entries(saved).filter(
							([key, value]) => known.has(key) && typeof value === 'boolean'
						)
					)
				};
			}
		} catch {
			// Unreadable settings fall back to the defaults.
		}
	}
	const toggleColumns = () => {
		columnsOpen = !columnsOpen;
		store(props.storageKey, columnsOpen);
	};

	const sort = (columnKey: string) => {
		if (sortKey === columnKey) {
			sortDirection = sortDirection === 'asc' ? 'desc' : 'asc';
		} else {
			sortKey = columnKey;
			sortDirection = 'asc';
		}
		currentPage = 1;
	};

	const togglePill = (columnKey: string, value: string) => {
		const current = pillFilters[columnKey] ?? [];
		const next = current.includes(value) ? current.filter((v) => v !== value) : [...current, value];
		pillFilters = { ...pillFilters, [columnKey]: next };
		currentPage = 1;
	};

	const setSearch = (value: string) => {
		searchTerm = value;
		currentPage = 1;
	};
	const setPageSize = (value: number) => {
		pageSize = value;
		currentPage = 1;
	};
	const toggleColumn = (key: string) => {
		columnVisibility = { ...columnVisibility, [key]: !columnVisibility[key] };
		store(props.columnsStorageKey, columnVisibility);
	};
	const setColumnVisibility = (nextVisibility: Record<string, boolean>) => {
		columnVisibility = { ...columnVisibility, ...nextVisibility };
		store(props.columnsStorageKey, columnVisibility);
	};
	const goPrev = () => {
		if (currentPage > 1) currentPage -= 1;
	};
	const goNext = () => {
		if (currentPage < totalPages) currentPage += 1;
	};

	const visibleSchema = $derived(
		props.schema.filter((col) => columnVisibility[String(col.key)] !== false)
	);

	const pillFilterKeys = $derived(
		props.schema.filter((col) => col.filterable === 'pills').map((col) => String(col.key))
	);

	const pillOptions = $derived(
		Object.fromEntries(
			pillFilterKeys.map((key) => [key, unique(props.data.map((row) => String(row[key] ?? '')))])
		)
	);

	const filtered = $derived.by(() => {
		let result = props.data;
		if (searchTerm) {
			const q = searchTerm.toLowerCase();
			result = result.filter((row) =>
				Object.values(row).some((v) =>
					String(v ?? '')
						.toLowerCase()
						.includes(q)
				)
			);
		}
		for (const [key, values] of Object.entries(pillFilters)) {
			if (values.length > 0)
				result = result.filter((row) => values.includes(String(row[key] ?? '')));
		}
		return result;
	});

	const sorted = $derived(ObjectManagerTableControls.sortData(filtered, sortKey, sortDirection));
	const totalPages = $derived(Math.max(1, Math.ceil(sorted.length / pageSize)));
	const pageData = $derived(sorted.slice((currentPage - 1) * pageSize, currentPage * pageSize));

	return {
		get searchTerm() {
			return searchTerm;
		},
		get pageSize() {
			return pageSize;
		},
		get currentPage() {
			return currentPage;
		},
		get sortKey() {
			return sortKey;
		},
		get sortDirection() {
			return sortDirection;
		},
		get pillFilters() {
			return pillFilters;
		},
		get columnsOpen() {
			return columnsOpen;
		},
		toggleColumns,
		get columnVisibility() {
			return columnVisibility;
		},
		get visibleSchema() {
			return visibleSchema;
		},
		get pillOptions() {
			return pillOptions;
		},
		get filtered() {
			return filtered;
		},
		get sorted() {
			return sorted;
		},
		get totalPages() {
			return totalPages;
		},
		get pageData() {
			return pageData;
		},
		sort,
		togglePill,
		setSearch,
		setPageSize,
		toggleColumn,
		setColumnVisibility,
		goPrev,
		goNext
	};
}
