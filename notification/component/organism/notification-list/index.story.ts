import NotificationList from '$stylist/notification/component/organism/notification-list/index.svelte';
import type { RecipeNotificationList } from '$stylist/notification/interface/recipe/notification-list';
import type { ContractStory } from '$stylist/html/interface/contract/story';

const minute = 1000 * 60;

/** A notification list with typed items, timestamps and dismiss actions. */
export default {
	component: NotificationList,
	title: 'NotificationList',
	description:
		'A notification list component for displaying user notifications with various types and actions.',
	args: {
		showDismiss: true,
		showTypeIcon: true,
		showTimestamp: true,
		maxVisible: 5,
		notifications: [
			{
				id: '1',
				title: 'Task assigned',
				message: 'You have a new task: "Update homepage design"',
				type: 'info',
				read: false,
				timestamp: new Date(Date.now() - minute * 5)
			},
			{
				id: '2',
				title: 'System update',
				message: 'Scheduled maintenance at 20:00 UTC',
				type: 'warning',
				read: false,
				timestamp: new Date(Date.now() - minute * 30)
			},
			{
				id: '3',
				title: 'Payment received',
				message: 'Your payment of $99.00 has been processed',
				type: 'success',
				read: true,
				timestamp: new Date(Date.now() - minute * 60 * 2)
			},
			{
				id: '4',
				title: 'Login attempt failed',
				message: 'Someone tried to login with incorrect password',
				type: 'error',
				read: false,
				timestamp: new Date(Date.now() - minute * 60 * 5)
			},
			{
				id: '5',
				title: 'New comment',
				message: 'John commented on your post "Design System Best Practices"',
				type: 'info',
				read: true,
				timestamp: new Date(Date.now() - minute * 60 * 24)
			}
		]
	},
	controls: {
		showDismiss: { type: 'boolean' },
		showTypeIcon: { type: 'boolean' },
		showTimestamp: { type: 'boolean' },
		maxVisible: { type: 'number', min: 0, max: 5 }
	},
	presets: {
		Minimal: { showDismiss: false, showTypeIcon: false, showTimestamp: false },
		'Top two': { maxVisible: 2 }
	}
} satisfies ContractStory<RecipeNotificationList>;
