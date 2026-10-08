<script lang="ts">
	import type { RecipeNotificationList } from '$stylist/notification/interface/recipe/notification-list';
	import type { HTMLAttributes } from 'svelte/elements';
	import { createNotificationListState } from './state.svelte';
	import Icon from '$stylist/svg/component/atom/icon/index.svelte';
	import MessageTimestamp from '$stylist/chat/component/atom/message-timestamp/index.svelte';

	let props: RecipeNotificationList = $props();
	const state = createNotificationListState(() => props);
</script>

<div class={state.containerClasses} {...state.restProps as HTMLAttributes<HTMLDivElement>}>
	{#each state.notifications as notification (notification.id)}
		<button
			type="button"
			class="notification-list__item"
			onclick={() => state.handleNotificationClick(notification)}
		>
			{#if state.showTypeIcon}
				<Icon svg={state.getTypeIcon(notification.type)} class={state.getTypeClass(notification.type)} />
			{/if}
			<div class="notification-list__item-body">
				<div class="notification-list__item-title">{notification.title}</div>
				{#if notification.message}
					<div class="notification-list__item-message">{notification.message}</div>
				{/if}
				{#if state.showTimestamp && notification.timestamp}
					<MessageTimestamp
						timestamp={notification.timestamp}
						showRelative
						class="notification-list__item-timestamp"
					/>
				{/if}
			</div>
			{#if state.showDismiss}
				<span
					role="button"
					tabindex="0"
					class="notification-list__dismiss"
					aria-label="Dismiss notification"
					onclick={(event) => state.handleDismiss(event, notification.id)}
					onkeydown={(event) => {
						if (event.key === 'Enter' || event.key === ' ') {
							event.preventDefault();
							state.handleDismiss(event as unknown as MouseEvent, notification.id);
						}
					}}
				>
					<Icon name="x" class="notification-list__dismiss-icon" />
				</span>
			{/if}
		</button>
	{:else}
		<div class="notification-list__empty">No notifications yet.</div>
	{/each}
</div>

<style>
	.notification-list {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
	}

	.notification-list__item {
		display: flex;
		align-items: flex-start;
		gap: 0.625rem;
		width: 100%;
		border: 1px solid var(--color-border-primary);
		border-radius: var(--border-radius-base, 0.375rem);
		background: var(--color-background-primary);
		padding: 0.625rem;
		text-align: left;
		cursor: pointer;
	}

	.notification-list__item:hover {
		background: var(--color-background-secondary);
	}

	.notification-list__item-icon {
		width: 1.125rem;
		height: 1.125rem;
		flex-shrink: 0;
		margin-top: 0.125rem;
	}

	.notification-list__item-icon--success {
		color: var(--color-success-500);
	}
	.notification-list__item-icon--warning {
		color: var(--color-warning-500);
	}
	.notification-list__item-icon--error,
	.notification-list__item-icon--danger {
		color: var(--color-danger-500);
	}
	.notification-list__item-icon--info {
		color: var(--color-primary-500);
	}

	.notification-list__item-body {
		flex: 1;
		min-width: 0;
	}

	.notification-list__item-title {
		font-size: 0.875rem;
		font-weight: 500;
		color: var(--color-text-primary);
	}

	.notification-list__item-message {
		margin-top: 0.125rem;
		font-size: 0.875rem;
		line-height: 1.25rem;
		color: var(--color-text-secondary);
	}

	.notification-list__item-timestamp {
		display: block;
		margin-top: 0.25rem;
	}

	.notification-list__dismiss {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		flex-shrink: 0;
		width: 1.5rem;
		height: 1.5rem;
		border-radius: var(--border-radius-base, 0.375rem);
		color: var(--color-text-tertiary);
		cursor: pointer;
	}

	.notification-list__dismiss:hover {
		color: var(--color-text-secondary);
		background: var(--color-background-secondary);
	}

	.notification-list__dismiss-icon {
		width: 1rem;
		height: 1rem;
	}

	.notification-list__empty {
		padding: 1rem 0;
		text-align: center;
		font-size: 0.875rem;
		color: var(--color-text-secondary);
	}
</style>
