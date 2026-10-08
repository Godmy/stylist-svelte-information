import type { TreeNodeItemNode } from '$stylist/tree/type/object/tree-node-item-node';
import type { RecipeTreeViewer } from '$stylist/tree/interface/recipe/tree-viewer';

export function createTreeViewerState(getProps: () => RecipeTreeViewer) {
	const props = $derived(getProps());
	const tree = $derived(props.tree ?? []);
	const itemHeight = $derived(props.itemHeight ?? 36);
	const visibleItemCount = $derived(props.visibleItemCount ?? 15);
	const bufferSize = $derived(props.bufferSize ?? 5);
	const className = $derived(props.class ?? '');

	const handleNodeSelect = (node: TreeNodeItemNode) => {
		props.onSelect?.({ node });
		props.onSelectCallback?.(node.key);
	};

	function findNodeByKey(nodes: TreeNodeItemNode[], key: string): TreeNodeItemNode | undefined {
		for (const node of nodes) {
			if (node.key === key) return node;
			const child = findNodeByKey(node.child ?? [], key);
			if (child) return child;
		}
	}

	const handleTreeNodeSelect = (id: string) => {
		const node = findNodeByKey(tree, id);
		if (node) handleNodeSelect(node);
	};

	const handleTreeNodeToggle = (id: string, expanded: boolean) => {
		const node = findNodeByKey(tree, id);
		if (!node) return;
		props.onToggleCallback?.(node.key);
		if (expanded) {
			props.onExpand?.({ node });
		} else {
			props.onCollapse?.({ node });
		}
	};

	return {
		get tree() {
			return tree;
		},
		get itemHeight() {
			return itemHeight;
		},
		get visibleItemCount() {
			return visibleItemCount;
		},
		get bufferSize() {
			return bufferSize;
		},
		get className() {
			return className;
		},
		handleNodeSelect,
		handleTreeNodeSelect,
		handleTreeNodeToggle
	};
}

export default createTreeViewerState;
