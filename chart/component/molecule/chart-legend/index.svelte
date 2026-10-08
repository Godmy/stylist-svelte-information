<script lang="ts">
	import { ClassNamesManager } from '$stylist/layout/class/manager/class-names';
	import type { HTMLAttributes } from 'svelte/elements';
	import type { RecipeChartLegend } from '$stylist/chart/interface/recipe/chart-legend';
	import createChartLegendState from './state.svelte';

	let props: RecipeChartLegend & HTMLAttributes<HTMLDivElement> = $props();
	const state = createChartLegendState({ ...props, class: ClassNamesManager.merge(props.class) });
</script>

<div class={state.classes}>
	{#each props.items as item (item.id)}
		<div class={state.itemClasses}>
			<span
				class={state.dotClasses}
				style={`background-color: ${item.color ?? 'var(--color-primary-500)'}`}
			></span>
			<span>{item.name}</span>
		</div>
	{/each}
</div>

<style>
	.c-chart-legend {
		display: flex;
		flex-wrap: wrap;
		gap: 0.75rem;
		margin-top: 0.75rem;
		color: var(--color-text-secondary);
		font-size: 0.75rem;
	}

	.c-chart-legend__item {
		display: inline-flex;
		align-items: center;
		gap: 0.5rem;
	}

	.c-chart-legend__dot {
		width: 0.625rem;
		height: 0.625rem;
		border-radius: 9999px;
		flex-shrink: 0;
	}
</style>
