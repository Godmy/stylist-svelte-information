<script lang="ts">
	import Story from '$stylist/theme/component/molecule/story/index.svelte';
	import type { SlotStory } from '$stylist/theme/interface/slot/story';
	import SortableList from './index.svelte';

	const items = [
		{ id: '1', title: 'Backlog', description: 'Initial list item' },
		{ id: '2', title: 'In Progress', description: 'Work item' },
		{ id: '3', title: 'Done', description: 'Finished item' }
	];

	type Props = {
		showHandle: boolean;
		showActions: boolean;
		variant: 'minimal' | 'card' | 'compact';
	};
	const controls: SlotStory[] = [
		{ name: 'showHandle', type: 'boolean', defaultValue: true },
		{ name: 'showActions', type: 'boolean', defaultValue: true },
		{
			name: 'variant',
			type: 'select',
			options: ['minimal', 'card', 'compact'],
			defaultValue: 'card'
		}
	];
</script>

<Story
	id="organisms-sortable-list"
	title="SortableList"
	component={SortableList}
	category="Organisms/List"
	{controls}
>
	{#snippet children(values: any)}
		{@const typedProps = values as Props}
		<div class="sb-organisms-sortable-list _c1">
			<SortableList
				{items}
				showHandle={typedProps.showHandle}
				showActions={typedProps.showActions}
				variant={typedProps.variant}
			/>
		</div>
	{/snippet}
</Story>

<style>
	._c1 {
		padding: 1rem;
		min-width: 0;
		max-width: 42rem;
	}
</style>
