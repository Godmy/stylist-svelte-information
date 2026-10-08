<script lang="ts">
	import createOutlierConstellationState from './state.svelte';
	import type { RecipeOutlierConstellation } from '$stylist/chart/interface/recipe/outlier-constellation';

	let props: RecipeOutlierConstellation = $props();
	const state = createOutlierConstellationState(() => props);
</script>

<section
	class={state.className}
	aria-label={props.ariaLabel ?? props.text ?? 'Outlier constellation'}
>
	{#if props.text}<header class="outlier-constellation__header">
			<h3>{props.text}</h3>
			{#if props.description}<p>{props.description}</p>{/if}
		</header>{/if}
	<div class="outlier-constellation__viewport">
		<svg viewBox={`0 0 ${state.layout.width} ${state.layout.height}`} role="img">
			<rect
				class="outlier-constellation__plot"
				x={state.layout.plotX}
				y={state.layout.plotY}
				width={state.layout.plotWidth}
				height={state.layout.plotHeight}
				rx="8"
			/>
			<line
				class="outlier-constellation__axis"
				x1={state.layout.plotX}
				y1={state.layout.centerY}
				x2={state.layout.plotX + state.layout.plotWidth}
				y2={state.layout.centerY}
			/>
			<line
				class="outlier-constellation__axis"
				x1={state.layout.centerX}
				y1={state.layout.plotY}
				x2={state.layout.centerX}
				y2={state.layout.plotY + state.layout.plotHeight}
			/>
			<circle
				class="outlier-constellation__consensus"
				cx={state.layout.centerX}
				cy={state.layout.centerY}
				r="36"
			/>
			{#each state.layout.points as point (point.id)}
				<line
					class="outlier-constellation__ray"
					x1={state.layout.centerX}
					y1={state.layout.centerY}
					x2={point.x}
					y2={point.y}
				/>
				<circle
					class={`outlier-constellation__point ${point.outlier ? 'outlier-constellation__point--outlier' : ''}`}
					cx={point.x}
					cy={point.y}
					r={point.r}
				/>
				<text
					class="outlier-constellation__label"
					x={point.x}
					y={point.y - point.r - 6}
					text-anchor="middle">{point.text}</text
				>
			{/each}
		</svg>
	</div>
</section>

<style>
	.outlier-constellation {
		display: grid;
		gap: 0.85rem;
		min-width: 0;
	}
	.outlier-constellation__header {
		display: flex;
		align-items: end;
		justify-content: space-between;
		gap: 1rem;
	}
	.outlier-constellation__header h3,
	.outlier-constellation__header p {
		margin: 0;
	}
	.outlier-constellation__header h3 {
		font-size: 1rem;
	}
	.outlier-constellation__header p {
		color: var(--color-text-secondary, #64748b);
		font-size: 0.78rem;
	}
	.outlier-constellation__viewport {
		overflow-x: auto;
	}
	.outlier-constellation__viewport svg {
		display: block;
		min-width: 42rem;
		width: 100%;
		height: auto;
	}
	.outlier-constellation__plot {
		fill: var(--color-background-secondary, #f8fafc);
	}
	.outlier-constellation__axis,
	.outlier-constellation__ray {
		stroke: color-mix(in srgb, var(--color-border-primary, #cbd5e1) 65%, transparent);
		stroke-width: 1;
	}
	.outlier-constellation__ray {
		stroke-dasharray: 4 5;
	}
	.outlier-constellation__consensus {
		fill: color-mix(in srgb, #2563eb 10%, transparent);
		stroke: #2563eb;
		stroke-width: 1.4;
	}
	.outlier-constellation__point {
		fill: color-mix(in srgb, #2563eb 50%, white);
		stroke: #2563eb;
		stroke-width: 1.8;
	}
	.outlier-constellation__point--outlier {
		fill: color-mix(in srgb, #f59e0b 52%, white);
		stroke: #d97706;
		stroke-width: 2.6;
	}
	.outlier-constellation__label {
		fill: var(--color-text-secondary, #64748b);
		font-size: 0.7rem;
		font-weight: 800;
	}
</style>
