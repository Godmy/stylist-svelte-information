<script lang="ts">
	import createRiskImpactMapState from './state.svelte';
	import type { RecipeRiskImpactMap } from '$stylist/chart/interface/recipe/risk-impact-map';

	let props: RecipeRiskImpactMap = $props();
	const state = createRiskImpactMapState(() => props);
</script>

<section class={state.className} aria-label={props.ariaLabel ?? props.text ?? 'Risk impact map'}>
	{#if props.text}<header class="risk-impact-map__header">
			<h3>{props.text}</h3>
			{#if props.description}<p>{props.description}</p>{/if}
		</header>{/if}
	<div class="risk-impact-map__viewport">
		<svg viewBox={`0 0 ${state.layout.width} ${state.layout.height}`} role="img">
			<rect
				class="risk-impact-map__plot"
				x={state.layout.plotX}
				y={state.layout.plotY}
				width={state.layout.plotWidth}
				height={state.layout.plotHeight}
				rx="8"
			/>
			<line
				class="risk-impact-map__axis"
				x1={state.layout.plotX}
				y1={state.layout.plotY + state.layout.plotHeight}
				x2={state.layout.plotX + state.layout.plotWidth}
				y2={state.layout.plotY + state.layout.plotHeight}
			/>
			<line
				class="risk-impact-map__axis"
				x1={state.layout.plotX}
				y1={state.layout.plotY}
				x2={state.layout.plotX}
				y2={state.layout.plotY + state.layout.plotHeight}
			/>
			<text
				class="risk-impact-map__axis-label"
				x={state.layout.plotX + state.layout.plotWidth}
				y={state.layout.plotY + state.layout.plotHeight + 28}
				text-anchor="end">Probability</text
			>
			<text
				class="risk-impact-map__axis-label"
				x={state.layout.plotX - 42}
				y={state.layout.plotY + 8}
				text-anchor="start">Impact</text
			>
			{#each state.layout.risks as risk (risk.id)}
				<circle
					class={`risk-impact-map__bubble ${risk.critical ? 'risk-impact-map__bubble--critical' : ''}`}
					cx={risk.x}
					cy={risk.y}
					r={risk.r}
				/>
				<text class="risk-impact-map__label" x={risk.x} y={risk.y - risk.r - 6} text-anchor="middle"
					>{risk.text}</text
				>
			{/each}
		</svg>
	</div>
</section>

<style>
	.risk-impact-map {
		display: grid;
		gap: 0.85rem;
		min-width: 0;
	}
	.risk-impact-map__header {
		display: flex;
		align-items: end;
		justify-content: space-between;
		gap: 1rem;
	}
	.risk-impact-map__header h3,
	.risk-impact-map__header p {
		margin: 0;
	}
	.risk-impact-map__header h3 {
		font-size: 1rem;
	}
	.risk-impact-map__header p {
		color: var(--color-text-secondary, #64748b);
		font-size: 0.78rem;
	}
	.risk-impact-map__viewport {
		overflow-x: auto;
	}
	.risk-impact-map__viewport svg {
		display: block;
		min-width: 42rem;
		width: 100%;
		height: auto;
	}
	.risk-impact-map__plot {
		fill: var(--color-background-secondary, #f8fafc);
	}
	.risk-impact-map__axis {
		stroke: #94a3b8;
		stroke-width: 1.2;
	}
	.risk-impact-map__axis-label,
	.risk-impact-map__label {
		fill: var(--color-text-secondary, #64748b);
		font-size: 0.72rem;
		font-weight: 800;
	}
	.risk-impact-map__bubble {
		fill: color-mix(in srgb, #2563eb 34%, white);
		stroke: #2563eb;
		stroke-width: 1.5;
		opacity: 0.9;
	}
	.risk-impact-map__bubble--critical {
		fill: color-mix(in srgb, #f59e0b 48%, white);
		stroke: #d97706;
		stroke-width: 2.5;
	}
</style>
