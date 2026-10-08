import type { TreeNode } from '$stylist/tree/type/object/tree-node';
import type { HTMLAttributes } from 'svelte/elements';
export interface RecipeTree extends HTMLAttributes<HTMLDivElement> {
	nodes: TreeNode[];
	selectedId?: string;
	onSelect?: (node: TreeNode) => void;
	class?: string;
}
