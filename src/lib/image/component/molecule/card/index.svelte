<script lang="ts">
	import type { RecipeCard } from '$stylist/image/interface/recipe/card';
	import { createCardState } from './state.svelte';

	let props: RecipeCard = $props();
	const state = createCardState(() => props);

	const PADDING: Record<string, string> = {
		xs: '0.5rem',
		sm: '0.75rem',
		md: '1rem',
		lg: '1.5rem',
		xl: '2rem'
	};
	const SHADOW: Record<number, string> = {
		0: 'none',
		1: '0 1px 2px rgba(0,0,0,0.05)',
		2: '0 1px 3px rgba(0,0,0,0.1), 0 1px 2px rgba(0,0,0,0.06)',
		3: '0 4px 6px rgba(0,0,0,0.07), 0 2px 4px rgba(0,0,0,0.06)',
		4: '0 10px 15px rgba(0,0,0,0.1), 0 4px 6px rgba(0,0,0,0.05)',
		5: '0 20px 25px rgba(0,0,0,0.1), 0 10px 10px rgba(0,0,0,0.04)',
		6: '0 25px 50px rgba(0,0,0,0.25)'
	};

	const padding = $derived(PADDING[state.size] ?? '1rem');
	const shadow = $derived(SHADOW[Math.min(Math.max(Math.round(state.elevation), 0), 6)] ?? 'none');
</script>

<div
	class={[
		'layout-card',
		`layout-card--${state.shape}`,
		state.clickable && 'layout-card--clickable',
		state.fullWidth && 'layout-card--full-width',
		props.class
	]
		.filter(Boolean)
		.join(' ')}
	style:--card-padding={padding}
	style:--card-shadow={shadow}
	style:opacity={state.opacity}
	{...state.restProps}
>
	{#if props.media}
		<div class="layout-card__media">
			{@render props.media()}
		</div>
	{/if}

	{#if props.header}
		{@render props.header()}
	{/if}

	{#if props.children}
		<div class="layout-card__body">
			{#if props.children}{@render props.children()}{/if}
		</div>
	{/if}

	{#if props.footer}
		<div class="layout-card__footer">
			{@render props.footer()}
		</div>
	{/if}
</div>

<style>
	.layout-card {
		position: relative;
		display: flex;
		flex-direction: column;
		overflow: hidden;
		background-color: var(--color-background-primary);
		border: 1px solid var(--color-border-primary);
		padding: var(--card-padding, 1rem);
		box-shadow: var(--card-shadow, none);
	}

	.layout-card--rounded {
		border-radius: 0.75rem;
	}

	.layout-card--rectangular {
		border-radius: 0;
	}

	.layout-card--pill {
		border-radius: 9999px;
	}

	.layout-card--circular {
		border-radius: 9999px;
		aspect-ratio: 1;
	}

	.layout-card--clickable {
		cursor: pointer;
		transition:
			box-shadow 150ms ease,
			transform 150ms ease;
	}

	.layout-card--clickable:hover {
		box-shadow: 0 4px 6px rgba(0, 0, 0, 0.07);
	}

	.layout-card--clickable:active {
		transform: scale(0.99);
	}

	.layout-card--full-width {
		width: 100%;
	}

	.layout-card__media {
		margin: calc(-1 * var(--card-padding, 1rem));
		margin-bottom: 0;
		margin-top: calc(-1 * var(--card-padding, 1rem));
		overflow: hidden;
	}

	.layout-card__body {
		display: flex;
		flex-direction: column;
		gap: 0.25rem;
		flex: 1;
	}

	.layout-card__footer {
		margin-top: 1rem;
		padding-top: 1rem;
		border-top: 1px solid var(--color-border-primary);
	}
</style>
