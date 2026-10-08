import type { TreeNode } from '$stylist/tree/type/object/tree-node';
import type { TreeNodeItemNode } from '$stylist/tree/type/object/tree-node-item-node';

export function normalizeTreeViewerNode(node: TreeNodeItemNode, index: number): TreeNode {
	return {
		id: String(node.key ?? `node-${index}`),
		label: String(node.desc ?? node.key ?? `Node ${index + 1}`),
		children: node.child?.map((child, childIndex) => normalizeTreeViewerNode(child, childIndex))
	};
}
