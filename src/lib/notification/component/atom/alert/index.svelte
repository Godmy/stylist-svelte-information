<script lang="ts">
	import { createAlertState } from './state.svelte';
	import type { RecipeAlert } from '$stylist/notification/interface/recipe/alert';
	import Icon from '$stylist/svg/component/atom/icon/index.svelte';

	const props: RecipeAlert = $props();
	const state = createAlertState(() => props);
</script>

{#if state.open}
	<div role="alert" class={state.alertClasses} aria-live="polite" aria-atomic="true">
		<div class={state.mainContainerClasses}>
			{#if props.showIcon}
				<div class={state.iconContainerClasses}>
					<Icon name={state.IconComponent} class={state.iconClasses} aria-hidden="true" />
				</div>
			{/if}
			<div class={state.textContainerClasses}>
				{#if props.title}
					<h3 class={state.titleClasses}>{props.title}</h3>
				{/if}
				<div class={state.contentContainerClasses}>
					{#if props.content}
						{@render props.content()}
					{:else if props.children}
						{@render props.children()}
					{/if}
				</div>
			</div>
			{#if props.closable}
				<div class={state.closeButtonContainerClasses}>
					<button
						type="button"
						class={state.closeButtonClasses}
						aria-label="Close alert"
						onclick={state.handleClose}
					>
						<Icon name={state.XIcon} class="alert-close-icon" aria-hidden="true" />
					</button>
				</div>
			{/if}
		</div>
	</div>
{/if}

<style>
	.alert-container {
		padding: 1rem;
		border-radius: var(--border-radius-base, 0.375rem);
		border: 1px solid transparent;
		box-shadow: var(--shadow-sm, 0 1px 2px rgb(15 23 42 / 0.08));
	}

	.alert-container.variant-info {
		background-color: var(--color-info-50);
		border-color: var(--color-info-200);
		color: var(--color-info-800);
	}

	.alert-container.variant-success {
		background-color: var(--color-success-50);
		border-color: var(--color-success-200);
		color: var(--color-success-800);
	}

	.alert-container.variant-warning {
		background-color: var(--color-warning-50);
		border-color: var(--color-warning-200);
		color: var(--color-warning-800);
	}

	.alert-container.variant-error,
	.alert-container.variant-danger {
		background-color: var(--color-danger-50);
		border-color: var(--color-danger-200);
		color: var(--color-danger-800);
	}

	.alert-container.variant-primary {
		background-color: var(--color-primary-50);
		border-color: var(--color-primary-200);
		color: var(--color-primary-800);
	}

	.alert-container.variant-secondary {
		background-color: var(--color-secondary-50);
		border-color: var(--color-secondary-200);
		color: var(--color-secondary-800);
	}

	.alert-content {
		display: flex;
		align-items: flex-start;
		gap: 0.75rem;
	}

	.alert-text {
		flex: 1;
		min-width: 0;
	}

	.alert-close {
		flex: 0 0 auto;
		margin-left: auto;
	}

	.alert-icon-wrap {
		flex: 0 0 auto;
	}

	.alert-icon {
		flex-shrink: 0;
		width: 1.25rem;
		height: 1.25rem;
	}

	.alert-icon.variant-info {
		color: var(--color-info-500);
	}
	.alert-icon.variant-success {
		color: var(--color-success-500);
	}
	.alert-icon.variant-warning {
		color: var(--color-warning-500);
	}
	.alert-icon.variant-error,
	.alert-icon.variant-danger {
		color: var(--color-danger-500);
	}
	.alert-icon.variant-primary {
		color: var(--color-primary-500);
	}
	.alert-icon.variant-secondary {
		color: var(--color-secondary-500);
	}

	.alert-title {
		font-size: 0.875rem;
		font-weight: 650;
		line-height: 1.25rem;
		margin: 0 0 0.25rem;
	}

	.alert-description {
		font-size: 0.875rem;
		line-height: 1.35;
		overflow-wrap: anywhere;
	}

	.alert-description :global(p) {
		margin: 0;
	}

	.alert-close-button {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		width: 1.75rem;
		height: 1.75rem;
		border: 0;
		border-radius: var(--border-radius-base, 0.375rem);
		background: transparent;
		color: inherit;
		cursor: pointer;
		opacity: 0.72;
	}

	.alert-close-button:hover {
		background: rgb(15 23 42 / 0.08);
		opacity: 1;
	}

	.alert-close-icon {
		width: 1.25rem;
		height: 1.25rem;
	}
</style>
