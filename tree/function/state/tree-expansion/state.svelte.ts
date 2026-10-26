import type { TreeNode } from '$stylist/tree/type/object/tree-node';

export function createTreeExpansionState() {
	let expanded = $state<Record<string, boolean>>({});

	// `open` is the new state; without it a node expanded by default would need two clicks.
	function toggle(id: string, open = !expanded[id]) {
		expanded = { ...expanded, [id]: open };
	}

	function isOpen(node: TreeNode) {
		return expanded[node.id] ?? !!node.expanded;
	}

	return {
		get expanded() {
			return expanded;
		},
		toggle,
		isOpen
	};
}

export default createTreeExpansionState;
