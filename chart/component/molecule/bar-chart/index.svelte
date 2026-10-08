<script lang="ts">
	import BaseIcon from '$stylist/svg/component/atom/icon/index.svelte';
	import Tooltip from '$stylist/animation/component/atom/tooltip/index.svelte';
	import createBarChartState from './state.svelte';
	import type { RecipeBarChart } from '$stylist/chart/interface/recipe/bar-chart';

	let props: RecipeBarChart = $props();
	const state = createBarChartState(() => props);
</script>

<div
	class={state.containerClasses}
	style={`width: min(100%, ${props.width ?? 600}px);`}
	{...props}
>
	{#if props.title}
		<div class={state.titleContainerClasses}>
			<h3 class={state.titleClasses}>{props.title}</h3>
			{#if props.showTooltip}
				<Tooltip
					content="This is a bar chart showing categorical data with rectangular bars proportional to the values they represent."
					placement="top"
				>
					<BaseIcon name="info" class={state.infoIconClasses} />
				</Tooltip>
			{/if}
		</div>
	{/if}

	<div class={state.chartContainerClasses}>
		<svg
			viewBox={`0 0 ${props.width ?? 600} ${props.height ?? 400}`}
			class={state.svgClasses}
			style={`height: ${props.height ?? 400}px;`}
		>
			{#if props.showAxis}
				<!-- X axis -->
				<line
					x1={props.showAxis ? 50 : 5}
					y1={state.chartHeight + 10}
					x2={(props.width ?? 600) - 10}
					y2={state.chartHeight + 10}
					stroke={props.axisColor ?? 'var(--color-border-primary)'}
					stroke-width="1"
				/>
				<!-- Y axis -->
				<line
					x1={props.showAxis ? 50 : 5}
					y1={10}
					x2={props.showAxis ? 50 : 5}
					y2={state.chartHeight + 10}
					stroke={props.axisColor ?? 'var(--color-border-primary)'}
					stroke-width="1"
				/>

				<!-- Y axis labels -->
				{#each state.yAxisValues as val, i}
					<text
						x={props.showAxis ? 45 : 0}
						y={state.chartHeight + 6 - i * (state.chartHeight / 4)}
						text-anchor="end"
						font-size="10"
						fill="var(--color-text-tertiary)"
					>
						{Math.round(val)}
					</text>
					<line
						x1={props.showAxis ? 48 : 3}
						y1={state.chartHeight + 10 - i * (state.chartHeight / 4)}
						x2={(props.width ?? 600) - 10}
						y2={state.chartHeight + 10 - i * (state.chartHeight / 4)}
						stroke={props.axisColor ?? 'var(--color-border-primary)'}
						stroke-dasharray="3,3"
						stroke-width="0.5"
					/>
				{/each}

				<!-- X axis labels -->
				{#each state.barPositions as position, i (position.x)}
					<text
						x={position.x + (props.barWidth ?? 30) / 2}
						y={state.chartHeight + 26}
						text-anchor="middle"
						font-size="10"
						fill="var(--color-text-tertiary)"
					>
						{props.data[i].name}
					</text>
				{/each}
			{/if}

			<!-- Bars -->
			{#each state.barPositions as position, i}
				<g
					class="bc-bar-group"
					onclick={() => props.onBarClick?.(props.data[i])}
					onkeydown={(e) => {
						if (e.key === 'Enter' || e.key === ' ') {
							e.preventDefault();
							props.onBarClick?.(props.data[i]);
						}
					}}
					onfocus={() => state.handleBarFocus(i)}
					onblur={state.handleBarBlur}
					role="button"
					tabindex="0"
					aria-label={`Bar chart item: ${props.data[i].name}, Value: ${props.data[i].value}`}
				>
					<rect
						x={position.x}
						y={position.y}
						width={position.width}
						height={position.height}
						fill={position.color}
						rx="2"
						ry="2"
						class={state.barClasses(state.hoveredBar === i)}
						style={`opacity: ${state.hoveredBar === i ? 0.8 : 1};`}
					/>
				</g>
			{/each}
		</svg>
	</div>

	{#if props.showLegend}
		<div class={state.legendClasses}>
			{#each props.data ?? [] as item, i}
				<div class={state.legendItemClasses}>
					<div
						class="bc-legend-dot"
						style={`background-color: ${item.color ?? state.resolvedColorScheme}`}
					></div>
					<span class={state.legendTextClasses}>{item.name}</span>
					<span class={state.legendValueClasses}>({item.value})</span>
				</div>
			{/each}
		</div>
	{/if}
</div>

<style>
	.bar-chart {
		display: block;
	}

	.bar-chart__title-row {
		display: flex;
		align-items: center;
		justify-content: space-between;
		margin-bottom: 0.5rem;
	}

	.bar-chart__title {
		font-size: 1.125rem;
		font-weight: 500;
		color: var(--color-text-primary);
	}

	.bar-chart__info-icon {
		width: 1rem;
		height: 1rem;
		color: var(--color-text-secondary);
	}

	.bar-chart__chart-container {
		padding: 1rem;
		border: 1px solid var(--color-border-primary);
		border-radius: 0.5rem;
		background: var(--color-background-primary);
		box-sizing: border-box;
		overflow: hidden;
	}

	.bar-chart__svg {
		display: block;
		width: 100%;
		max-width: 100%;
		overflow: visible;
	}

	.bc-bar-group {
		cursor: pointer;
	}

	.bar-chart__bar {
		transform-origin: bottom;
		transition: all var(--duration-200) ease-in-out;
	}

	.bar-chart__bar--hovered {
		transform: scaleY(1.05);
	}

	.bar-chart__bar--idle {
		transform: scaleY(1);
	}

	.bar-chart__legend {
		display: flex;
		flex-wrap: wrap;
		gap: 1rem;
		margin-top: 1rem;
	}

	.bar-chart__legend-item {
		display: flex;
		align-items: center;
	}

	.bar-chart__legend-text {
		font-size: 0.875rem;
		color: var(--color-text-secondary);
	}

	.bar-chart__legend-value {
		margin-left: 0.25rem;
		font-size: 0.875rem;
		color: var(--color-text-tertiary);
	}

	.bc-legend-dot {
		margin-right: 0.5rem;
		width: 1rem;
		height: 1rem;
		border-radius: 0.25rem;
	}
</style>
