<script lang="ts">
	import Icon from '$stylist/svg/component/atom/icon/index.svelte';
	import type { RecipeListItemMarker } from '$stylist/list/interface/recipe/list-item-marker';
	import createListItemMarkerState from './state.svelte';

	type IconSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | number;

	let props: RecipeListItemMarker = $props();
	const state = createListItemMarkerState(() => props);
	const iconSize = $derived<IconSize>(
		(
			{
				xs: 'xs',
				sm: 'sm',
				md: 'md',
				lg: 'lg',
				xl: 'xl',
				'2xl': '2xl',
				'1/4': 'xs',
				'1/3': 'sm',
				'2/5': 'sm',
				'1/2': 'md',
				'3/5': 'md',
				'2/3': 'lg',
				'3/4': 'xl',
				full: 'xl'
			} as const
		)[state.size]
	);
	const restProps = $derived.by(() => {
		const {
			class: _class,
			type: _type,
			value: _value,
			color: _color,
			size: _size,
			...rest
		} = props;
		return rest;
	});
</script>

<span class={state.classes} {...restProps}>
	{#if state.type === 'bullet'}
		<span class={state.bulletClasses}></span>
	{:else if state.type === 'number'}
		{state.value}
	{:else if typeof state.value === 'string'}
		<Icon name={state.value} size={iconSize} />
	{/if}
</span>

<style>
	.list-item-marker {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		flex: 0 0 auto;
		font-weight: 700;
		line-height: 1;
		color: var(--color-neutral-600);
	}

	.list-item-marker--default,
	.list-item-marker--gray,
	.list-item-marker--neutral,
	.list-item-marker--subtle,
	.list-item-marker--light,
	.list-item-marker--flat {
		color: var(--color-neutral-600);
	}

	.list-item-marker--primary,
	.list-item-marker--info,
	.list-item-marker--solid,
	.list-item-marker--link {
		color: var(--color-primary-600);
	}

	.list-item-marker--secondary {
		color: var(--color-secondary-600, var(--color-neutral-700));
	}

	.list-item-marker--success {
		color: var(--color-success-600);
	}

	.list-item-marker--warning {
		color: var(--color-warning-600);
	}

	.list-item-marker--danger,
	.list-item-marker--error {
		color: var(--color-danger-600);
	}

	.list-item-marker--dark {
		color: var(--color-neutral-900);
	}

	.list-item-marker--outline,
	.list-item-marker--ghost,
	.list-item-marker--elevated {
		color: var(--color-text-secondary);
	}

	.list-item-marker--xs,
	.list-item-marker--1-4 {
		width: 0.875rem;
		height: 0.875rem;
		font-size: 0.625rem;
	}

	.list-item-marker--sm,
	.list-item-marker--1-3,
	.list-item-marker--2-5 {
		width: 1rem;
		height: 1rem;
		font-size: 0.75rem;
	}

	.list-item-marker--md,
	.list-item-marker--1-2,
	.list-item-marker--3-5 {
		width: 1.25rem;
		height: 1.25rem;
		font-size: 0.875rem;
	}

	.list-item-marker--lg,
	.list-item-marker--2-3 {
		width: 1.5rem;
		height: 1.5rem;
		font-size: 1rem;
	}

	.list-item-marker--xl,
	.list-item-marker--3-4 {
		width: 1.75rem;
		height: 1.75rem;
		font-size: 1.125rem;
	}

	.list-item-marker--2xl,
	.list-item-marker--full {
		width: 2rem;
		height: 2rem;
		font-size: 1.25rem;
	}

	.list-item-marker__bullet {
		display: inline-block;
		border-radius: 999px;
		background: currentColor;
	}

	.list-item-marker__bullet--xs,
	.list-item-marker__bullet--1-4 {
		width: 0.25rem;
		height: 0.25rem;
	}

	.list-item-marker__bullet--sm,
	.list-item-marker__bullet--1-3,
	.list-item-marker__bullet--2-5 {
		width: 0.375rem;
		height: 0.375rem;
	}

	.list-item-marker__bullet--md,
	.list-item-marker__bullet--1-2,
	.list-item-marker__bullet--3-5 {
		width: 0.5rem;
		height: 0.5rem;
	}

	.list-item-marker__bullet--lg,
	.list-item-marker__bullet--2-3 {
		width: 0.625rem;
		height: 0.625rem;
	}

	.list-item-marker__bullet--xl,
	.list-item-marker__bullet--3-4 {
		width: 0.75rem;
		height: 0.75rem;
	}

	.list-item-marker__bullet--2xl,
	.list-item-marker__bullet--full {
		width: 0.875rem;
		height: 0.875rem;
	}
</style>
