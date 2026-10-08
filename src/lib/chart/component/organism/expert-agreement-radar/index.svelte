<script lang="ts">
	import createExpertAgreementRadarState from './state.svelte';
	import type { RecipeExpertAgreementRadar } from '$stylist/chart/interface/recipe/expert-agreement-radar';

	let props: RecipeExpertAgreementRadar = $props();
	const state = createExpertAgreementRadarState(() => props);
</script>

<section
	class={state.className}
	aria-label={props.ariaLabel ?? props.text ?? 'Expert agreement radar'}
>
	{#if props.text}<header class="expert-agreement-radar__header">
			<h3>{props.text}</h3>
			{#if props.description}<p>{props.description}</p>{/if}
		</header>{/if}
	<svg viewBox={`0 0 ${state.layout.width} ${state.layout.height}`} role="img">
		{#each [0.25, 0.5, 0.75, 1] as ratio}
			<circle
				class="expert-agreement-radar__ring"
				cx={state.layout.centerX}
				cy={state.layout.centerY}
				r={state.layout.radius * ratio}
			/>
		{/each}
		{#each state.layout.labelPoints as label, index}
			<line
				class="expert-agreement-radar__axis"
				x1={state.layout.centerX}
				y1={state.layout.centerY}
				x2={label.x}
				y2={label.y}
			/>
			<text
				class="expert-agreement-radar__label"
				x={label.x}
				y={label.y + 4}
				text-anchor={index === 0 || index === state.layout.labelPoints.length / 2
					? 'middle'
					: label.x > state.layout.centerX
						? 'start'
						: 'end'}>{label.text}</text
			>
		{/each}
		<path class="expert-agreement-radar__target" d={state.layout.targetPath} />
		<path class="expert-agreement-radar__value" d={state.layout.valuePath} />
		{#each state.layout.valuePoints as point (point.id)}
			<circle class="expert-agreement-radar__point" cx={point.x} cy={point.y} r="4" />
		{/each}
	</svg>
</section>

<style>
	.expert-agreement-radar {
		display: grid;
		gap: 0.85rem;
		min-width: 0;
	}
	.expert-agreement-radar__header {
		display: flex;
		align-items: end;
		justify-content: space-between;
		gap: 1rem;
	}
	.expert-agreement-radar__header h3,
	.expert-agreement-radar__header p {
		margin: 0;
	}
	.expert-agreement-radar__header h3 {
		font-size: 1rem;
	}
	.expert-agreement-radar__header p {
		color: var(--color-text-secondary, #64748b);
		font-size: 0.78rem;
	}
	.expert-agreement-radar svg {
		display: block;
		max-width: 34rem;
		width: 100%;
		height: auto;
	}
	.expert-agreement-radar__ring,
	.expert-agreement-radar__axis {
		fill: none;
		stroke: color-mix(in srgb, var(--color-border-primary, #cbd5e1) 65%, transparent);
		stroke-width: 1;
	}
	.expert-agreement-radar__target {
		fill: color-mix(in srgb, #f59e0b 16%, transparent);
		stroke: #f59e0b;
		stroke-dasharray: 5 5;
		stroke-width: 1.6;
	}
	.expert-agreement-radar__value {
		fill: color-mix(in srgb, #2563eb 28%, transparent);
		stroke: #2563eb;
		stroke-width: 2.5;
	}
	.expert-agreement-radar__point {
		fill: #ffffff;
		stroke: #2563eb;
		stroke-width: 2;
	}
	.expert-agreement-radar__label {
		fill: var(--color-text-secondary, #64748b);
		font-size: 0.7rem;
		font-weight: 800;
	}
</style>
