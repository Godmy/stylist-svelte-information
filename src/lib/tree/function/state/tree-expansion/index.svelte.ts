import type { TreeNode } from '$stylist/tree/type/object/tree-node';

export function createTreeExpansionState() {
	let expanded = $state<Record<string, boolean>>({});

	function toggle(id: string) {
		expanded = { ...expanded, [id]: !expanded[id] };
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
