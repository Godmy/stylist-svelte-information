<script lang="ts">
	// Render of index.story.ts: onSelect is a required callback, the story keeps the selected table.
	import TableListPanel from '$stylist/table/component/organism/table-list-panel/index.svelte';
	import type { RecipeTableListPanel } from '$stylist/table/interface/recipe/table-list-panel';

	let args: Partial<RecipeTableListPanel> = $props();
	let picked = $state<string | null>(null);
	const selectedName = $derived(picked ?? args.selectedName ?? null);
</script>

<TableListPanel
	{...args}
	items={args.items ?? []}
	{selectedName}
	onSelect={(name) => (picked = name)}
/>
