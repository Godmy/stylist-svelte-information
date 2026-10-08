<script lang="ts">
	import Story from '$stylist/theme/component/molecule/story/index.svelte';
	import type { SlotStory } from '$stylist/theme/interface/slot/story';
	import Card from './index.svelte';

	const controls: SlotStory[] = [
		{
			name: 'shape',
			type: 'select',
			defaultValue: 'rounded',
			options: ['rectangular', 'rounded', 'pill']
		},
		{ name: 'size', type: 'select', defaultValue: 'md', options: ['xs', 'sm', 'md', 'lg', 'xl'] },
		{
			name: 'elevation',
			type: 'select',
			defaultValue: '1',
			options: ['0', '1', '2', '3', '4', '5', '6']
		},
		{ name: 'clickable', type: 'boolean', defaultValue: false },
		{ name: 'fullWidth', type: 'boolean', defaultValue: false }
	];
</script>

<Story
	component={Card}
	title="Card"
	description="Flexible card container with optional media, header, and footer slots."
	{controls}
>
	{#snippet children(values: any)}
		<Card
			shape={values.shape}
			size={values.size}
			elevation={Number(values.elevation)}
			clickable={values.clickable}
			fullWidth={values.fullWidth}
		>
			{#snippet children()}
				<p class="_c1">Card body content goes here.</p>
			{/snippet}
			{#snippet header()}
				<div class="_c2">
					<h3 class="_c3">Card Title</h3>
					<p class="_c4">Subtitle or description</p>
				</div>
			{/snippet}
			{#snippet footer()}
				<div class="_c5">
					<span class="_c6">Action area</span>
				</div>
			{/snippet}
		</Card>
	{/snippet}
</Story>

<style>
	._c1 {
		font-size: 0.875rem;
		line-height: 1.25rem;
		color: var(--color-text-secondary);
	}
	._c2 {
		margin-bottom: 0.75rem;
	}
	._c3 {
		font-weight: 600;
		color: var(--color-text-primary);
	}
	._c4 {
		font-size: 0.75rem;
		line-height: 1rem;
		color: var(--color-text-tertiary);
	}
	._c5 {
		display: flex;
		justify-content: flex-end;
		gap: 0.5rem;
	}
	._c6 {
		font-size: 0.75rem;
		line-height: 1rem;
		color: var(--color-text-secondary);
	}
</style>
