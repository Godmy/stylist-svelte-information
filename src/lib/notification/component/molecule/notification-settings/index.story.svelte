<script lang="ts">
	import Story from '$stylist/theme/component/molecule/story/index.svelte';
	import NotificationSettings from './index.svelte';
	import type { INotificationSettingsPreference } from '$stylist/notification/type/object/notification-settings-preference';
	import type { TokenControllerType } from '$stylist/domain/type/alias/controller-type';

	const controls = [
		{
			name: 'showEmail',
			type: 'boolean' as TokenControllerType,
			defaultValue: true,
			description: 'Whether to show email channel'
		},
		{
			name: 'showPush',
			type: 'boolean' as TokenControllerType,
			defaultValue: true,
			description: 'Whether to show push channel'
		},
		{
			name: 'showSms',
			type: 'boolean' as TokenControllerType,
			defaultValue: true,
			description: 'Whether to show SMS channel'
		},
		{
			name: 'showInApp',
			type: 'boolean' as TokenControllerType,
			defaultValue: true,
			description: 'Whether to show in-app channel'
		}
	];

	const defaultPreferences: INotificationSettingsPreference[] = [
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
	];
</script>

<Story
	{controls}
	title="NotificationSettings Component"
	description="A settings panel for configuring notification options"
>
	{#snippet children(controlValues: any)}
		<div class="_c1">
			<h2 class="_c2">Notification Settings</h2>
			<NotificationSettings
				showEmail={controlValues.showEmail}
				showPush={controlValues.showPush}
				showSms={controlValues.showSms}
				showInApp={controlValues.showInApp}
				preferences={defaultPreferences}
			/>
		</div>
	{/snippet}
</Story>

<style>
	._c1 {
		margin-left: auto;
		margin-right: auto;
		max-width: 28rem;
		padding: 1.5rem;
	}
	._c2 {
		margin-bottom: 1.5rem;
		font-size: 1.25rem;
		line-height: 1.75rem;
		font-weight: 600;
	}
</style>
