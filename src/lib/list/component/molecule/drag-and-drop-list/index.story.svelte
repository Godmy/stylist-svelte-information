<script lang="ts">
	import Story from '$stylist/theme/component/molecule/story/index.svelte';
	import DragAndDropList from './index.svelte';
	import type { TokenControllerType } from '$stylist/domain/type/alias/controller-type';

	type DragItem = {
		id: string;
		title: string;
		content?: string;
	};

	const initialItems: DragItem[] = [
		{ id: '1', title: 'Define north star', content: 'Set success metrics for the next launch.' },
		{ id: '2', title: 'Sync with design', content: 'SlotReview motion specs for onboarding.' },
		{ id: '3', title: 'QA checkout', content: 'Verify discount flows on mobile.' },
		{ id: '4', title: 'Plan rollout', content: 'Confirm phased release with GTM.' }
	];

	const controls = [
		{
			name: 'variant',
			type: 'select' as TokenControllerType,
			defaultValue: 'card',
			options: ['card', 'minimal'],
			description: 'Visual variant of the list items'
		},
		{
			name: 'disabled',
			type: 'boolean' as TokenControllerType,
			defaultValue: false,
			description: 'Whether drag and drop is disabled'
		}
	];

	let items = $state<DragItem[]>([...initialItems]);

	function handleItemsChange(updated: DragItem[]) {
		items = updated;
	}
</script>

<Story
	{controls}
	title="DragAndDropList Component"
	category="Molecules/List"
	description="Reorderable list component for backlog grooming, playlists, or priority queues"
>
	{#snippet children(controlValues: any)}
		<div class="_c1">
			<DragAndDropList
				{items}
				variant={controlValues.variant}
				disabled={controlValues.disabled}
				onItemsChange={handleItemsChange}
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
