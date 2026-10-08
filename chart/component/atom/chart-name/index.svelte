<script lang="ts">
	import type { SVGAttributes } from 'svelte/elements';
	import type { RecipeChartName as ChartNameProps } from '$stylist/chart/interface/recipe/chart-name';
	import createChartNameState from './state.svelte';

	let props: ChartNameProps & SVGAttributes<SVGTextElement> = $props();
	const state = createChartNameState(() => props);
</script>

<text
	class={state.classes}
	x={props.x ?? 16}
	y={props.y ?? 24}
	fill={props.fill ?? props.color ?? 'var(--color-text-primary)'}
	stroke={props.stroke ?? 'none'}
	stroke-width={props.strokeWidth ?? 0}
>
	{props.text}
</text>

<style>
	.c-chart-name {
		fill: var(--color-text-primary);
		font-size: 0.875rem;
		font-weight: 600;
	}
</style>
