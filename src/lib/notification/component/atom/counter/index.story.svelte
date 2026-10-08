<script lang="ts">
	import Story from '$stylist/theme/component/molecule/story/index.svelte';
	import type { SlotStory } from '$stylist/theme/interface/slot/story';
	import Counter from './index.svelte';

	const controls: SlotStory[] = [
		{
			name: 'count',
			type: 'select',
			options: ['0', '1', '5', '10', '15', '25', '50', '99', '100', '150'],
			defaultValue: '5'
		},
		{ name: 'max', type: 'select', options: ['10', '50', '99', '100', '200'], defaultValue: '99' },
		{
			name: 'variant',
			type: 'select',
			options: ['primary', 'secondary', 'danger', 'success', 'warning', 'info'],
			defaultValue: 'primary'
		},
		{ name: 'size', type: 'select', options: ['sm', 'md', 'lg'], defaultValue: 'md' }
	];
</script>

<Story
	id="atoms-counter"
	title="Counter"
	component={Counter}
	category="Atoms/Information/Indicators"
	description="A small badge to display numerical counts, often used for notifications."
	{controls}
>
	{#snippet children(values: any)}
		{@const count = Number(values.count)}
		{@const max = Number(values.max)}
		<div class="_c1">
			<Counter
				count={Number.isNaN(count) ? 5 : count}
				max={Number.isNaN(max) ? 99 : max}
				variant={values.variant}
				size={values.size}
			/>
			<span class="_c2">Notifications</span>
		</div>
	{/snippet}
</Story>

<style>
	._c1 {
		margin-top: 0.5rem;
		display: flex;
		align-items: center;
	}
	._c1 > * + * {
		margin-left: 1rem;
	}
	._c2 {
		color: var(--color-text-primary);
	}
</style>
