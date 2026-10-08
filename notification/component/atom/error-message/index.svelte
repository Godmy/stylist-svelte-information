<script lang="ts">
	import type { RecipeErrorMessage } from '$stylist/notification/interface/recipe/error-message';
	import { createErrorMessageState } from './state.svelte';

	let props: RecipeErrorMessage = $props();

	const state = createErrorMessageState(() => props);

	const restProps = $derived(
		(() => {
			const {
				class: _class,
				text: _text,
				error: _error,
				showRetry: _showRetry,
				onRetry: _onRetry,
				...rest
			} = props;
			return rest;
		})()
	);
</script>

{#if state.errorMessage}
	<div class={state.containerClasses} {...restProps}>
		<div class={state.titleClasses}>{state.text}</div>
		<div class={state.textClasses}>{state.errorMessage}</div>
		{#if state.showRetry && state.onRetry}
			<div class={state.buttonContainerClasses}>
				<button class={state.buttonClasses} onclick={state.onRetry} aria-label="Retry action"
					>Retry</button
				>
			</div>
		{/if}
	</div>
{/if}

<style>
	.error-message {
		display: grid;
		gap: 0.25rem;
		border-radius: var(--border-radius-large, 0.5rem);
		border: 1px solid var(--color-danger-200);
		background-color: var(--color-danger-50);
		padding: 1rem;
		color: var(--color-danger-900);
		box-shadow: var(--shadow-sm, 0 1px 2px rgb(15 23 42 / 0.08));
	}

	.error-message__title {
		font-size: 0.875rem;
		font-weight: 600;
	}

	.error-message__text {
		font-size: 0.875rem;
		line-height: 1.35;
		overflow-wrap: anywhere;
	}

	.error-message__actions {
		margin-top: 0.75rem;
	}

	.error-message__retry-btn {
		display: inline-flex;
		align-items: center;
		border-radius: var(--border-radius-base, 0.375rem);
		background-color: var(--color-danger-600);
		padding: 0.375rem 0.75rem;
		font-size: 0.875rem;
		font-weight: 500;
		color: var(--color-text-inverse);
		border: none;
		cursor: pointer;
		transition: background-color 0.15s ease;
	}

	.error-message__retry-btn:hover {
		background-color: var(--color-danger-700);
	}
</style>
