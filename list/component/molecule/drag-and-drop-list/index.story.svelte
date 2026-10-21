<script lang="ts">
	// Render of index.story.ts: the list only emits onItemsChange, so the reordered items live in local state.
	import DragAndDropList from './index.svelte';
	import type { RecipeDragAndDropList } from '$stylist/list/interface/recipe/drag-and-drop-list';
	import type { SlotDragAndDropListItem } from '$stylist/list/interface/slot/drag-and-drop-list-item';

	let args: RecipeDragAndDropList = $props();
	let reordered = $state<SlotDragAndDropListItem[] | null>(null);
	const items = $derived(reordered ?? args.items);
</script>

<div class="_c1">
	<DragAndDropList {...args} {items} onItemsChange={(updated) => (reordered = updated)} />
</div>

<style>
	._c1 {
		min-width: 0;
		max-width: 42rem;
	}
</style>
