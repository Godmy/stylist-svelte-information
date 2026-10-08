<script lang="ts">
	import Story from '$stylist/theme/component/molecule/story/index.svelte';
	import type { SlotStory } from '$stylist/theme/interface/slot/story';
	import type { NotificationItem } from '$stylist/notification/type/object/notification-item';
	import NotificationList from './index.svelte';

	type Props = {
		showDismiss: boolean;
		showTypeIcon: boolean;
		showTimestamp: boolean;
		maxVisible: number;
	};

	const controls: SlotStory[] = [
		{ name: 'showDismiss', type: 'boolean', defaultValue: true },
		{ name: 'showTypeIcon', type: 'boolean', defaultValue: true },
		{ name: 'showTimestamp', type: 'boolean', defaultValue: true },
		{ name: 'maxVisible', type: 'number', defaultValue: 5 }
	];

	const notifications: NotificationItem[] = [
		{
			id: '1',
			title: 'Task assigned',
			message: 'You have a new task: "Update homepage design"',
			type: 'info',
			read: false,
			timestamp: new Date(Date.now() - 1000 * 60 * 5) // 5 minutes ago
		},
		{
			id: '2',
			title: 'System update',
			message: 'Scheduled maintenance at 20:00 UTC',
			type: 'warning',
			read: false,
			timestamp: new Date(Date.now() - 1000 * 60 * 30) // 30 minutes ago
		},
		{
			id: '3',
			title: 'Payment received',
			message: 'Your payment of $99.00 has been processed',
			type: 'success',
			read: true,
			timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2) // 2 hours ago
		},
		{
			id: '4',
			title: 'Login attempt failed',
			message: 'Someone tried to login with incorrect password',
			type: 'error',
			read: false,
			timestamp: new Date(Date.now() - 1000 * 60 * 60 * 5) // 5 hours ago
		},
		{
			id: '5',
			title: 'New comment',
			message: 'John commented on your post "Design System Best Practices"',
			type: 'info',
			read: true,
			timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24) // 1 day ago
		}
	];

	function handleDismiss(id: string) {
		console.log('Notification dismissed:', id);
	}

	function handleNotificationClick(notification: NotificationItem) {
		console.log('Notification clicked:', notification);
	}
</script>

<Story
	id="organisms-notification-list"
	title="Organisms / Interaction / Feedback / Notifications / Notification List"
	component={NotificationList}
	category="Organisms/Interaction/Feedback/Notifications"
	description="A notification list component for displaying user notifications with various types and actions."
	tags={['notification', 'alert', 'feedback', 'list']}
	{controls}
>
	{#snippet children(values: any)}
		<div class="sb-organisms-notification-list _c1">
			<h1 class="_c2">NotificationList Component</h1>

			<div class="_c3">
				<h2 class="_c4">Interactive NotificationList</h2>
				<div class="_c5">
					<NotificationList
						{notifications}
						showDismiss={values.showDismiss}
						showTypeIcon={values.showTypeIcon}
						showTimestamp={values.showTimestamp}
						maxVisible={values.maxVisible}
						onDismiss={handleDismiss}
						onNotificationClick={handleNotificationClick}
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
