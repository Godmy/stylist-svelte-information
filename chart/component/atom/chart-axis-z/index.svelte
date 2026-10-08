<script lang="ts">
	import type { RecipeChartAxisZ } from '$stylist/chart/interface/recipe/chart-axis-z';
	import createChartAxisZState from './state.svelte';

	let props: RecipeChartAxisZ = $props();
	const state = createChartAxisZState(() => props);

	const startX = $derived(props.startX ?? 0);
	const startY = $derived(props.startY ?? 100);
	const endX = $derived(props.endX ?? 80);
	const endY = $derived(props.endY ?? 20);
	const tickCount = $derived(Math.max(0, props.tickCount ?? 0));
	const showArrow = $derived(props.showArrow ?? true);
</script>

<g class={state.axisClasses}>
	<line
		x1={startX}
		y1={startY}
		x2={endX}
		y2={endY}
		stroke={props.color ?? 'currentColor'}
		stroke-width="1"
		stroke-dasharray="6 4"
	/>
	{#if tickCount > 0}
		{#each Array.from({ length: tickCount }, (_, i) => i + 1) as tick}
			{@const ratio = tick / (tickCount + 1)}
			{@const x = startX + (endX - startX) * ratio}
			{@const y = startY + (endY - startY) * ratio}
			<line
				x1={x - 3}
				y1={y + 3}
				x2={x + 3}
				y2={y - 3}
				stroke={props.color ?? 'currentColor'}
				stroke-width="1"
			/>
		{/each}
	{/if}
	{#if showArrow}
		<path
			d={`M ${endX} ${endY} L ${endX - 8} ${endY + 1} M ${endX} ${endY} L ${endX - 2} ${endY + 8}`}
			stroke={props.color ?? 'currentColor'}
			stroke-width="1"
			fill="none"
		/>
	{/if}
	{#if props.label}
		<text
			class={state.labelClasses}
			x={endX + 8}
			y={endY + 4}
			text-anchor="start"
			fill={props.color ?? 'currentColor'}
		>
			{props.label}
		</text>
	{/if}
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
