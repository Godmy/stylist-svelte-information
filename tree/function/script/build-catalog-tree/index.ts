import type { CatalogTreeNode } from '$stylist/tree/type/object/catalog-tree-node';

/**
 * Builds a tree from flat rows linked by a parent column. Rows whose parent is
 * missing, or that sit on a parent cycle, become roots, so no row is ever lost.
 * Siblings are sorted by weight (a larger `weightKey` value comes first; missing or non-numeric is 0),
 * then branches before leaves, then by label.
 */
export function buildCatalogTree(
	rows: readonly Record<string, unknown>[],
	options: { idKey?: string; parentKey?: string; labelKey?: string; weightKey?: string } = {}
): CatalogTreeNode[] {
	const { idKey = 'id', parentKey = 'parent_id', labelKey = 'caption', weightKey = 'weight' } = options;
	const weight = (node: CatalogTreeNode) => {
		const value = Number(node.row[weightKey]);
		return Number.isFinite(value) ? value : 0;
	};
	const nodes = new Map<string, CatalogTreeNode>();
	for (const row of rows) {
		const id = String(row[idKey] ?? '');
		if (!id || nodes.has(id)) continue;
		const label = row[labelKey];
		nodes.set(id, {
			id,
			label: label === null || label === undefined || label === '' ? id : String(label),
			row,
			children: [],
			descendants: 0
		});
	}
	const parentOf = (id: string) => {
		const parent = nodes.get(id)?.row[parentKey];
		return parent === null || parent === undefined || parent === '' ? null : String(parent);
	};
	const onCycle = (id: string) => {
		const seen = new Set([id]);
		for (let next = parentOf(id); next !== null && nodes.has(next); next = parentOf(next)) {
			if (seen.has(next)) return true;
			seen.add(next);
		}
		return false;
	};
	const roots: CatalogTreeNode[] = [];
	for (const node of nodes.values()) {
		const parent = parentOf(node.id);
		const target = parent === null ? undefined : nodes.get(parent);
		if (target && !onCycle(node.id)) target.children.push(node);
		else roots.push(node);
	}
	const finish = (list: CatalogTreeNode[]): number => {
		list.sort(
			(a, b) =>
				weight(b) - weight(a) ||
				Number(b.children.length > 0) - Number(a.children.length > 0) ||
				a.label.localeCompare(b.label)
		);
		let total = 0;
		for (const node of list) {
			node.descendants = finish(node.children);
			total += node.descendants + 1;
		}
		return total;
	};
	finish(roots);
	return roots;
}
