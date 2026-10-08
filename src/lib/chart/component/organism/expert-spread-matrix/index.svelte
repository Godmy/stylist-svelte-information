<script lang="ts">
	import createExpertSpreadMatrixState from './state.svelte';
	import type { RecipeExpertSpreadMatrix } from '$stylist/chart/interface/recipe/expert-spread-matrix';

	let props: RecipeExpertSpreadMatrix = $props();
	const state = createExpertSpreadMatrixState(() => props);
</script>

<section
	class={state.className}
	aria-label={props.ariaLabel ?? props.text ?? 'Expert spread matrix'}
>
	{#if props.text}
		<header class="expert-spread-matrix__header">
			<h3>{props.text}</h3>
			{#if props.description}<p>{props.description}</p>{/if}
		</header>
	{/if}
	<div class="expert-spread-matrix__viewport">
		<svg viewBox={`0 0 ${state.layout.width} ${state.layout.height}`} role="img">
			{#each state.layout.periods as period, index}
				<text
					class="expert-spread-matrix__label"
					x={state.layout.labelWidth + index * state.layout.cellSize + state.layout.cellSize / 2}
					y="22"
					text-anchor="middle">{period}</text
				>
			{/each}
			{#each state.layout.experts as expert, index}
				<text
					class="expert-spread-matrix__label expert-spread-matrix__label--expert"
					x={state.layout.labelWidth - 10}
					y={state.layout.labelHeight +
						index * state.layout.cellSize +
						state.layout.cellSize / 2 +
						4}
					text-anchor="end">{expert}</text
				>
			{/each}
			{#each state.layout.cells as cell (cell.id)}
				<rect
					class={`expert-spread-matrix__cell ${cell.outlier ? 'expert-spread-matrix__cell--outlier' : ''}`}
					x={cell.x + 2}
					y={cell.y + 2}
					width={cell.size - 4}
					height={cell.size - 4}
					rx="5"
					fill={cell.color}
				/>
				<text
					class="expert-spread-matrix__value"
					x={cell.x + cell.size / 2}
					y={cell.y + cell.size / 2 + 4}
					text-anchor="middle">{cell.value}</text
				>
			{/each}
		</svg>
	</div>
</section>

<style>
	.expert-spread-matrix {
		display: grid;
		gap: 0.85rem;
		min-width: 0;
	}
	.expert-spread-matrix__header {
		display: flex;
		align-items: end;
		justify-content: space-between;
		gap: 1rem;
	}
	.expert-spread-matrix__header h3,
	.expert-spread-matrix__header p {
		margin: 0;
	}
	.expert-spread-matrix__header h3 {
		font-size: 1rem;
	}
	.expert-spread-matrix__header p {
		color: var(--color-text-secondary, #64748b);
		font-size: 0.78rem;
	}
	.expert-spread-matrix__viewport {
		overflow-x: auto;
	}
	.expert-spread-matrix__viewport svg {
		display: block;
		min-width: 42rem;
		width: 100%;
		height: auto;
	}
	.expert-spread-matrix__label {
		fill: var(--color-text-secondary, #64748b);
		font-size: 0.68rem;
		font-weight: 800;
	}
	.expert-spread-matrix__label--expert {
		fill: var(--color-text-primary, #0f172a);
	}
	.expert-spread-matrix__cell {
		stroke: color-mix(in srgb, #2563eb 36%, white);
		stroke-width: 1;
	}
	.expert-spread-matrix__cell--outlier {
		stroke: #f59e0b;
		stroke-width: 3;
	}
	.expert-spread-matrix__value {
		fill: #0f172a;
		font-size: 0.66rem;
		font-weight: 850;
		font-variant-numeric: tabular-nums;
	}
</style>
