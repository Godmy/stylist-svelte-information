<script lang="ts">
	// Render of index.story.ts: the pill groups are controlled, the story keeps the active values onTogglePill reports.
	import FilterBar from './index.svelte';
	import type { RecipeFilterBar } from '$stylist/table/interface/recipe/filter-bar';

	let args: RecipeFilterBar = $props();
	let toggled = $state<Record<string, string[]>>({});
	const pillGroups = $derived(
		(args.pillGroups ?? []).map((group) => ({
			...group,
			active: toggled[group.columnKey] ?? group.active ?? []
		}))
	);

	function toggle(columnKey: string, value: string) {
		const active = pillGroups.find((group) => group.columnKey === columnKey)?.active ?? [];
		toggled = {
			...toggled,
			[columnKey]: active.includes(value)
				? active.filter((item) => item !== value)
				: [...active, value]
		};
	}
</script>

<FilterBar {...args} {pillGroups} onTogglePill={toggle} />
