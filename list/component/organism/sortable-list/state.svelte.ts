import type { SlotSortableListItem as SortableListItem } from '$stylist/list/interface/slot/sortable-list-item';
import type { SlotSortableList as SortableListProps } from '$stylist/list/interface/slot/sortable-list';

export function createSortableListState(props: SortableListProps) {
	const rootClass = $derived(['c-sortable-list', props.class].filter(Boolean).join(' '));
	let dragged = $state<SortableListItem | null>(null);
	let overIndex = $state<number | null>(null);

	function start(item: SortableListItem) {
		if (!props.disabled) {
			dragged = item;
		}
	}

	function handleDragOver(index: number) {
		overIndex = index;
	}

	function drop(index: number) {
		if (!dragged) {
			return;
		}

		const nextItems = [...props.items];
		const from = nextItems.findIndex((item) => item.id === dragged?.id);
		const [movedItem] = nextItems.splice(from, 1);
		nextItems.splice(index, 0, movedItem);
		props.onItemsChange?.(nextItems);
		dragged = null;
		overIndex = null;
	}

	function endDrag() {
		dragged = null;
		overIndex = null;
	}

	return {
		get rootClass() {
			return rootClass;
		},
		get dragged() {
			return dragged;
		},
		get overIndex() {
			return overIndex;
		},
		start,
		handleDragOver,
		drop,
		endDrag
	};
}

export default createSortableListState;
