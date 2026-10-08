<script lang="ts">
	import type { RecipeChartBackground } from '$stylist/chart/interface/recipe/chart-background';
	import createChartBackgroundState from './state.svelte';

	let props: RecipeChartBackground = $props();
	const state = createChartBackgroundState(() => props);
</script>

<rect
	class={state.classes}
	x="0"
	y="0"
	rx="8"
	ry="8"
	width={props.width}
	height={props.height}
	fill={props.fill ?? 'var(--color-background-secondary)'}
	stroke={props.stroke ?? 'var(--color-border-primary)'}
	stroke-width="1"
/>

<style>
	.c-chart-background {
		fill: var(--color-background-secondary);
		stroke: var(--color-border-primary);
	}
</style>
