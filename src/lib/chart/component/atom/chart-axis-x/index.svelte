<script lang="ts">
	import type { RecipeChartAxisX } from '$stylist/chart/interface/recipe/chart-axis-x';
	import createChartAxisXState from './state.svelte';

	let props: RecipeChartAxisX = $props();
	const state = createChartAxisXState(() => props);

	const y = $derived(props.y ?? 0);
	const startX = $derived(props.startX ?? 0);
	const endX = $derived(props.endX ?? 100);
	const tickCount = $derived(Math.max(0, props.tickCount ?? 5));
	const ticks = $derived.by(() => {
		if (props.ticks && props.ticks.length > 0) {
			return props.ticks;
		}
		if (tickCount === 0) {
			return [];
		}
		return Array.from(
			{ length: tickCount + 1 },
			(_, i) => startX + ((endX - startX) * i) / tickCount
		);
	});
	const tickHeight = 6;
	const showArrow = $derived(props.showArrow ?? true);
</script>

<g class={state.axisClasses}>
	<line
		x1={startX}
		y1={y}
		x2={endX}
		y2={y}
		stroke={props.color ?? 'currentColor'}
		stroke-width="1"
	/>
	{#if showArrow}
		<path
			d={`M ${endX} ${y} L ${endX - 8} ${y - 4} M ${endX} ${y} L ${endX - 8} ${y + 4}`}
			stroke={props.color ?? 'currentColor'}
			stroke-width="1"
			fill="none"
		/>
	{/if}

	{#each ticks as tick, i}
		<line
			x1={tick}
			y1={y}
			x2={tick}
			y2={y + tickHeight}
			stroke={props.color ?? 'currentColor'}
			stroke-width="1"
		/>
		{#if props.showGrid}
			<line
				class={state.gridClasses}
				x1={tick}
				y1={0}
				x2={tick}
				y2={y}
				stroke={props.color ?? 'currentColor'}
				stroke-dasharray="4 4"
			/>
		{/if}
		{#if i === Math.floor(ticks.length / 2) && props.label}
			<text
				class={state.labelClasses}
				x={(startX + endX) / 2}
				y={y + 24}
				text-anchor="middle"
				fill={props.color ?? 'currentColor'}
			>
				{props.label}
			</text>
		{/if}
		{#if props.tickLabels && props.tickLabels[i] !== undefined}
			<text
				class={state.labelClasses}
				x={tick}
				y={y + 18}
				text-anchor="middle"
				fill={props.color ?? 'currentColor'}
			>
				{String(props.tickLabels[i])}
			</text>
		{/if}
	{/each}
</g>

<style>
	.c-chart-axis {
		color: var(--color-text-secondary);
	}

	.c-chart-axis__grid {
		opacity: var(--opacity-40);
	}

	.c-chart-axis__label {
		font-size: 0.75rem;
	}
</style>
