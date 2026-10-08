<script lang="ts">
	import ChartLegendBand from '$stylist/chart/component/molecule/chart-legend-band/index.svelte';
	import createLegendBandDiagramState from './state.svelte';
	import { writable } from 'svelte/store';
	import type { RecipeLegendBandDiagram } from '$stylist/chart/interface/recipe/legend-band-diagram';

	let props: RecipeLegendBandDiagram = $props();
	const state = createLegendBandDiagramState(() => props);
	const activeItemId = writable<string | null>(null);
	const hoverColor = '#f59e0b';
</script>

<section
	class={state.className}
	aria-label={props.ariaLabel ?? props.text ?? 'Legend band diagram'}
>
	{#if props.text}
		<header class="legend-band-diagram__header">
			<h3>{props.text}</h3>
			{#if props.description}
				<p>{props.description}</p>
			{/if}
		</header>
	{/if}

	<div class="legend-band-diagram__viewport">
		<svg
			viewBox={`0 0 ${state.layout.width} ${state.layout.height}`}
			role="img"
			aria-label={props.ariaLabel ?? props.text ?? 'Band diagram'}
		>
			<rect
				class="legend-band-diagram__plot"
				x={state.layout.plotX}
				y="0"
				width={state.layout.plotRight - state.layout.plotX}
				height={state.layout.axisY}
				rx="8"
			/>
			{#each state.layout.ticks as tick (tick.id)}
				<line
					class="legend-band-diagram__grid"
					x1={state.layout.plotX}
					y1={tick.y}
					x2={state.layout.plotRight}
					y2={tick.y}
				/>
				<text
					class="legend-band-diagram__tick-label"
					x={state.layout.plotX - 10}
					y={tick.y + 4}
					text-anchor="end"
				>
					{tick.value}
				</text>
			{/each}
			<line
				class="legend-band-diagram__axis legend-band-diagram__axis--y"
				x1={state.layout.plotX}
				y1="0"
				x2={state.layout.plotX}
				y2={state.layout.axisY}
			/>
			<line
				class="legend-band-diagram__axis"
				x1={state.layout.plotX}
				y1={state.layout.axisY}
				x2={state.layout.plotRight}
				y2={state.layout.axisY}
			/>
			{#each state.layout.items as item (item.id)}
				<path
					class={`legend-band-diagram__connector ${$activeItemId === item.id ? 'legend-band-diagram__connector--active' : ''}`}
					d={`M ${item.connectorX} ${item.connectorY1} V ${item.connectorY2}`}
					stroke={$activeItemId === item.id ? hoverColor : item.color}
					stroke-width={$activeItemId === item.id ? 3 : item.connectorWidth}
					onpointerenter={() => {
						activeItemId.set(item.id);
					}}
				/>
			{/each}
			{#each state.layout.items as item (item.id)}
				<g
					class={`legend-band-diagram__item ${$activeItemId === item.id ? 'legend-band-diagram__item--active' : ''}`}
					style={`--legend-band-hover-color: ${hoverColor};`}
					onpointerenter={() => {
						activeItemId.set(item.id);
					}}
				>
					<ChartLegendBand {...item} connectorVisible={false} />
				</g>
			{/each}
		</svg>
	</div>
	{#if state.layout.items.length > 0}
		{@const selectedItem =
			state.layout.items.find((item) => item.id === $activeItemId) ?? state.layout.items[0]}
		{@const selectedSegmentTotal = Math.max(
			1,
			selectedItem.segments.reduce((total, segment) => total + segment.value, 0)
		)}
		<div class="legend-band-diagram__selection" aria-label="Selected domain">
			<div class="legend-band-diagram__selection-card">
				<span>{selectedItem.text}</span>
				<strong>{selectedItem.valueLabel}</strong>
			</div>
			<div class="legend-band-diagram__composition" aria-label="Selected component composition">
				{#each selectedItem.segments as segment (segment.id)}
					<div
						class={`legend-band-diagram__composition-segment ${segment.text === 'Molecule' || segment.text === 'Template' ? 'legend-band-diagram__composition-segment--light' : 'legend-band-diagram__composition-segment--dark'}`}
						style={`--segment-color: ${segment.color}; --segment-width: ${(segment.value / selectedSegmentTotal) * 100}%;`}
					>
						<span>{segment.text}</span>
						<strong>{segment.value}</strong>
					</div>
				{/each}
			</div>
		</div>
	{/if}
</section>

<style>
	.legend-band-diagram {
		display: grid;
		gap: 0.85rem;
		min-width: 0;
	}

	.legend-band-diagram__header {
		display: flex;
		align-items: end;
		justify-content: space-between;
		gap: 1rem;
	}

	.legend-band-diagram__header h3,
	.legend-band-diagram__header p {
		margin: 0;
	}

	.legend-band-diagram__header h3 {
		font-size: 1rem;
		line-height: 1.2;
	}

	.legend-band-diagram__header p {
		color: var(--color-text-secondary, #64748b);
		font-size: 0.78rem;
	}

	.legend-band-diagram__viewport {
		min-width: 0;
		overflow-x: auto;
		padding-bottom: 0.15rem;
	}

	.legend-band-diagram__viewport svg {
		display: block;
		min-width: 54rem;
		width: 100%;
		height: auto;
		overflow: visible;
	}

	.legend-band-diagram__plot {
		fill: var(--color-background-secondary, #f8fafc);
	}

	.legend-band-diagram__grid {
		stroke: color-mix(in srgb, var(--color-border-primary, #cbd5e1) 52%, transparent);
		stroke-width: 1;
	}

	.legend-band-diagram__axis {
		stroke: color-mix(in srgb, var(--color-border-primary, #cbd5e1) 80%, #0f172a 20%);
		stroke-width: 1.2;
	}

	.legend-band-diagram__axis--y {
		stroke-width: 1.4;
	}

	.legend-band-diagram__connector {
		fill: none;
		stroke-linecap: round;
		transition:
			stroke 0.16s ease,
			stroke-width 0.16s ease;
	}

	.legend-band-diagram__connector:hover,
	.legend-band-diagram__connector--active {
		stroke: var(--legend-band-hover-color, #f59e0b);
		stroke-width: 3;
	}

	.legend-band-diagram__tick-label {
		fill: var(--color-text-secondary, #64748b);
		font-size: 0.68rem;
		font-weight: 750;
		font-variant-numeric: tabular-nums;
	}

	.legend-band-diagram__selection {
		display: grid;
		grid-template-columns: auto minmax(0, 1fr);
		align-items: stretch;
		gap: 0.75rem;
	}

	.legend-band-diagram__selection-card {
		display: inline-flex;
		align-items: center;
		gap: 0.65rem;
		padding: 0.45rem 0.7rem;
		border: 2px solid #f59e0b;
		border-left-width: 5px;
		border-radius: 6px;
		background: color-mix(in srgb, #f59e0b 10%, white 90%);
	}

	.legend-band-diagram__selection-card span,
	.legend-band-diagram__selection-card strong {
		font-size: 0.78rem;
		font-weight: 800;
	}

	.legend-band-diagram__selection-card strong {
		color: #92400e;
		font-variant-numeric: tabular-nums;
	}

	.legend-band-diagram__composition {
		display: flex;
		min-width: 0;
		overflow: hidden;
		border: 1px solid color-mix(in srgb, var(--color-border-primary, #cbd5e1) 72%, transparent);
		border-radius: 6px;
		background: var(--color-background-primary, #ffffff);
	}

	.legend-band-diagram__composition-segment {
		display: flex;
		flex: 1 1 var(--segment-width);
		align-items: center;
		justify-content: space-between;
		gap: 0.5rem;
		min-width: 0;
		padding: 0.48rem 0.6rem;
		background: var(--segment-color);
		color: #422006;
		font-size: 0.72rem;
		font-weight: 800;
	}

	.legend-band-diagram__composition-segment--dark {
		color: #ffffff;
	}

	.legend-band-diagram__composition-segment--light {
		color: #172554;
	}

	.legend-band-diagram__composition-segment span {
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}

	.legend-band-diagram__composition-segment strong {
		flex: 0 0 auto;
		font-variant-numeric: tabular-nums;
	}

	@media (max-width: 720px) {
		.legend-band-diagram__selection {
			grid-template-columns: 1fr;
		}
	}
</style>
