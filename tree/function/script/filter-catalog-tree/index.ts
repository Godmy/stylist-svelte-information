import type { CatalogTreeNode } from '$stylist/tree/type/object/catalog-tree-node';

/**
 * Keeps nodes whose label or any listed column contains the query (case-insensitive),
 * together with their ancestors. A matching branch keeps all of its children.
 */
export function filterCatalogTree(
	nodes: readonly CatalogTreeNode[],
	query: string,
	keys: readonly string[] = []
): CatalogTreeNode[] {
	const needle = query.trim().toLowerCase();
	if (!needle) return [...nodes];
	const matches = (node: CatalogTreeNode) =>
		node.label.toLowerCase().includes(needle) ||
		node.id.toLowerCase().includes(needle) ||
		keys.some((key) =>
			String(node.row[key] ?? '')
				.toLowerCase()
				.includes(needle)
		);
	const walk = (list: readonly CatalogTreeNode[]): CatalogTreeNode[] =>
		list.flatMap((node) => {
			if (matches(node)) return [node];
			const children = walk(node.children);
			return children.length ? [{ ...node, children }] : [];
		});
	return walk(nodes);
}
