<script lang="ts">
	import type { RecipeCanvasChart } from '$stylist/chart/interface/recipe/canvas-chart';
	import createCanvasChartState from './state.svelte';
	import { ManagerCanvasChart } from '$stylist/chart/class/manager/canvas-chart';

	let props: RecipeCanvasChart = $props();
	const state = createCanvasChartState(() => props);

	let canvasRef: HTMLCanvasElement | null = null;
	const resolvedColors = $derived(ManagerCanvasChart.resolveColors(state.colors));
	const resolvedData = $derived(state.data as any[]);
	const resolvedType = $derived(state.type);

	$effect(() => {
		if (ManagerCanvasChart.shouldDrawChart(canvasRef, resolvedData)) {
			ManagerCanvasChart.drawChart({
				canvas: canvasRef,
				data: resolvedData,
				type: resolvedType,
				title: state.title,
				xAxisLabel: props.xAxisLabel ?? '',
				yAxisLabel: props.yAxisLabel ?? '',
				showGrid: state.showGrid,
				colors: resolvedColors
			});
		}
	});
</script>

<canvas
	bind:this={canvasRef}
	width={state.width}
	height={state.height}
	class={state.canvasClasses}
	{...state.restProps}
></canvas>

<style>
	.c-canvas-chart__canvas {
		display: block;
		width: 100%;
		height: 100%;
		border: 1px solid var(--color-border-primary);
		border-radius: 0.5rem;
		background: var(--color-background-primary);
	}
</style>
