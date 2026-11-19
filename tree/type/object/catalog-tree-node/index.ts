import type { TreeNode } from '$stylist/tree/type/object/tree-node';

/** Tree node built from a flat catalog row; `row` keeps every original column. */
export type CatalogTreeNode = TreeNode & {
	row: Record<string, unknown>;
	children: CatalogTreeNode[];
	/** Number of nodes below this one. */
	descendants: number;
};
