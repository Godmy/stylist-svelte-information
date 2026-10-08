<script lang="ts">
	import type { RecipeScheduledNotification } from '$stylist/notification/interface/recipe/scheduled-notification';
	import { createScheduledNotificationState } from './state.svelte';
	import Icon from '$stylist/svg/component/atom/icon/index.svelte';

	let props: RecipeScheduledNotification = $props();
	const state = createScheduledNotificationState(() => props);
</script>

<div class={state.containerClasses} {...state.restProps}>
	<h3 class="scheduled-notification__title">Scheduled Notifications</h3>

	<div class="scheduled-notification__list">
		{#each state.notifications as notification (notification.id)}
			<div class="scheduled-notification__item">
				{#if state.allowReorder}
					<span class="scheduled-notification__handle" aria-hidden="true">
						<Icon name="menu" class="scheduled-notification__handle-icon" />
					</span>
				{/if}

				<label class="scheduled-notification__toggle">
					<input
						type="checkbox"
						class="scheduled-notification__toggle-input"
						checked={notification.enabled}
						onchange={() => state.handleToggle(notification.id)}
					/>
					<span class="scheduled-notification__toggle-track"></span>
				</label>

				<div class="scheduled-notification__item-body">
					<div class="scheduled-notification__item-title">{notification.title}</div>
					<div class="scheduled-notification__item-description">{notification.description}</div>
					<div class="scheduled-notification__item-meta">
						<Icon name="clock" class="scheduled-notification__meta-icon" />
						{notification.scheduledAt}
						{#if state.showRecurrence}
							<span class="scheduled-notification__recurrence">
								{state.recurrenceLabel(notification.recurrence)}
							</span>
						{/if}
					</div>
				</div>

				{#if state.showEditButton || state.showDeleteButton}
					<div class="scheduled-notification__actions">
						{#if state.showEditButton}
							<button
								type="button"
								class="scheduled-notification__action"
								aria-label="Edit notification"
								onclick={() => state.handleEdit(notification)}
							>
								<Icon name="edit" class="scheduled-notification__action-icon" />
							</button>
						{/if}
						{#if state.showDeleteButton}
							<button
								type="button"
								class="scheduled-notification__action scheduled-notification__action--danger"
								aria-label="Delete notification"
								onclick={() => state.handleDelete(notification.id)}
							>
								<Icon name="trash-2" class="scheduled-notification__action-icon" />
							</button>
						{/if}
					</div>
				{/if}
			</div>
		{:else}
			<div class="scheduled-notification__empty">No scheduled notifications.</div>
		{/each}
	</div>
</div>

<style>
	.scheduled-notification__title {
		margin: 0 0 0.5rem;
		font-size: 1rem;
		font-weight: 600;
		color: var(--color-text-primary);
	}

	.scheduled-notification__list {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
	}

	.scheduled-notification__item {
		display: flex;
		align-items: flex-start;
		gap: 0.625rem;
		border: 1px solid var(--color-border-primary);
		border-radius: var(--border-radius-base, 0.375rem);
		background: var(--color-background-primary);
		padding: 0.625rem;
	}

	.scheduled-notification__handle {
		display: inline-flex;
		align-items: center;
		margin-top: 0.25rem;
		color: var(--color-text-tertiary);
		cursor: grab;
	}

	.scheduled-notification__handle-icon {
		width: 1rem;
		height: 1rem;
	}

	.scheduled-notification__toggle {
		position: relative;
		display: inline-flex;
		flex-shrink: 0;
		align-items: center;
		margin-top: 0.125rem;
		cursor: pointer;
	}

	.scheduled-notification__toggle-input {
		position: absolute;
		width: 1px;
		height: 1px;
		padding: 0;
		margin: -1px;
		overflow: hidden;
		clip: rect(0, 0, 0, 0);
		white-space: nowrap;
		border-width: 0;
	}

	.scheduled-notification__toggle-track {
		display: block;
		width: 2.25rem;
		height: 1.25rem;
		border-radius: 9999px;
		background-color: var(--color-background-tertiary);
		transition: background-color 150ms ease;
	}

	.scheduled-notification__toggle-track::after {
		content: '';
		display: block;
		width: 1rem;
		height: 1rem;
		margin: 0.125rem;
		border-radius: 9999px;
		background-color: var(--color-background-primary);
		box-shadow: 0 1px 2px rgb(0 0 0 / 0.15);
		transition: transform 150ms ease;
	}

	.scheduled-notification__toggle-input:checked + .scheduled-notification__toggle-track {
		background-color: var(--color-primary-600);
	}

	.scheduled-notification__toggle-input:checked + .scheduled-notification__toggle-track::after {
		transform: translateX(1rem);
	}

	.scheduled-notification__toggle-input:focus-visible + .scheduled-notification__toggle-track {
		outline: 2px solid var(--color-primary-400);
		outline-offset: 2px;
	}

	.scheduled-notification__item-body {
		flex: 1;
		min-width: 0;
	}

	.scheduled-notification__item-title {
		font-size: 0.875rem;
		font-weight: 600;
		color: var(--color-text-primary);
	}

	.scheduled-notification__item-description {
		margin-top: 0.125rem;
		font-size: 0.8125rem;
		color: var(--color-text-secondary);
	}

	.scheduled-notification__item-meta {
		display: flex;
		align-items: center;
		gap: 0.3125rem;
		margin-top: 0.375rem;
		font-size: 0.75rem;
		color: var(--color-text-tertiary);
	}

	.scheduled-notification__meta-icon {
		width: 0.875rem;
		height: 0.875rem;
	}

	.scheduled-notification__recurrence {
		display: inline-flex;
		align-items: center;
		border-radius: 9999px;
		background: var(--color-background-secondary);
		padding: 0.0625rem 0.5rem;
		font-weight: 600;
		color: var(--color-text-secondary);
	}

	.scheduled-notification__actions {
		display: flex;
		gap: 0.25rem;
		flex-shrink: 0;
	}

	.scheduled-notification__action {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		width: 1.75rem;
		height: 1.75rem;
		border: 0;
		border-radius: var(--border-radius-base, 0.375rem);
		background: transparent;
		color: var(--color-text-secondary);
		cursor: pointer;
	}

	.scheduled-notification__action:hover {
		background: var(--color-background-secondary);
		color: var(--color-text-primary);
	}

	.scheduled-notification__action--danger:hover {
		background: var(--color-danger-50);
		color: var(--color-danger-600);
	}

	.scheduled-notification__action-icon {
		width: 1rem;
		height: 1rem;
	}

	.scheduled-notification__empty {
		padding: 1rem 0;
		text-align: center;
		font-size: 0.875rem;
		color: var(--color-text-secondary);
	}
</style>
