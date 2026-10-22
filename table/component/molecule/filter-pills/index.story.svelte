<script lang="ts">
	// Render of index.story.ts: the pills are controlled, the story keeps the active values onToggle reports.
	import FilterPills from '$stylist/table/component/molecule/filter-pills/index.svelte';
	import type { RecipeFilterPills } from '$stylist/table/interface/recipe/filter-pills';

	let args: RecipeFilterPills = $props();
	let toggled = $state<string[] | null>(null);
	const active = $derived(toggled ?? args.active ?? []);

	function toggle(_: string, value: string) {
		toggled = active.includes(value) ? active.filter((item) => item !== value) : [...active, value];
	}
</script>

<FilterPills {...args} {active} onToggle={toggle} />
