import type { SlotDragAndDropListItem as DragAndDropListItem } from '$stylist/list/interface/slot/drag-and-drop-list-item';
import type { RecipeDragAndDropList } from '$stylist/list/interface/recipe/drag-and-drop-list';

export function createDragAndDropListState(getProps: () => RecipeDragAndDropList) {
	const props = $derived(getProps());
	const items = $derived(props.items ?? []);
	const disabled = $derived(props.disabled ?? false);
	const variant = $derived(props.variant ?? 'card');
	const hostClass = $derived(props.class ?? '');
	const itemClass = $derived(props.itemClass ?? '');
	const headerClass = $derived(props.headerClass ?? '');
	const bodyClass = $derived(props.bodyClass ?? '');

	let draggedItem = $state<DragAndDropListItem | null>(null);
	let draggedOverIndex = $state<number | null>(null);
	let isDragging = $state(false);

	function handleDragStart(e: DragEvent, item: DragAndDropListItem, index: number) {
		if (disabled) return;

		e.dataTransfer?.setData('text/plain', item.id);
		draggedItem = item;
		isDragging = true;
		props.onItemDragStart?.(item);
	}

	function handleDragOver(e: DragEvent, index: number) {
		e.preventDefault();
		draggedOverIndex = index;
	}

	function handleDragLeave() {
		draggedOverIndex = null;
	}

	function handleDrop(e: DragEvent, dropIndex: number) {
		e.preventDefault();
		draggedOverIndex = null;

		if (!draggedItem) return;

		if (dropIndex !== items.findIndex((item) => item.id === draggedItem!.id)) {
			const newItems = [...items];
			const dragIndex = newItems.findIndex((item) => item.id === draggedItem!.id);
			const [removed] = newItems.splice(dragIndex, 1);
			const adjustedDropIndex = dropIndex > dragIndex ? dropIndex - 1 : dropIndex;
			newItems.splice(adjustedDropIndex, 0, removed);
			props.onItemsChange?.(newItems);
		}

		isDragging = false;
		draggedItem = null;
	}

	function handleDragEnd(item: DragAndDropListItem) {
		isDragging = false;
		draggedItem = null;
		props.onItemDragEnd?.(item);
	}

	return {
		get items() {
			return items;
		},
		get disabled() {
			return disabled;
		},
		get variant() {
			return variant;
		},
		get hostClass() {
			return hostClass;
		},
		get itemClass() {
			return itemClass;
		},
		get headerClass() {
			return headerClass;
		},
		get bodyClass() {
			return bodyClass;
		},
		get draggedItem() {
			return draggedItem;
		},
		get draggedOverIndex() {
			return draggedOverIndex;
		},
		get isDragging() {
			return isDragging;
		},
		handleDragStart,
		handleDragOver,
		handleDragLeave,
		handleDrop,
		handleDragEnd
	};
}

export default createDragAndDropListState;
