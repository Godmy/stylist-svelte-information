<script lang="ts">
	import Story from '$stylist/theme/component/molecule/story/index.svelte';
	import type { SlotStory } from '$stylist/theme/interface/slot/story';
	import ErrorMessage from './index.svelte';

	let retryCount = $state(0);

	const controls: SlotStory[] = [
		{ name: 'text', type: 'text', defaultValue: 'Could not load invoices' },
		{
			name: 'errorType',
			type: 'select',
			defaultValue: 'string',
			options: ['string', 'error', 'none']
		},
		{ name: 'showRetry', type: 'boolean', defaultValue: true }
	];
</script>

<Story
	id="atoms-error-message"
	component={ErrorMessage}
	title="ErrorMessage"
	category="Atoms"
	description="Focused error feedback block with optional retry action."
	tags={['notification', 'error', 'feedback']}
	{controls}
>
	{#snippet children(values: any)}
		<div class="_c1">
			<ErrorMessage
				text={String(values.text || 'Could not load invoices')}
				error={values.errorType === 'none'
					? null
					: values.errorType === 'error'
						? new Error('The server returned a malformed response.')
						: 'The request timed out after 30 seconds.'}
				showRetry={Boolean(values.showRetry)}
				onRetry={() => (retryCount += 1)}
			/>
			<div class="_c2">
				<span>Retry attempts</span>
				<strong>{retryCount}</strong>
			</div>
		</div>
	{/snippet}
</Story>

<style>
	._c1 {
		display: grid;
		gap: 0.875rem;
		max-width: 34rem;
		padding: 1rem;
	}

	._c2 {
		display: inline-flex;
		align-items: center;
		gap: 0.5rem;
		width: fit-content;
		border: 1px solid var(--color-border-primary);
		border-radius: 0.375rem;
		background: var(--color-background-primary);
		color: var(--color-text-secondary);
		font-size: 0.8125rem;
		padding: 0.375rem 0.625rem;
	}
</style>
