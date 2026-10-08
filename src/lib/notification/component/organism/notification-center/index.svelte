<script lang="ts">
	import type { RecipeNotificationCenter } from '$stylist/notification/interface/recipe/notification-center';
	import { createNotificationCenterState } from './state.svelte';
	import Icon from '$stylist/svg/component/atom/icon/index.svelte';
	import CountBadge from '$stylist/notification/component/atom/count-badge/index.svelte';
	import MessageTimestamp from '$stylist/chat/component/atom/message-timestamp/index.svelte';

	let props: RecipeNotificationCenter = $props();
	const state = createNotificationCenterState(() => props);
</script>

<div class={state.containerClasses} {...state.restProps}>
	<div class="notification-center__header">
		<div class="notification-center__title">
			<Icon name="bell" class="notification-center__title-icon" />
			<h3 class="notification-center__title-text">Notification Center</h3>
		</div>
		{#if state.showUnreadCount}
			<CountBadge count={state.unread} />
		{/if}
	</div>

	{#if state.canMarkAllRead || state.canClearAll}
		<div class="notification-center__toolbar">
			{#if state.canMarkAllRead}
				<button type="button" class="notification-center__action" onclick={state.handleMarkAllRead}>
					<Icon name="check-check" class="notification-center__action-icon" />
					Mark all read
				</button>
			{/if}
			{#if state.canClearAll}
				<button type="button" class="notification-center__action" onclick={state.handleClearAll}>
					<Icon name="trash-2" class="notification-center__action-icon" />
					Clear all
				</button>
			{/if}
		</div>
	{/if}

	<div class="notification-center__list">
		{#each state.notifications as notification (notification.id)}
			<button
				type="button"
				class="notification-center__item"
				class:notification-center__item--unread={!notification.read}
				onclick={() => state.handleNotificationClick(notification)}
			>
				<Icon svg={state.getTypeIcon(notification.type)} class="notification-center__item-icon" />
				<div class="notification-center__item-body">
					<div class="notification-center__item-title">{notification.title}</div>
					{#if notification.message}
						<div class="notification-center__item-message">{notification.message}</div>
					{/if}
				</div>
				{#if state.showTimestamp && notification.timestamp}
					<MessageTimestamp
						timestamp={notification.timestamp}
						showRelative
						class="notification-center__item-timestamp"
					/>
				{/if}
			</button>
		{:else}
			<div class="notification-center__empty">No notifications yet.</div>
		{/each}
	</div>

	{#if state.canFetchMore}
		<button type="button" class="notification-center__fetch-more" onclick={state.handleFetchMore}>
			Load more
		</button>
	{/if}
</div>

<style>
	.notification-center {
		border-radius: var(--border-radius-large, 0.5rem);
		border: 1px solid var(--color-border-primary);
		background: var(--color-background-primary);
		padding: 1rem;
	}

	.notification-center__header {
		display: flex;
		align-items: center;
		justify-content: space-between;
	}

	.notification-center__title {
		display: flex;
		align-items: center;
		gap: 0.5rem;
	}

	.notification-center__title-icon {
		width: 1.25rem;
		height: 1.25rem;
		color: var(--color-text-secondary);
	}

	.notification-center__title-text {
		font-size: 1rem;
		font-weight: 600;
		color: var(--color-text-primary);
		margin: 0;
	}

	.notification-center__toolbar {
		display: flex;
		gap: 0.5rem;
		margin-top: 0.75rem;
	}

	.notification-center__action {
		display: inline-flex;
		align-items: center;
		gap: 0.375rem;
		border: 1px solid var(--color-border-primary);
		border-radius: var(--border-radius-base, 0.375rem);
		background: var(--color-background-primary);
		color: var(--color-text-secondary);
		padding: 0.375rem 0.625rem;
		font-size: 0.75rem;
		font-weight: 600;
		cursor: pointer;
	}

	.notification-center__action:hover {
		color: var(--color-text-primary);
		background: var(--color-background-secondary);
	}

	.notification-center__action-icon {
		width: 0.875rem;
		height: 0.875rem;
	}

	.notification-center__list {
		margin-top: 0.75rem;
		display: flex;
		flex-direction: column;
		gap: 0.375rem;
	}

	.notification-center__item {
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

	.notification-center__item:hover {
		background: var(--color-background-secondary);
	}

	.notification-center__item--unread {
		border-color: var(--color-primary-200);
		background: var(--color-primary-50);
	}

	.notification-center__item-icon {
		width: 1.125rem;
		height: 1.125rem;
		flex-shrink: 0;
		margin-top: 0.125rem;
		color: var(--color-text-secondary);
	}

	.notification-center__item-body {
		flex: 1;
		min-width: 0;
	}

	.notification-center__item-title {
		font-size: 0.875rem;
		font-weight: 600;
		color: var(--color-text-primary);
	}

	.notification-center__item-message {
		margin-top: 0.125rem;
		font-size: 0.8125rem;
		color: var(--color-text-secondary);
	}

	.notification-center__item-timestamp {
		flex-shrink: 0;
		font-size: 0.75rem;
	}

	.notification-center__empty {
		padding: 1rem 0;
		text-align: center;
		font-size: 0.875rem;
		color: var(--color-text-secondary);
	}

	.notification-center__fetch-more {
		width: 100%;
		margin-top: 0.75rem;
		border: 1px dashed var(--color-border-primary);
		border-radius: var(--border-radius-base, 0.375rem);
		background: transparent;
		color: var(--color-text-secondary);
		padding: 0.5rem;
		font-size: 0.8125rem;
		font-weight: 600;
		cursor: pointer;
	}

	.notification-center__fetch-more:hover {
		color: var(--color-text-primary);
		background: var(--color-background-secondary);
	}
</style>
