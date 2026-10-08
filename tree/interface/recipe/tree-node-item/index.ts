import type { TreeNodeItemNode } from '$stylist/tree/type/object/tree-node-item-node';

export interface RecipeTreeNodeItem {
	[key: string]: any;
	node: TreeNodeItemNode;
	onSelectCallback?: (key: string) => void;
}
