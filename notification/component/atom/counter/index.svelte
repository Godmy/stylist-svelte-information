<script lang="ts">
	import type { RecipeCounter } from '$stylist/notification/interface/recipe/counter';
	import createCounterState from './state.svelte';

	let props: RecipeCounter = $props();

	const state = createCounterState(() => props);

	const restProps = $derived(
		(() => {
			const {
				class: _class,
				count: _count,
				max: _max,
				variant: _variant,
				size: _size,
				...rest
			} = props;
			return rest;
		})()
	);
</script>

<span class={state.classes} {...restProps}>
	{state.displayCount}
</span>

<style>
	.counter {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		min-width: 1.5rem;
		border-radius: 999px;
		font-weight: 700;
		line-height: 1;
		font-variant-numeric: tabular-nums;
		white-space: nowrap;
	}

	.counter--default,
	.counter--flat {
		background: var(--color-background-secondary);
		color: var(--color-text-primary);
	}

	.counter--primary,
	.counter--info {
		background: var(--color-primary-600);
		color: var(--color-text-inverse);
	}

	.counter--secondary {
		background: var(--color-secondary-600, var(--color-neutral-700));
		color: var(--color-text-inverse);
	}

	.counter--success {
		background: var(--color-success-600);
		color: var(--color-text-inverse);
	}

	.counter--warning {
		background: var(--color-warning-500);
		color: var(--color-neutral-950, var(--color-text-primary));
	}

	.counter--danger,
	.counter--error {
		background: var(--color-danger-600);
		color: var(--color-text-inverse);
	}

	.counter--gray,
	.counter--neutral,
	.counter--subtle,
	.counter--light {
		background: var(--color-neutral-100);
		color: var(--color-neutral-800);
	}

	.counter--dark,
	.counter--solid {
		background: var(--color-neutral-800);
		color: var(--color-text-inverse);
	}

	.counter--outline {
		border: 1px solid var(--color-border-primary);
		background: transparent;
		color: var(--color-text-primary);
	}

	.counter--ghost,
	.counter--link {
		background: transparent;
		color: var(--color-primary-600);
	}

	.counter--elevated {
		background: var(--color-background-primary);
		color: var(--color-text-primary);
		box-shadow: var(--shadow-sm, 0 1px 2px rgb(15 23 42 / 0.08));
	}

	.counter--xs,
	.counter--1-4 {
		min-width: 1rem;
		height: 1rem;
		padding: 0 0.25rem;
		font-size: 0.625rem;
	}

	.counter--sm,
	.counter--1-3,
	.counter--2-5 {
		min-width: 1.25rem;
		height: 1.25rem;
		padding: 0 0.375rem;
		font-size: 0.75rem;
	}

	.counter--md,
	.counter--1-2,
	.counter--3-5 {
		min-width: 1.5rem;
		height: 1.5rem;
		padding: 0 0.5rem;
		font-size: 0.8125rem;
	}

	.counter--lg,
	.counter--2-3 {
		min-width: 1.875rem;
		height: 1.875rem;
		padding: 0 0.625rem;
		font-size: 0.9375rem;
	}

	.counter--xl,
	.counter--3-4 {
		min-width: 2.25rem;
		height: 2.25rem;
		padding: 0 0.75rem;
		font-size: 1rem;
	}

	.counter--2xl,
	.counter--full {
		min-width: 2.75rem;
		height: 2.75rem;
		padding: 0 0.875rem;
		font-size: 1.125rem;
	}
</style>
