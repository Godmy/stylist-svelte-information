<script lang="ts">
	import createCriticalPathTimelineState from './state.svelte';
	import type { RecipeCriticalPathTimeline } from '$stylist/chart/interface/recipe/critical-path-timeline';

	let props: RecipeCriticalPathTimeline = $props();
	const state = createCriticalPathTimelineState(() => props);
</script>

<section
	class={state.className}
	aria-label={props.ariaLabel ?? props.text ?? 'Critical path timeline'}
>
	{#if props.text}
		<header class="critical-path-timeline__header">
			<h3>{props.text}</h3>
			{#if props.description}
				<p>{props.description}</p>
			{/if}
		</header>
	{/if}

	<div class="critical-path-timeline__viewport">
		<svg
			viewBox={`0 0 ${Math.max(state.layout.width, state.layout.plotX + state.layout.plotWidth + 32)} ${state.layout.height}`}
			role="img"
			aria-label={props.ariaLabel ?? props.text ?? 'Work schedule critical path'}
		>
			<rect
				class="critical-path-timeline__plot"
				x={state.layout.plotX}
				y={state.layout.plotY - 18}
				width={state.layout.plotWidth}
				height={state.layout.height - state.layout.plotY - 18}
				rx="8"
			/>
			{#each state.layout.ticks as tick (tick.id)}
				<line
					class="critical-path-timeline__time-grid"
					x1={tick.x}
					y1={state.layout.plotY - 18}
					x2={tick.x}
					y2={state.layout.height - 22}
				/>
				{#if tick.showLabel}
					<text
						class="critical-path-timeline__time"
						x={tick.x}
						y={state.layout.plotY - 28}
						text-anchor="middle"
					>
						{tick.label}
					</text>
				{/if}
			{/each}
			{#each state.layout.tasks as task (task.id)}
				<line
					class="critical-path-timeline__row-line"
					x1="0"
					y1={task.y + task.height / 2}
					x2={state.layout.plotX + state.layout.plotWidth}
					y2={task.y + task.height / 2}
				/>
				<text
					class="critical-path-timeline__task-label"
					x={state.layout.plotX - 14}
					y={task.y + 13}
					text-anchor="end"
				>
					{task.text}
				</text>
			{/each}
			{#each state.layout.links as link (link.id)}
				<path
					class={`critical-path-timeline__dependency ${link.critical ? 'critical-path-timeline__dependency--critical' : ''}`}
					d={link.path}
				/>
			{/each}
			{#each state.layout.tasks as task (task.id)}
				<g
					class={`critical-path-timeline__task ${task.critical ? 'critical-path-timeline__task--critical' : ''}`}
				>
					<rect
						class="critical-path-timeline__task-bar"
						x={task.x}
						y={task.y}
						width={task.width}
						height={task.height}
						rx="6"
					/>
					<rect
						class="critical-path-timeline__task-progress"
						x={task.x}
						y={task.y}
						width={task.progressWidth}
						height={task.height}
						rx="6"
					/>
					<title>{task.text}: {task.startLabel} - {task.endLabel}</title>
				</g>
			{/each}
		</svg>
	</div>

	<div class="critical-path-timeline__summary">
		<span
			><i class="critical-path-timeline__marker critical-path-timeline__marker--critical"></i> Critical
			path</span
		>
		<strong>{state.layout.criticalPathLabel}</strong>
	</div>
</section>

<style>
	.critical-path-timeline {
		display: grid;
		gap: 0.85rem;
		min-width: 0;
	}

	.critical-path-timeline__header {
		display: flex;
		align-items: end;
		justify-content: space-between;
		gap: 1rem;
	}

	.critical-path-timeline__header h3,
	.critical-path-timeline__header p {
		margin: 0;
	}

	.critical-path-timeline__header h3 {
		font-size: 1rem;
		line-height: 1.2;
	}

	.critical-path-timeline__header p {
		color: var(--color-text-secondary, #64748b);
		font-size: 0.78rem;
	}

	.critical-path-timeline__viewport {
		min-width: 0;
		overflow-x: auto;
	}

	.critical-path-timeline__viewport svg {
		display: block;
		min-width: 54rem;
		width: 100%;
		height: auto;
		overflow: visible;
	}

	.critical-path-timeline__plot {
		fill: var(--color-background-secondary, #f8fafc);
	}

	.critical-path-timeline__time-grid {
		stroke: color-mix(in srgb, var(--color-border-primary, #cbd5e1) 45%, transparent);
		stroke-width: 1;
	}

	.critical-path-timeline__row-line {
		stroke: color-mix(in srgb, var(--color-border-primary, #cbd5e1) 38%, transparent);
		stroke-width: 1;
	}

	.critical-path-timeline__time,
	.critical-path-timeline__task-label {
		fill: var(--color-text-secondary, #64748b);
		font-size: 0.68rem;
		font-weight: 800;
	}

	.critical-path-timeline__task-label {
		fill: var(--color-text-primary, #0f172a);
	}

	.critical-path-timeline__dependency {
		fill: none;
		stroke: #94a3b8;
		stroke-dasharray: 5 5;
		stroke-linecap: round;
		stroke-linejoin: round;
		stroke-width: 1.4;
	}

	.critical-path-timeline__dependency--critical {
		stroke: #f59e0b;
		stroke-dasharray: none;
		stroke-width: 2.4;
	}

	.critical-path-timeline__task-bar {
		fill: color-mix(in srgb, #2563eb 22%, white 78%);
		stroke: #2563eb;
		stroke-width: 1.2;
	}

	.critical-path-timeline__task-progress {
		fill: color-mix(in srgb, #2563eb 52%, white 48%);
	}

	.critical-path-timeline__task--critical .critical-path-timeline__task-bar {
		fill: color-mix(in srgb, #f59e0b 28%, white 72%);
		stroke: #d97706;
		stroke-width: 2;
	}

	.critical-path-timeline__task--critical .critical-path-timeline__task-progress {
		fill: #f59e0b;
	}

	.critical-path-timeline__summary {
		display: grid;
		gap: 0.3rem;
		padding: 0.65rem 0.8rem;
		border: 1px solid color-mix(in srgb, #f59e0b 52%, var(--color-border-primary, #cbd5e1) 48%);
		border-left: 5px solid #f59e0b;
		border-radius: 6px;
		background: color-mix(in srgb, #f59e0b 10%, white 90%);
	}

	.critical-path-timeline__summary span,
	.critical-path-timeline__summary strong {
		font-size: 0.78rem;
	}

	.critical-path-timeline__summary span {
		display: inline-flex;
		align-items: center;
		gap: 0.4rem;
		color: #92400e;
		font-weight: 850;
	}

	.critical-path-timeline__summary strong {
		color: #422006;
		font-weight: 800;
	}

	.critical-path-timeline__marker {
		width: 1rem;
		height: 0.4rem;
		border-radius: 99px;
	}

	.critical-path-timeline__marker--critical {
		background: #f59e0b;
	}
</style>
