import type { TreeNodeItemNode } from '$stylist/tree/type/object/tree-node-item-node';

export interface RecipeTreeNodeItem {
	[key: string]: unknown;
	node: TreeNodeItemNode;
	expandedNodes?: Set<string>;
	class?: string;
	faIcon?: boolean;
	secondaryIcon?: string;
	onSelectCallback?: (key: string) => void;
	onNodeSelect?: (node: TreeNodeItemNode) => void;
	onNodeToggle?: (node: TreeNodeItemNode) => void;
}
