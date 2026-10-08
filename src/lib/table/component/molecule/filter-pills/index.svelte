<script lang="ts">
	import type { RecipeFilterPills } from '$stylist/table/interface/recipe/filter-pills';
	import { createFilterPillsState } from './state.svelte';

	let props: RecipeFilterPills = $props();
	const state = createFilterPillsState(() => props);
</script>

<div class="c-filter-pills {props.class ?? ''}">
	{#if state.label}
		<span class="c-filter-pills__label">{state.label}</span>
	{/if}
	<div class="c-filter-pills__list">
		{#each state.options as option}
			<button
				type="button"
				class="c-filter-pills__pill {state.isActive(option) ? 'is-active' : ''}"
				onclick={() => state.toggle(option)}
			>
				{option}
			</button>
		{/each}
	</div>
</div>

<style>
	.c-filter-pills {
		display: flex;
		align-items: center;
		gap: 0.5rem;
	}

	.c-filter-pills__label {
		font-size: 11px;
		font-weight: 600;
		text-transform: uppercase;
		color: var(--color-text-secondary);
		white-space: nowrap;
	}

	.c-filter-pills__list {
		display: flex;
		flex-wrap: wrap;
		gap: 0.25rem;
	}

	.c-filter-pills__pill {
		padding: 0.2rem 0.65rem;
		border: 1px solid var(--color-border-primary);
		border-radius: 999px;
		background: var(--color-background-primary);
		color: var(--color-text-secondary);
		font-size: 12px;
		cursor: pointer;
	}

	.c-filter-pills__pill:hover {
		border-color: var(--color-primary-400);
		color: var(--color-primary-600);
	}

	.c-filter-pills__pill.is-active {
		background: var(--color-primary-100);
		border-color: var(--color-primary-400);
		color: var(--color-primary-700);
		font-weight: 500;
	}
</style>
