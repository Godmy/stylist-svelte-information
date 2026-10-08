<script lang="ts">
	import createExchangeOracleForecastState from './state.svelte';
	import type { RecipeExchangeOracleForecast } from '$stylist/chart/interface/recipe/exchange-oracle-forecast';

	let props: RecipeExchangeOracleForecast = $props();
	const state = createExchangeOracleForecastState(() => props);
</script>

<section
	class={state.className}
	aria-label={props.ariaLabel ?? props.text ?? 'Exchange oracle forecast'}
>
	{#if props.text}
		<header class="exchange-oracle-forecast__header">
			<h3>{props.text}</h3>
			{#if props.description}
				<p>{props.description}</p>
			{/if}
		</header>
	{/if}

	<div class="exchange-oracle-forecast__viewport">
		<svg
			viewBox={`0 0 ${state.layout.width} ${state.layout.height}`}
			role="img"
			aria-label={props.ariaLabel ?? props.text ?? 'Exchange quote and oracle forecast'}
		>
			<rect
				class="exchange-oracle-forecast__plot"
				x={state.layout.plotX}
				y={state.layout.plotY}
				width={state.layout.plotWidth}
				height={state.layout.plotHeight}
				rx="8"
			/>
			<rect
				class="exchange-oracle-forecast__forecast-zone"
				x={state.layout.splitX}
				y={state.layout.plotY}
				width={state.layout.plotX + state.layout.plotWidth - state.layout.splitX}
				height={state.layout.plotHeight}
				rx="8"
			/>
			{#each state.layout.ticks as tick (tick.id)}
				<line
					class="exchange-oracle-forecast__grid"
					x1={state.layout.plotX}
					y1={tick.y}
					x2={state.layout.plotX + state.layout.plotWidth}
					y2={tick.y}
				/>
				<text
					class="exchange-oracle-forecast__tick"
					x={state.layout.plotX - 12}
					y={tick.y + 4}
					text-anchor="end"
				>
					{tick.label}
				</text>
			{/each}
			<path class="exchange-oracle-forecast__outer-band" d={state.layout.outerBandPath} />
			<path class="exchange-oracle-forecast__core-band" d={state.layout.coreBandPath} />
			<path class="exchange-oracle-forecast__history" d={state.layout.historyPath} />
			<path class="exchange-oracle-forecast__consensus" d={state.layout.consensusPath} />
			<line
				class="exchange-oracle-forecast__split"
				x1={state.layout.splitX}
				y1={state.layout.plotY - 8}
				x2={state.layout.splitX}
				y2={state.layout.plotY + state.layout.plotHeight + 8}
			/>
			<circle
				class="exchange-oracle-forecast__stop"
				cx={state.layout.lastHistoryPoint.x}
				cy={state.layout.lastHistoryPoint.y}
				r="5"
			/>
			<text
				class="exchange-oracle-forecast__zone-label"
				x={state.layout.plotX + 12}
				y={state.layout.plotY + 20}
			>
				Exchange quote
			</text>
			<text
				class="exchange-oracle-forecast__zone-label"
				x={state.layout.splitX + 12}
				y={state.layout.plotY + 20}
			>
				Wideband oracle
			</text>
			{#each state.layout.historyPoints as point (point.id)}
				<line
					class="exchange-oracle-forecast__time-grid"
					x1={point.x}
					y1={state.layout.plotY}
					x2={point.x}
					y2={state.layout.plotY + state.layout.plotHeight}
				/>
				{#if point.showLabel}
					<text
						class="exchange-oracle-forecast__time"
						x={point.x}
						y={state.layout.plotY + state.layout.plotHeight + 24}
						text-anchor="middle"
					>
						{point.time}
					</text>
				{/if}
			{/each}
			{#each state.layout.forecastPoints as point (point.id)}
				<line
					class="exchange-oracle-forecast__time-grid exchange-oracle-forecast__time-grid--forecast"
					x1={point.x}
					y1={state.layout.plotY}
					x2={point.x}
					y2={state.layout.plotY + state.layout.plotHeight}
				/>
				<circle
					class="exchange-oracle-forecast__forecast-point"
					cx={point.x}
					cy={point.consensusY}
					r="3.5"
				/>
				{#if point.showLabel}
					<text
						class="exchange-oracle-forecast__time"
						x={point.x}
						y={state.layout.plotY + state.layout.plotHeight + 24}
						text-anchor="middle"
					>
						{point.time}
					</text>
				{/if}
			{/each}
			<line
				class="exchange-oracle-forecast__axis"
				x1={state.layout.plotX}
				y1={state.layout.plotY + state.layout.plotHeight}
				x2={state.layout.plotX + state.layout.plotWidth}
				y2={state.layout.plotY + state.layout.plotHeight}
			/>
			<line
				class="exchange-oracle-forecast__axis"
				x1={state.layout.plotX}
				y1={state.layout.plotY}
				x2={state.layout.plotX}
				y2={state.layout.plotY + state.layout.plotHeight}
			/>
		</svg>
	</div>

	<div class="exchange-oracle-forecast__legend">
		<span
			><i class="exchange-oracle-forecast__line exchange-oracle-forecast__line--history"></i> Exchange
			quote</span
		>
		<span
			><i class="exchange-oracle-forecast__swatch exchange-oracle-forecast__swatch--outer"></i> Oracle
			corridor</span
		>
		<span
			><i class="exchange-oracle-forecast__swatch exchange-oracle-forecast__swatch--core"></i> Core variants</span
		>
		<span
			><i class="exchange-oracle-forecast__line exchange-oracle-forecast__line--consensus"></i> Expert
			consensus</span
		>
	</div>
</section>

<style>
	.exchange-oracle-forecast {
		display: grid;
		gap: 0.85rem;
		min-width: 0;
	}

	.exchange-oracle-forecast__header {
		display: flex;
		align-items: end;
		justify-content: space-between;
		gap: 1rem;
	}

	.exchange-oracle-forecast__header h3,
	.exchange-oracle-forecast__header p {
		margin: 0;
	}

	.exchange-oracle-forecast__header h3 {
		font-size: 1rem;
	}

	.exchange-oracle-forecast__header p {
		color: var(--color-text-secondary, #64748b);
		font-size: 0.78rem;
	}

	.exchange-oracle-forecast__viewport {
		min-width: 0;
		overflow-x: auto;
	}

	.exchange-oracle-forecast__viewport svg {
		display: block;
		min-width: 54rem;
		width: 100%;
		height: auto;
		overflow: visible;
	}

	.exchange-oracle-forecast__plot {
		fill: var(--color-background-secondary, #f8fafc);
	}

	.exchange-oracle-forecast__forecast-zone {
		fill: color-mix(in srgb, #f59e0b 8%, transparent);
	}

	.exchange-oracle-forecast__grid,
	.exchange-oracle-forecast__time-grid {
		stroke: color-mix(in srgb, var(--color-border-primary, #cbd5e1) 55%, transparent);
		stroke-width: 1;
	}

	.exchange-oracle-forecast__time-grid {
		opacity: 0.34;
	}

	.exchange-oracle-forecast__time-grid--forecast {
		stroke: color-mix(in srgb, #f59e0b 44%, transparent);
	}

	.exchange-oracle-forecast__axis {
		stroke: #94a3b8;
		stroke-width: 1.2;
	}

	.exchange-oracle-forecast__split {
		stroke: #f59e0b;
		stroke-dasharray: 5 5;
		stroke-width: 2;
	}

	.exchange-oracle-forecast__outer-band {
		fill: color-mix(in srgb, #f59e0b 18%, transparent);
	}

	.exchange-oracle-forecast__core-band {
		fill: color-mix(in srgb, #f59e0b 34%, transparent);
	}

	.exchange-oracle-forecast__history,
	.exchange-oracle-forecast__consensus {
		fill: none;
		stroke-linecap: round;
		stroke-linejoin: round;
	}

	.exchange-oracle-forecast__history {
		stroke: #2563eb;
		stroke-width: 2.6;
	}

	.exchange-oracle-forecast__consensus {
		stroke: #d97706;
		stroke-width: 3;
	}

	.exchange-oracle-forecast__stop {
		fill: #ffffff;
		stroke: #f59e0b;
		stroke-width: 3;
	}

	.exchange-oracle-forecast__forecast-point {
		fill: #ffffff;
		stroke: #d97706;
		stroke-width: 2;
	}

	.exchange-oracle-forecast__tick,
	.exchange-oracle-forecast__time,
	.exchange-oracle-forecast__zone-label {
		fill: var(--color-text-secondary, #64748b);
		font-size: 0.68rem;
		font-weight: 800;
	}

	.exchange-oracle-forecast__zone-label {
		fill: var(--color-text-primary, #0f172a);
	}

	.exchange-oracle-forecast__legend {
		display: flex;
		flex-wrap: wrap;
		gap: 0.6rem 1rem;
		color: var(--color-text-secondary, #64748b);
		font-size: 0.74rem;
		font-weight: 800;
	}

	.exchange-oracle-forecast__legend span {
		display: inline-flex;
		align-items: center;
		gap: 0.35rem;
	}

	.exchange-oracle-forecast__line,
	.exchange-oracle-forecast__swatch {
		display: inline-block;
		width: 1.2rem;
		height: 0.45rem;
		border-radius: 99px;
	}

	.exchange-oracle-forecast__line--history {
		background: #2563eb;
	}

	.exchange-oracle-forecast__line--consensus {
		background: #d97706;
	}

	.exchange-oracle-forecast__swatch--outer {
		background: color-mix(in srgb, #f59e0b 20%, white 80%);
	}

	.exchange-oracle-forecast__swatch--core {
		background: color-mix(in srgb, #f59e0b 42%, white 58%);
	}
</style>
