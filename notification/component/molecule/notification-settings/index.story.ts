import NotificationSettings from '$stylist/notification/component/molecule/notification-settings/index.svelte';
import type { RecipeNotificationSettings } from '$stylist/notification/interface/recipe/notification-settings';
import type { ContractStory } from '$stylist/html/interface/contract/story';

/** A settings panel for configuring notification channels per notification type. */
export default {
	component: NotificationSettings,
	title: 'NotificationSettings',
	description: 'A settings panel for configuring notification options.',
	args: {
		showEmail: true,
		showPush: true,
		showSms: true,
		showInApp: true,
		preferences: [
			{
				id: 'pref-1',
				name: 'Product updates',
				description: 'New feature rollouts and roadmap milestones.',
				channels: { email: true, push: true, sms: false, in_app: true }
			},
			{
				id: 'pref-2',
				name: 'Billing alerts',
				description: 'Invoices, payment reminders, and receipts.',
				channels: { email: true, push: false, sms: true, in_app: true }
			},
			{
				id: 'pref-3',
				name: 'Security events',
				description: 'Password changes, MFA prompts, and new login alerts.',
				channels: { email: true, push: true, sms: true, in_app: true }
			}
		]
	},
	controls: {
		showEmail: { type: 'boolean', description: 'Whether to show email channel' },
		showPush: { type: 'boolean', description: 'Whether to show push channel' },
		showSms: { type: 'boolean', description: 'Whether to show SMS channel' },
		showInApp: { type: 'boolean', description: 'Whether to show in-app channel' }
	},
	presets: { 'Email only': { showPush: false, showSms: false, showInApp: false } }
} satisfies ContractStory<RecipeNotificationSettings>;
