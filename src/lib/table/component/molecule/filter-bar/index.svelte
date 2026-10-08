<script lang="ts">
	import type { RecipeFilterBar } from '$stylist/table/interface/recipe/filter-bar';
	import { createFilterBarState } from './state.svelte';
	import FilterText from '$stylist/table/component/molecule/filter-text/index.svelte';
	import FilterPills from '$stylist/table/component/molecule/filter-pills/index.svelte';

	let props: RecipeFilterBar = $props();
	const state = createFilterBarState(() => props);
</script>

<div class="c-filter-bar {props.class ?? ''}">
	<FilterText
		value={state.searchValue}
		placeholder={state.searchPlaceholder}
		onSearch={props.onSearch}
	/>
	{#each state.pillGroups as group}
		<FilterPills
			columnKey={group.columnKey}
			label={group.label}
			options={group.options}
			active={group.active}
			onToggle={props.onTogglePill}
		/>
	{/each}
</div>

<style>
	.c-filter-bar {
		display: flex;
		align-items: center;
		flex-wrap: wrap;
		gap: 0.75rem;
		padding: 0.5rem 0.75rem;
		border-bottom: 1px solid var(--color-border-primary);
		background: var(--color-background-primary);
	}
</style>
