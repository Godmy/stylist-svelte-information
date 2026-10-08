<script lang="ts">
	import Story from '$stylist/theme/component/molecule/story/index.svelte';
	import type { SlotStory } from '$stylist/theme/interface/slot/story';
	import Alert from './index.svelte';

	const controls: SlotStory[] = [
		{
			name: 'variant',
			type: 'select',
			options: ['info', 'success', 'warning', 'error'],
			defaultValue: 'info'
		},
		{ name: 'title', type: 'text', defaultValue: 'Workspace synced' },
		{ name: 'showIcon', type: 'boolean', defaultValue: true },
		{ name: 'closable', type: 'boolean', defaultValue: false }
	];

	const examples = [
		{
			variant: 'success',
			title: 'Deployment complete',
			text: 'The production bundle was published and all checks passed.'
		},
		{
			variant: 'warning',
			title: 'Usage approaching limit',
			text: 'Storage is at 82%. Review large generated assets before the next export.'
		},
		{
			variant: 'error',
			title: 'Sync failed',
			text: 'The latest workspace changes could not be saved. Retry after checking connectivity.'
		}
	] as const;
</script>

<Story
	id="atoms-alert"
	title="Alert"
	component={Alert}
	category="Atoms"
	description="Inline feedback for important user-visible status."
	tags={['notification', 'alert', 'feedback']}
	{controls}
>
	{#snippet children(values: any)}
		<div class="_c1">
			<Alert
				variant={values.variant}
				title={String(values.title || 'Workspace synced')}
				showIcon={Boolean(values.showIcon)}
				closable={Boolean(values.closable)}
			>
				{#snippet children()}
					<p>Changes are saved automatically. The alert keeps enough text to test wrapping.</p>
				{/snippet}
			</Alert>

			<div class="_c2">
				{#each examples as example}
					<Alert variant={example.variant} title={example.title} showIcon>
						{#snippet children()}<p>{example.text}</p>{/snippet}
					</Alert>
				{/each}
			</div>
		</div>
	{/snippet}
</Story>

<style>
	._c1 {
		display: grid;
		gap: 1.25rem;
		max-width: 42rem;
		padding: 1rem;
	}

	._c2 {
		display: grid;
		gap: 0.75rem;
	}
</style>
