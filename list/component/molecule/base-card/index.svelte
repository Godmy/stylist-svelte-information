<script lang="ts">
	import type { RecipeBaseCard } from '$stylist/list/interface/recipe/base-card';
	import { createBaseCardState } from './state.svelte';

	let props: RecipeBaseCard = $props();
	const state = createBaseCardState(() => props);
</script>

<div
	class={state.containerClasses}
	data-variant={state.variant}
	data-size={state.size}
	data-disabled={state.disabled || undefined}
	{...state.restProps}
>
	{#if state.hasHeader}
		<div class={state.headerClasses}>
			{#if props.title}
				<h3 class="bc-title">{props.title}</h3>
			{/if}
			{#if props.description}
				<p class="bc-description">{props.description}</p>
			{/if}
		</div>
	{/if}

	<div class={state.bodyClasses}>
		{#if props.children}{@render props.children()}{/if}
	</div>

	{#if state.hasFooter}
		<div class={state.footerClasses}>
			{@render props.footer!()}
		</div>
	{/if}
</div>

<style>
	.base-card {
		border-radius: 0.5rem;
		border: 1px solid var(--color-border-primary);
		background-color: var(--color-background-primary);
		transition:
			border-color var(--duration-120, 120ms),
			box-shadow var(--duration-120, 120ms);
	}
	.base-card[data-variant='primary'] {
		border-color: var(--color-primary-200);
		background-color: var(--color-primary-50);
	}
	.base-card[data-variant='secondary'] {
		border-color: var(--color-secondary-200);
		background-color: var(--color-secondary-50);
	}
	.base-card[data-variant='success'] {
		border-color: var(--color-success-200);
		background-color: var(--color-success-50);
	}
	.base-card[data-variant='warning'] {
		border-color: var(--color-warning-200);
		background-color: var(--color-warning-50);
	}
	.base-card[data-variant='danger'],
	.base-card[data-variant='error'] {
		border-color: var(--color-danger-200);
		background-color: var(--color-danger-50);
	}
	.base-card[data-variant='elevated'] {
		box-shadow: var(--shadow-sm, 0 1px 2px rgb(15 23 42 / 0.08));
	}

	.base-card[data-size='xs'] .base-card__header,
	.base-card[data-size='xs'] .base-card__body,
	.base-card[data-size='xs'] .base-card__footer {
		padding: 0.5rem;
	}
	.base-card[data-size='sm'] .base-card__header,
	.base-card[data-size='sm'] .base-card__body,
	.base-card[data-size='sm'] .base-card__footer {
		padding: 0.75rem;
	}
	.base-card[data-size='lg'] .base-card__header,
	.base-card[data-size='lg'] .base-card__body,
	.base-card[data-size='lg'] .base-card__footer {
		padding: 1.5rem;
	}
	.base-card[data-size='xl'],
	.base-card[data-size='2xl'] {
		padding: 2rem;
	}
	.base-card[data-size='xl'] .base-card__header,
	.base-card[data-size='2xl'] .base-card__header,
	.base-card[data-size='xl'] .base-card__body,
	.base-card[data-size='2xl'] .base-card__body,
	.base-card[data-size='xl'] .base-card__footer,
	.base-card[data-size='2xl'] .base-card__footer {
		padding: 2rem;
	}

	.base-card[data-disabled] {
		opacity: 0.5;
		pointer-events: none;
	}

	.base-card__header {
		padding: 1rem;
		border-bottom: 1px solid var(--color-border-primary);
	}
	.base-card__body {
		padding: 1rem;
	}
	.base-card__footer {
		padding: 1rem;
		border-top: 1px solid var(--color-border-primary);
	}
	.bc-title {
		font-size: 1.125rem;
		font-weight: 600;
	}
	.bc-description {
		font-size: 0.875rem;
		color: var(--color-text-secondary);
	}
</style>
