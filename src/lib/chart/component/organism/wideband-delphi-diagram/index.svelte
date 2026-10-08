<script lang="ts">
	import createWidebandDelphiDiagramState from './state.svelte';
	import type { RecipeWidebandDelphiDiagram } from '$stylist/chart/interface/recipe/wideband-delphi-diagram';

	let props: RecipeWidebandDelphiDiagram = $props();
	const state = createWidebandDelphiDiagramState(() => props);
</script>

<section
	class={state.className}
	aria-label={props.ariaLabel ?? props.text ?? 'Wideband Delphi diagram'}
>
	{#if props.text}
		<header class="wideband-delphi-diagram__header">
			<h3>{props.text}</h3>
			{#if props.description}
				<p>{props.description}</p>
			{/if}
		</header>
	{/if}

	<div class="wideband-delphi-diagram__viewport">
		<svg
			viewBox={`0 0 ${state.layout.width} ${state.layout.height}`}
			role="img"
			aria-label={props.ariaLabel ?? props.text ?? 'Wideband Delphi procurement forecast'}
		>
			<rect
				class="wideband-delphi-diagram__plot"
				x={state.layout.plotX}
				y={state.layout.plotY}
				width={state.layout.plotWidth}
				height={state.layout.plotHeight}
				rx="8"
			/>
			{#each state.layout.ticks as tick (tick.id)}
				<line
					class="wideband-delphi-diagram__grid"
					x1={state.layout.plotX}
					y1={tick.y}
					x2={state.layout.plotX + state.layout.plotWidth}
					y2={tick.y}
				/>
				<text
					class="wideband-delphi-diagram__tick"
					x={state.layout.plotX - 12}
					y={tick.y + 4}
					text-anchor="end"
				>
					{tick.label}
				</text>
			{/each}
			<path class="wideband-delphi-diagram__outer-band" d={state.layout.outerBandPath} />
			<path class="wideband-delphi-diagram__core-band" d={state.layout.coreBandPath} />
			<path class="wideband-delphi-diagram__market" d={state.layout.marketPath} />
			<path class="wideband-delphi-diagram__procurement" d={state.layout.procurementPath} />
			<path class="wideband-delphi-diagram__consensus" d={state.layout.consensusPath} />
			{#each state.layout.points as point (point.id)}
				<line
					class="wideband-delphi-diagram__time-grid"
					x1={point.x}
					y1={state.layout.plotY}
					x2={point.x}
					y2={state.layout.plotY + state.layout.plotHeight}
				/>
				<circle class="wideband-delphi-diagram__point" cx={point.x} cy={point.consensusY} r="4" />
				{#if point.showTimeLabel}
					<text
						class="wideband-delphi-diagram__time"
						x={point.x}
						y={state.layout.plotY + state.layout.plotHeight + 24}
						text-anchor="middle"
					>
						{point.time}
					</text>
				{/if}
			{/each}
			<line
				class="wideband-delphi-diagram__axis"
				x1={state.layout.plotX}
				y1={state.layout.plotY + state.layout.plotHeight}
				x2={state.layout.plotX + state.layout.plotWidth}
				y2={state.layout.plotY + state.layout.plotHeight}
			/>
			<line
				class="wideband-delphi-diagram__axis"
				x1={state.layout.plotX}
				y1={state.layout.plotY}
				x2={state.layout.plotX}
				y2={state.layout.plotY + state.layout.plotHeight}
			/>
		</svg>
	</div>

	<div class="wideband-delphi-diagram__legend" aria-label="Forecast indicators">
		<span
			><i class="wideband-delphi-diagram__swatch wideband-delphi-diagram__swatch--outer"></i> Delphi
			wideband</span
		>
		<span
			><i class="wideband-delphi-diagram__swatch wideband-delphi-diagram__swatch--core"></i> Expert core
			range</span
		>
		<span
			><i class="wideband-delphi-diagram__line wideband-delphi-diagram__line--consensus"></i> Consensus</span
		>
		<span
			><i class="wideband-delphi-diagram__line wideband-delphi-diagram__line--market"></i> Market signal</span
		>
		<span
			><i class="wideband-delphi-diagram__line wideband-delphi-diagram__line--procurement"></i> Procurement
			target</span
		>
	</div>
</section>

<style>
	.wideband-delphi-diagram {
		display: grid;
		gap: 0.85rem;
		min-width: 0;
	}

	.wideband-delphi-diagram__header {
		display: flex;
		align-items: end;
		justify-content: space-between;
		gap: 1rem;
	}

	.wideband-delphi-diagram__header h3,
	.wideband-delphi-diagram__header p {
		margin: 0;
	}

	.wideband-delphi-diagram__header h3 {
		font-size: 1rem;
		line-height: 1.2;
	}

	.wideband-delphi-diagram__header p {
		color: var(--color-text-secondary, #64748b);
		font-size: 0.78rem;
	}

	.wideband-delphi-diagram__viewport {
		min-width: 0;
		overflow-x: auto;
	}

	.wideband-delphi-diagram__viewport svg {
		display: block;
		min-width: 46rem;
		width: 100%;
		height: auto;
		overflow: visible;
	}

	.wideband-delphi-diagram__plot {
		fill: var(--color-background-secondary, #f8fafc);
	}

	.wideband-delphi-diagram__grid,
	.wideband-delphi-diagram__time-grid {
		stroke: color-mix(in srgb, var(--color-border-primary, #cbd5e1) 55%, transparent);
		stroke-width: 1;
	}

	.wideband-delphi-diagram__time-grid {
		opacity: 0.38;
	}

	.wideband-delphi-diagram__axis {
		stroke: color-mix(in srgb, var(--color-border-primary, #cbd5e1) 80%, #0f172a 20%);
		stroke-width: 1.2;
	}

	.wideband-delphi-diagram__outer-band {
		fill: color-mix(in srgb, #2563eb 14%, transparent);
	}

	.wideband-delphi-diagram__core-band {
		fill: color-mix(in srgb, #2563eb 34%, transparent);
	}

	.wideband-delphi-diagram__consensus,
	.wideband-delphi-diagram__market,
	.wideband-delphi-diagram__procurement {
		fill: none;
		stroke-linecap: round;
		stroke-linejoin: round;
	}

	.wideband-delphi-diagram__consensus {
		stroke: #1d4ed8;
		stroke-width: 3;
	}

	.wideband-delphi-diagram__market {
		stroke: #0891b2;
		stroke-dasharray: 6 5;
		stroke-width: 2;
	}

	.wideband-delphi-diagram__procurement {
		stroke: #f59e0b;
		stroke-dasharray: 2 5;
		stroke-width: 2.4;
	}

	.wideband-delphi-diagram__point {
		fill: #ffffff;
		stroke: #1d4ed8;
		stroke-width: 2;
	}

	.wideband-delphi-diagram__tick,
	.wideband-delphi-diagram__time {
		fill: var(--color-text-secondary, #64748b);
		font-size: 0.68rem;
		font-weight: 750;
	}

	.wideband-delphi-diagram__legend {
		display: flex;
		flex-wrap: wrap;
		gap: 0.6rem 1rem;
		color: var(--color-text-secondary, #64748b);
		font-size: 0.74rem;
		font-weight: 800;
	}

	.wideband-delphi-diagram__legend span {
		display: inline-flex;
		align-items: center;
		gap: 0.35rem;
	}

	.wideband-delphi-diagram__swatch,
	.wideband-delphi-diagram__line {
		display: inline-block;
		width: 1.2rem;
		height: 0.45rem;
		border-radius: 99px;
	}

	.wideband-delphi-diagram__swatch--outer {
		background: color-mix(in srgb, #2563eb 18%, white 82%);
	}

	.wideband-delphi-diagram__swatch--core {
		background: color-mix(in srgb, #2563eb 42%, white 58%);
	}

	.wideband-delphi-diagram__line--consensus {
		background: #1d4ed8;
	}

	.wideband-delphi-diagram__line--market {
		background: #0891b2;
	}

	.wideband-delphi-diagram__line--procurement {
		background: #f59e0b;
	}
</style>
