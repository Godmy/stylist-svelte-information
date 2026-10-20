import ScheduledNotification from './index.svelte';
import type { RecipeScheduledNotification } from '$stylist/notification/interface/recipe/scheduled-notification';
import type { ContractStory } from '$stylist/html/interface/contract/story';

/** Manager of recurring and one-time scheduled notifications. */
export default {
	component: ScheduledNotification,
	title: 'ScheduledNotification',
	description:
		'A scheduled notification component for managing recurring and one-time notifications.',
	args: {
		showEditButton: true,
		showDeleteButton: true,
		showRecurrence: true,
		allowReorder: true,
		notifications: [
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
		]
	},
	controls: {
		showEditButton: { type: 'boolean' },
		showDeleteButton: { type: 'boolean' },
		showRecurrence: { type: 'boolean' },
		allowReorder: { type: 'boolean' }
	},
	presets: {
		'Read only': { showEditButton: false, showDeleteButton: false, allowReorder: false }
	}
} satisfies ContractStory<RecipeScheduledNotification>;
