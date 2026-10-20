<script lang="ts">
	import NotificationCenter from './index.svelte';
	import type { RecipeNotificationCenter } from '$stylist/notification/interface/recipe/notification-center';
	import type { NotificationItem } from '$stylist/notification/type/object/notification-item';

	// Render of index.story.ts: the toolbar and Load more need callbacks over local notifications.
	let args: RecipeNotificationCenter = $props();

	const minute = 1000 * 60;
	let seed = $state(4);
	let notifications = $state<NotificationItem[]>([
		{
			id: '1',
			title: 'Welcome',
			message: 'Welcome to the platform.',
			type: 'info',
			read: false,
			timestamp: new Date(Date.now() - minute * 2)
		},
		{
			id: '2',
			title: 'Build complete',
			message: 'Production build completed successfully.',
			type: 'success',
			read: true,
			timestamp: new Date(Date.now() - minute * 15)
		},
		{
			id: '3',
			title: 'Invoice ready',
			message: 'Your invoice is now available.',
			type: 'info',
			read: false,
			timestamp: new Date(Date.now() - minute * 60)
		}
	]);

	function markRead(notification: NotificationItem) {
		notifications = notifications.map((item) =>
			item.id === notification.id ? { ...item, read: true } : item
		);
	}

	function markAllRead() {
		notifications = notifications.map((item) => ({ ...item, read: true }));
	}

	function clearAll() {
		notifications = [];
	}

	function fetchMore() {
		const id = String(seed);
		seed += 1;
		notifications = [
			...notifications,
			{
				id,
				title: `Older notification ${id}`,
				message: 'Loaded from the notification history.',
				type: 'neutral',
				read: true,
				timestamp: new Date(Date.now() - minute * 60 * Number(id))
			}
		];
	}
</script>

<NotificationCenter
	{...args}
	{notifications}
	onNotificationClick={markRead}
	onMarkAllRead={markAllRead}
	onClearAll={clearAll}
	onFetchMore={fetchMore}
/>
