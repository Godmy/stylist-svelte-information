<script lang="ts">
	import Icon from '$stylist/svg/component/atom/icon/index.svelte';
	import type { RecipeHeatmap } from '$stylist/chart/interface/recipe/heatmap';
	import Tooltip from '$stylist/animation/component/atom/tooltip/index.svelte';
	import createHeatmapState from './state.svelte';
	import { ManagerHeatmap } from '$stylist/chart/class/manager/heatmap';

	let props: RecipeHeatmap = $props();
	const state = createHeatmapState(() => props);
</script>

<div
	class={state.containerClasses}
	style={`width: ${props.width ?? 600}px; height: ${props.height ?? 400}px;`}
	{...props}
>
	{#if props.title}
		<div class="hm-title-row">
			<h3 class={state.titleClasses}>{props.title}</h3>
			{#if props.showTooltip}
				<Tooltip
					content="This is a heatmap showing data density through color variations in a matrix format."
					placement="top"
				>
					<Icon name="info" size="sm" class={state.tooltipButtonClasses} />
				</Tooltip>
			{/if}
		</div>
	{/if}

	<div class={state.chartContainerClasses}>
		<svg width={props.width ?? 600} height={props.height ?? 400} class={state.svgClasses}>
			{#if props.showAxis}
				<!-- X axis -->
				<line
					x1={props.showAxis ? 50 : 5}
					y1={(props.height ?? 400) - 10}
					x2={(props.width ?? 600) - 10}
					y2={(props.height ?? 400) - 10}
					stroke={props.axisColor ?? 'var(--color-border-primary)'}
					stroke-width="1"
					class={state.axisClasses}
				/>
				<!-- Y axis -->
				<line
					x1={props.showAxis ? 50 : 5}
					y1={10}
					x2={props.showAxis ? 50 : 5}
					y2={(props.height ?? 400) - 10}
					stroke={props.axisColor ?? 'var(--color-border-primary)'}
					stroke-width="1"
					class={state.axisClasses}
				/>

				<!-- X axis labels -->
				{#each state.columns as col, i}
					<text
						x={50 + i * state.cellWidth + state.cellWidth / 2}
						y={(props.height ?? 400) - 5}
						text-anchor="middle"
						font-size="10"
						fill="var(--color-text-secondary)"
						class={state.axisTextClasses}
					>
						{ManagerHeatmap.resolveAxisLabel(col)}
					</text>
				{/each}

				<!-- Y axis labels -->
				{#each state.rows as row, i}
					<text
						x={props.showAxis ? 45 : 0}
						y={10 + i * state.cellHeight + state.cellHeight / 2}
						text-anchor="end"
						font-size="10"
						fill="var(--color-text-secondary)"
						dominant-baseline="middle"
						class={state.axisTextClasses}
					>
						{ManagerHeatmap.resolveAxisLabel(row)}
					</text>
				{/each}
			{/if}

			<!-- Cells -->
			{#each state.heatmapCells as cell}
				<g
					class={state.cellClasses(state.hoveredCell === cell.id)}
					onclick={() => props.onCellClick?.(cell)}
					onkeydown={(e) => {
						if (e.key === 'Enter' || e.key === ' ') {
							e.preventDefault();
							props.onCellClick?.(cell);
						}
					}}
					onfocus={() => state.handleCellFocus(cell.id)}
					onblur={state.handleCellBlur}
					role="button"
					tabindex="0"
					aria-label={`Heatmap cell: ${cell.row} - ${cell.column}, Value: ${cell.value}`}
				>
					<rect
						x={cell.x}
						y={cell.y}
						width={cell.width}
						height={cell.height}
						fill={cell.color}
						rx="2"
						ry="2"
						style={`opacity: ${state.hoveredCell === cell.id ? 0.8 : 1};`}
					/>
					{#if cell.width > 20 && cell.height > 15}
						<text
							x={cell.x + cell.width / 2}
							y={cell.y + cell.height / 2}
							text-anchor="middle"
							dominant-baseline="middle"
							font-size="10"
							fill={cell.intensity > 0.5
								? 'var(--color-text-inverse)'
								: 'var(--color-text-primary)'}
							class="hm-cell-label"
						>
							{Math.round(cell.value)}
						</text>
					{/if}
				</g>
			{/each}
		</svg>
	</div>

	{#if props.showLegend}
		<div class={state.legendClasses}>
			<div class={state.legendLabelsClasses}>
				<span>{props.minValue ?? 0}</span>
				<span
					>{ManagerHeatmap.resolveLegendMidpoint(
						props.minValue ?? 0,
						state.calculatedMaxValue
					)}</span
				>
				<span>{state.calculatedMaxValue}</span>
			</div>
			<div
				class={state.legendGradientClasses}
				style={`background-image: ${ManagerHeatmap.resolveLegendGradient(state.resolvedColorScheme)}`}
			></div>
			<div class={state.legendTitleClasses}>
				{ManagerHeatmap.resolveLegendTitle(state.resolvedColorScheme)}
			</div>
		</div>
	{/if}
</div>

<style>
	.c-heatmap {
		position: relative;
	}

	.c-heatmap__title {
		font-size: 1.125rem;
		font-weight: 500;
		color: var(--color-text-primary);
	}

	.c-heatmap__chart-container {
		padding: 1rem;
		border: 1px solid var(--color-border-primary);
		border-radius: 0.5rem;
		background: var(--color-background-primary);
	}

	.c-heatmap__svg {
		overflow: visible;
	}

	.c-heatmap__axis {
		stroke: var(--color-border-primary);
	}

	.c-heatmap__axis-text {
		font-size: 0.75rem;
		fill: var(--color-text-secondary);
		color: var(--color-text-secondary);
	}

	.c-heatmap__cell {
		cursor: pointer;
		transition: all var(--duration-200) ease-in-out;
	}

	.c-heatmap__cell--hovered {
		opacity: var(--opacity-80);
	}

	.c-heatmap__cell--idle {
		opacity: var(--opacity-100);
	}

	.c-heatmap__legend {
		margin-top: 1rem;
	}

	.c-heatmap__legend-labels {
		display: flex;
		justify-content: space-between;
		margin-bottom: 0.25rem;
		font-size: 0.75rem;
		color: var(--color-text-secondary);
	}

	.c-heatmap__legend-gradient {
		width: 100%;
		height: 1rem;
		border-radius: 9999px;
	}

	.c-heatmap__legend-title {
		margin-top: 0.25rem;
		text-align: center;
		font-size: 0.75rem;
		color: var(--color-text-primary);
	}

	.c-heatmap__tooltip-button {
		width: 1rem;
		height: 1rem;
		color: var(--color-text-tertiary);
	}

	.hm-title-row {
		margin-bottom: 0.5rem;
		display: flex;
		align-items: center;
		justify-content: space-between;
	}
	.hm-cell-label {
		pointer-events: none;
		font-size: 0.75rem;
	}
</style>
