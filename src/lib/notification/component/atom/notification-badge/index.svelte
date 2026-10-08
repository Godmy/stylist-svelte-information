<script lang="ts">
	import type { RecipeNotificationBadge } from '$stylist/notification/interface/recipe/notification-badge';
	import { createNotificationBadgeState } from './state.svelte';

	let props: RecipeNotificationBadge = $props();
	const state = createNotificationBadgeState(() => props);
</script>

{#if state.shouldShow}
	<div class={state.containerClasses} {...state.restProps}>
		{#if props.children}
			{@render props.children()}
		{/if}

		<span class={state.badgeClasses} aria-label={`${state.count} notifications`}>
			{#if !state.showDot && (state.count > 0 || state.showZero)}
				{state.badgeContent}
			{/if}
		</span>
	</div>
{:else}
	<div class={state.fallbackClasses} {...state.restProps}>
		{#if props.children}
			{@render props.children()}
		{/if}
	</div>
{/if}

<style>
	.notification-badge {
		position: relative;
		display: inline-flex;
		width: fit-content;
		max-width: 100%;
		vertical-align: middle;
	}

	.notification-badge__fallback {
		display: inline-block;
	}

	.notification-badge__badge {
		position: absolute;
		z-index: 1;
		display: inline-flex;
		align-items: center;
		justify-content: center;
		min-width: 1.125rem;
		height: 1.125rem;
		padding: 0 0.3125rem;
		border: 2px solid var(--color-background-primary);
		border-radius: 999px;
		background: var(--color-danger-600);
		color: var(--color-text-inverse);
		font-size: 0.6875rem;
		font-weight: 750;
		line-height: 1;
		font-variant-numeric: tabular-nums;
		box-shadow: var(--shadow-sm, 0 1px 2px rgb(15 23 42 / 0.08));
	}

	.notification-badge__badge--dot {
		min-width: 0.625rem;
		width: 0.625rem;
		height: 0.625rem;
		padding: 0;
	}

	.notification-badge__badge--top-end {
		top: 0;
		right: 0;
		transform: translate(45%, -45%);
	}

	.notification-badge__badge--top-start {
		top: 0;
		left: 0;
		transform: translate(-45%, -45%);
	}

	.notification-badge__badge--bottom-end {
		right: 0;
		bottom: 0;
		transform: translate(45%, 45%);
	}

	.notification-badge__badge--bottom-start {
		bottom: 0;
		left: 0;
		transform: translate(-45%, 45%);
	}

	.notification-badge__badge--success {
		background: var(--color-success-600);
	}

	.notification-badge__badge--info,
	.notification-badge__badge--primary {
		background: var(--color-primary-600);
	}

	.notification-badge__badge--warning {
		background: var(--color-warning-500);
		color: var(--color-warning-950, #422006);
	}

	.notification-badge__badge--neutral,
	.notification-badge__badge--default {
		background: var(--color-neutral-700);
	}
</style>
