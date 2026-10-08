<script lang="ts">
	import Story from '$stylist/theme/component/molecule/story/index.svelte';
	import type { SlotStory } from '$stylist/theme/interface/slot/story';
	import NotificationBadge from './index.svelte';

	const controls: SlotStory[] = [
		{ name: 'count', type: 'range', defaultValue: 12, min: 0, max: 140, step: 1 },
		{
			name: 'marker',
			type: 'select',
			defaultValue: 'number',
			options: ['number', 'dot', 'check', 'x']
		},
		{
			name: 'appearance',
			type: 'select',
			defaultValue: 'danger',
			options: ['danger', 'success', 'info', 'warning', 'neutral']
		},
		{
			name: 'position',
			type: 'select',
			defaultValue: 'top-end',
			options: ['top-end', 'top-start', 'bottom-end', 'bottom-start']
		},
		{ name: 'showZero', type: 'boolean', defaultValue: false }
	];
</script>

<Story
	id="atoms-notification-badge"
	title="NotificationBadge"
	component={NotificationBadge}
	category="Atoms"
	description="Badge marker for unread counts and notification states."
	tags={['notification', 'badge', 'status']}
	{controls}
>
	{#snippet children(values: any)}
		<div class="_c1">
			<NotificationBadge
				count={Number(values.count) || 0}
				marker={values.marker}
				appearance={values.appearance}
				position={values.position}
				showZero={Boolean(values.showZero)}
			>
				{#snippet children()}
					<div class="_c2">Inbox</div>
				{/snippet}
			</NotificationBadge>

			<div class="_c3">
				<NotificationBadge count={8}>
					{#snippet children()}<button type="button" class="_c4">Messages</button>{/snippet}
				</NotificationBadge>
				<NotificationBadge marker="dot" appearance="success">
					{#snippet children()}<button type="button" class="_c4">Tasks</button>{/snippet}
				</NotificationBadge>
				<NotificationBadge marker="check" appearance="success">
					{#snippet children()}<button type="button" class="_c4">Sync</button>{/snippet}
				</NotificationBadge>
			</div>
		</div>
	{/snippet}
</Story>

<style>
	._c1 {
		display: grid;
		gap: 2rem;
		padding: 1rem;
	}

	._c2 {
		display: grid;
		place-items: center;
		width: 4.5rem;
		height: 4.5rem;
		border: 1px solid var(--color-border-primary);
		border-radius: 0.5rem;
		background: var(--color-background-primary);
		color: var(--color-text-primary);
		font-weight: 700;
	}

	._c3 {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		gap: 1.25rem;
	}

	._c4 {
		border: 1px solid var(--color-border-primary);
		border-radius: 0.375rem;
		background: var(--color-background-primary);
		color: var(--color-text-primary);
		cursor: pointer;
		font-weight: 650;
		padding: 0.625rem 0.875rem;
	}
</style>
