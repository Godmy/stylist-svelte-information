<script lang="ts">
	import type { RecipeChartPolyline as ChartPolylineProps } from '$stylist/chart/interface/recipe/chart-polyline';
	import createChartPolylineState from './state.svelte';

	let props: ChartPolylineProps = $props();
	const state = createChartPolylineState(() => props);
</script>

<polyline
	class={state.classes}
	points={state.polylinePoints}
	stroke={props.color ?? 'var(--color-primary-500)'}
	stroke-width={props.strokeWidth ?? 2}
	stroke-linecap="round"
	stroke-linejoin="round"
	fill="none"
/>

<style>
	.c-chart-polyline {
		fill: none;
		transition: stroke var(--duration-200) ease;
	}
</style>
