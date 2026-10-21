import NotificationCenter from './index.svelte';
import type { RecipeNotificationCenter } from '$stylist/notification/interface/recipe/notification-center';
import type { ContractStory } from '$stylist/html/interface/contract/story';

/** Notification center; index.story.svelte owns the notifications and the action callbacks. */
export default {
	component: NotificationCenter,
	title: 'NotificationCenter',
	description: 'Notification center with a compact unread summary.',
	args: {
		showUnreadCount: true,
		showMarkAllRead: true,
		showClearAll: true,
		showTimestamp: true,
		pollingInterval: 30000
	},
	controls: {
		showUnreadCount: { type: 'boolean' },
		showMarkAllRead: { type: 'boolean' },
		showClearAll: { type: 'boolean' },
		showTimestamp: { type: 'boolean' },
		pollingInterval: { type: 'number', min: 0, step: 1000 }
	},
	presets: {
		Compact: { showMarkAllRead: false, showClearAll: false, showTimestamp: false }
	}
} satisfies ContractStory<RecipeNotificationCenter>;
