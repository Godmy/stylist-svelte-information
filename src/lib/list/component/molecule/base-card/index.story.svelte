<script lang="ts">
	import Story from '$stylist/theme/component/molecule/story/index.svelte';
	import type { SlotStory } from '$stylist/theme/interface/slot/story';
	import BaseCard from './index.svelte';

	const controls: SlotStory[] = [
		{ name: 'title', type: 'text', defaultValue: 'Workspace Summary' },
		{
			name: 'description',
			type: 'text',
			defaultValue: 'All systems operational for the current release.'
		},
		{
			name: 'variant',
			type: 'select',
			options: [
				'default',
				'primary',
				'secondary',
				'success',
				'warning',
				'danger',
				'error',
				'elevated'
			],
			defaultValue: 'default'
		},
		{
			name: 'size',
			type: 'select',
			options: ['xs', 'sm', 'md', 'lg', 'xl', '2xl'],
			defaultValue: 'md'
		},
		{ name: 'disabled', type: 'boolean', defaultValue: false }
	];
</script>

<Story
	component={BaseCard}
	title="BaseCard"
	description="Generic information card with header and body slots."
	{controls}
>
	{#snippet children(values: any)}
		<BaseCard
			title={values.title}
			description={values.description}
			variant={values.variant}
			size={values.size}
			disabled={values.disabled}
		>
			{#snippet children()}
				<div class="_c1">Body content can contain any custom UI.</div>
			{/snippet}
			{#snippet footer()}
				<div class="_c2">Last updated 2 minutes ago</div>
			{/snippet}
		</BaseCard>
	{/snippet}
</Story>

<style>
	._c1 {
		font-size: 0.875rem;
		line-height: 1.25rem;
		color: var(--color-text-secondary);
	}
	._c2 {
		font-size: 0.75rem;
		color: var(--color-text-tertiary);
	}
</style>
