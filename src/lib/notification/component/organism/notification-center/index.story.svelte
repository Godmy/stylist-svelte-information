<script lang="ts">
	import Story from '$stylist/theme/component/molecule/story/index.svelte';
	import type { SlotStory } from '$stylist/theme/interface/slot/story';
	import type { NotificationItem } from '$stylist/notification/type/object/notification-item';

	import NotificationCenter from './index.svelte';

	const controls: SlotStory[] = [
		{ name: 'showUnreadCount', type: 'boolean', defaultValue: true },
		{ name: 'showMarkAllRead', type: 'boolean', defaultValue: true },
		{ name: 'showClearAll', type: 'boolean', defaultValue: true },
		{ name: 'showTimestamp', type: 'boolean', defaultValue: true },
		{ name: 'pollingInterval', type: 'number', defaultValue: 30000 }
	];

	const notifications: NotificationItem[] = [
		{
			id: '1',
			title: 'Welcome',
			message: 'Welcome to the platform.',
			type: 'info',
			read: false,
			timestamp: new Date(Date.now() - 1000 * 60 * 2)
		},
		{
			id: '2',
			title: 'Build complete',
			message: 'Production build completed successfully.',
			type: 'success',
			read: true,
			timestamp: new Date(Date.now() - 1000 * 60 * 15)
		},
		{
			id: '3',
			title: 'Invoice ready',
			message: 'Your invoice is now available.',
			type: 'info',
			read: false,
			timestamp: new Date(Date.now() - 1000 * 60 * 60)
		}
	];
</script>

<Story
	id="organisms-notification-center"
	title="Organisms / Interaction / Feedback / Notifications / Notification Center"
	component={NotificationCenter}
	category="Organisms/Interaction/Feedback/Notifications"
	description="Notification center with a compact unread summary."
	{controls}
>
	{#snippet children(values: any)}
		<div class="_c1">
			<NotificationCenter
				{notifications}
				showUnreadCount={values.showUnreadCount}
				showMarkAllRead={values.showMarkAllRead}
				showClearAll={values.showClearAll}
				showTimestamp={values.showTimestamp}
				pollingInterval={values.pollingInterval}
				onNotificationClick={(notification: NotificationItem) => {
					console.log('Notification clicked:', notification);
				}}
				onMarkAllRead={() => {
					console.log('Mark all as read');
				}}
				onClearAll={() => {
					console.log('Clear all notifications');
				}}
				onFetchMore={() => {
					console.log('Fetch more notifications');
				}}
			/>
		</div>
	{/snippet}
</Story>

<style>
	._c1 {
		padding: 1rem;
	}
</style>
