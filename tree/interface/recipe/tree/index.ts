import type { Snippet } from 'svelte';
import type { TreeNode } from '$stylist/tree/type/object/tree-node';
import type { HTMLAttributes } from 'svelte/elements';
export interface RecipeTree extends HTMLAttributes<HTMLDivElement> {
	nodes: TreeNode[];
	selectedId?: string;
	onSelect?: (node: TreeNode) => void;
	onToggle?: (node: TreeNode, expanded: boolean) => void;
	/** Custom label renderer: (node, depth, selected). */
	node?: Snippet<[TreeNode, number, boolean]>;
	class?: string;
}
