import type { HTMLAttributes } from 'svelte/elements';
import type { SlotDragAndDropListItem } from '$stylist/list/interface/slot/drag-and-drop-list-item';
export interface RecipeDragAndDropList extends HTMLAttributes<HTMLDivElement> {
	items: SlotDragAndDropListItem[];
	class?: string;
	itemClass?: string;
	headerClass?: string;
	bodyClass?: string;
	onItemsChange?: (items: SlotDragAndDropListItem[]) => void;
	onItemDragStart?: (item: SlotDragAndDropListItem) => void;
	onItemDragEnd?: (item: SlotDragAndDropListItem) => void;
	disabled?: boolean;
	variant?: 'minimal' | 'card';
}
