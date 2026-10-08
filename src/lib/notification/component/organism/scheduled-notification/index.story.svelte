<script lang="ts">
	import Story from '$stylist/theme/component/molecule/story/index.svelte';
	import type { SlotStory } from '$stylist/theme/interface/slot/story';
	import type { ScheduledNotificationItem } from '$stylist/notification/type/object/scheduled-notification-item';
	import ScheduledNotification from './index.svelte';

	type Props = {
		showEditButton: boolean;
		showDeleteButton: boolean;
		showRecurrence: boolean;
		allowReorder: boolean;
	};

	const controls: SlotStory[] = [
		{ name: 'showEditButton', type: 'boolean', defaultValue: true },
		{ name: 'showDeleteButton', type: 'boolean', defaultValue: true },
		{ name: 'showRecurrence', type: 'boolean', defaultValue: true },
		{ name: 'allowReorder', type: 'boolean', defaultValue: true }
	];

	const notifications: ScheduledNotificationItem[] = [
		{
			id: '1',
			title: 'Weekly report',
			description: 'Get a summary of your weekly activity',
			scheduledAt: 'Mon 09:00',
			enabled: true,
			recurrence: 'weekly'
		},
		{
			id: '2',
			title: 'Monthly invoice',
			description: 'Receive your monthly invoice',
			scheduledAt: '1st of month',
			enabled: true,
			recurrence: 'monthly'
		},
		{
			id: '3',
			title: 'Daily standup reminder',
			description: 'Time to update your status',
			scheduledAt: 'Daily 10:00',
			enabled: false,
			recurrence: 'daily'
		},
		{
			id: '4',
			title: 'One-time meeting',
			description: 'Quarterly review meeting',
			scheduledAt: '2026-03-01 14:00',
			enabled: true,
			recurrence: 'once'
		}
	];

	function handleEdit(notification: ScheduledNotificationItem) {
		console.log('Edit notification:', notification);
	}

	function handleDelete(id: string) {
		console.log('Delete notification:', id);
	}

	function handleToggle(id: string) {
		console.log('SlotToggle notification:', id);
	}
</script>

<Story
	id="organisms-scheduled-notification"
	title="Organisms / Interaction / Feedback / Notifications / Scheduled Notification"
	component={ScheduledNotification}
	category="Organisms/Interaction/Feedback/Notifications"
	description="A scheduled notification component for managing recurring and one-time notifications."
	tags={['notification', 'scheduled', 'recurring', 'reminder']}
	{controls}
>
	{#snippet children(values: any)}
		<div class="sb-organisms-scheduled-notification _c1">
			<h1 class="_c2">ScheduledNotification Component</h1>

			<div class="_c3">
				<h2 class="_c4">Interactive ScheduledNotification</h2>
				<div class="_c5">
					<ScheduledNotification
						{notifications}
						showEditButton={values.showEditButton}
						showDeleteButton={values.showDeleteButton}
						showRecurrence={values.showRecurrence}
						allowReorder={values.allowReorder}
						onEdit={handleEdit}
						onDelete={handleDelete}
						onToggle={handleToggle}
					/>
				</div>
			</div>
		</div>
	{/snippet}
</Story>

<style>
	._c1 {
		padding: 1rem;
	}
	._c2 {
		margin-bottom: 1rem;
		font-size: 1.125rem;
		line-height: 1.75rem;
		font-weight: 600;
	}
	._c3 {
		margin-bottom: 1.5rem;
		border-radius: 0.25rem;
		border-width: 1px;
		border-style: solid;
		padding: 1rem;
	}
	._c4 {
		font-size: 1rem;
		line-height: 1.5rem;
		margin-bottom: 0.5rem;
		font-weight: 600;
	}
	._c5 {
		max-width: 32rem;
	}
</style>
