import type { HTMLAttributes } from 'svelte/elements';
import type { SlotSortableListItem } from '$stylist/list/interface/slot/sortable-list-item';
import type { ComputeIntersectAll } from '$stylist/theme/type/compute/intersect-all';

export interface RecipeSortableList extends ComputeIntersectAll<
	[
		HTMLAttributes<HTMLDivElement>,
		{
			items: SlotSortableListItem[];
			class?: string;
			onItemsChange?: (items: SlotSortableListItem[]) => void;
			onItemAction?: (item: SlotSortableListItem, action: string) => void;
			disabled?: boolean;
			showHandle?: boolean;
			showActions?: boolean;
			variant?: 'minimal' | 'card' | 'compact';
		}
	]
> {}
