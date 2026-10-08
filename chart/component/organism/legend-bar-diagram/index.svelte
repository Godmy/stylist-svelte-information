<script lang="ts">
	import ChartLegendBar from '$stylist/chart/component/molecule/chart-legend-bar/index.svelte';
	import createLegendBarDiagramState from './state.svelte';
	import { writable } from 'svelte/store';
	import type { RecipeLegendBarDiagram } from '$stylist/chart/interface/recipe/legend-bar-diagram';

	let props: RecipeLegendBarDiagram = $props();
	const state = createLegendBarDiagramState(() => props);
	const activeItemId = writable<string | null>(null);
	const hoverColor = '#f59e0b';
</script>

<section class={state.className} aria-label={props.ariaLabel ?? props.text ?? 'Legend bar diagram'}>
	{#if props.text}
		<header class="legend-bar-diagram__header">
			<h3>{props.text}</h3>
			{#if props.description}
				<p>{props.description}</p>
			{/if}
		</header>
	{/if}

	<div class="legend-bar-diagram__viewport">
		<svg
			viewBox={`0 0 ${state.layout.width} ${state.layout.height}`}
			role="img"
			aria-label={props.ariaLabel ?? props.text ?? 'Bar diagram'}
		>
			<rect
				class="legend-bar-diagram__plot"
				x="0"
				y="0"
				width={state.layout.width}
				height={state.layout.axisY}
				rx="8"
			/>
			<line
				class="legend-bar-diagram__axis"
				x1="16"
				y1={state.layout.axisY}
				x2={state.layout.width - 16}
				y2={state.layout.axisY}
			/>
			{#each state.layout.items as item (item.id)}
				<path
					class={`legend-bar-diagram__connector ${$activeItemId === item.id ? 'legend-bar-diagram__connector--active' : ''}`}
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
					class={`legend-bar-diagram__item ${$activeItemId === item.id ? 'legend-bar-diagram__item--active' : ''}`}
					style={`--legend-bar-hover-color: ${hoverColor};`}
					onpointerenter={() => {
						activeItemId.set(item.id);
					}}
				>
					<ChartLegendBar {...item} connectorVisible={false} />
				</g>
			{/each}
		</svg>
	</div>
	{#if state.layout.items.length > 0}
		{@const selectedItem =
			state.layout.items.find((item) => item.id === $activeItemId) ?? state.layout.items[0]}
		<div class="legend-bar-diagram__selection" aria-label="Selected domain">
			<span>{selectedItem.text}</span>
			<strong>{selectedItem.valueLabel}</strong>
		</div>
	{/if}
</section>

<style>
	.legend-bar-diagram {
		display: grid;
		gap: 0.85rem;
		min-width: 0;
	}

	.legend-bar-diagram__header {
		display: flex;
		align-items: end;
		justify-content: space-between;
		gap: 1rem;
	}

	.legend-bar-diagram__header h3,
	.legend-bar-diagram__header p {
		margin: 0;
	}

	.legend-bar-diagram__header h3 {
		font-size: 1rem;
		line-height: 1.2;
	}

	.legend-bar-diagram__header p {
		color: var(--color-text-secondary, #64748b);
		font-size: 0.78rem;
	}

	.legend-bar-diagram__viewport {
		min-width: 0;
		overflow-x: auto;
		padding-bottom: 0.15rem;
	}

	.legend-bar-diagram__viewport svg {
		display: block;
		min-width: 54rem;
		width: 100%;
		height: auto;
		overflow: visible;
	}

	.legend-bar-diagram__plot {
		fill: var(--color-background-secondary, #f8fafc);
	}

	.legend-bar-diagram__axis {
		stroke: color-mix(in srgb, var(--color-border-primary, #cbd5e1) 80%, #0f172a 20%);
		stroke-width: 1.2;
	}

	.legend-bar-diagram__connector {
		fill: none;
		stroke-linecap: round;
		transition:
			stroke 0.16s ease,
			stroke-width 0.16s ease;
	}

	.legend-bar-diagram__connector:hover,
	.legend-bar-diagram__connector--active {
		stroke: var(--legend-bar-hover-color, #f59e0b);
		stroke-width: 3;
	}

	.legend-bar-diagram__selection {
		justify-self: start;
		display: inline-flex;
		align-items: center;
		gap: 0.65rem;
		max-width: 100%;
		padding: 0.45rem 0.7rem;
		border: 2px solid #f59e0b;
		border-left-width: 5px;
		border-radius: 6px;
		background: color-mix(in srgb, #f59e0b 10%, white 90%);
	}

	.legend-bar-diagram__selection span {
		font-size: 0.78rem;
		font-weight: 800;
	}

	.legend-bar-diagram__selection strong {
		color: #92400e;
		font-size: 0.78rem;
		font-variant-numeric: tabular-nums;
	}
</style>
