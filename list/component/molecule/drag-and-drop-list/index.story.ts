import DragAndDropList from './index.svelte';
import type { RecipeDragAndDropList } from '$stylist/list/interface/recipe/drag-and-drop-list';
import type { ContractStory } from '$stylist/html/interface/contract/story';

/** Reorderable list; the render keeps the reordered items. */
export default {
	component: DragAndDropList,
	title: 'DragAndDropList',
	description: 'Reorderable list component for backlog grooming, playlists, or priority queues.',
	args: {
		items: [
			{ id: '1', title: 'Define north star', content: 'Set success metrics for the next launch.' },
			{ id: '2', title: 'Sync with design', content: 'Review motion specs for onboarding.' },
			{ id: '3', title: 'QA checkout', content: 'Verify discount flows on mobile.' },
			{ id: '4', title: 'Plan rollout', content: 'Confirm phased release with GTM.' }
		],
		variant: 'card',
		disabled: false
	},
	controls: {
		// The recipe's own variant union; no shared token matches it.
		variant: { type: 'select', options: ['card', 'minimal'] },
		disabled: { type: 'boolean', description: 'Whether drag and drop is disabled' }
	},
	presets: { Minimal: { variant: 'minimal' }, Disabled: { disabled: true } }
} satisfies ContractStory<RecipeDragAndDropList>;
