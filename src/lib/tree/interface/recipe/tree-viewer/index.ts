import type { ComputeIntersectAll } from '$stylist/theme/type/compute/intersect-all';
import type { TreeNodeItemNode } from '$stylist/tree/type/object/tree-node-item-node';
export interface RecipeTreeViewer extends ComputeIntersectAll<[]> {
	tree?: TreeNodeItemNode[];
	onSelect?: (detail: { node: TreeNodeItemNode }) => void;
	onSelectCallback?: (key: string | undefined) => void;
	onToggleCallback?: (key: string | undefined) => void;
	onExpand?: (detail: { node: TreeNodeItemNode }) => void;
	onCollapse?: (detail: { node: TreeNodeItemNode }) => void;
	itemHeight?: number;
	visibleItemCount?: number;
	bufferSize?: number;
	class?: string;
}
