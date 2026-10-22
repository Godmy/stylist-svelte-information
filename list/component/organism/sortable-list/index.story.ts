import SortableList from '$stylist/list/component/organism/sortable-list/index.svelte';
import type { RecipeSortableList } from '$stylist/list/interface/recipe/sortable-list';
import type { ContractStory } from '$stylist/html/interface/contract/story';

/** Sortable list with drag handles and per-item actions. */
export default {
	component: SortableList,
	title: 'SortableList',
	description: 'Sortable list with drag handles, item actions and visual variants.',
	args: {
		items: [
			{ id: '1', title: 'Backlog', description: 'Initial list item' },
			{ id: '2', title: 'In Progress', description: 'Work item' },
			{ id: '3', title: 'Done', description: 'Finished item' }
		],
		showHandle: true,
		showActions: true,
		variant: 'card'
	},
	controls: {
		showHandle: { type: 'boolean' },
		showActions: { type: 'boolean' },
		// The recipe's own variant union; no shared token matches it.
		variant: { type: 'select', options: ['minimal', 'card', 'compact'] }
	},
	presets: { Compact: { variant: 'compact' }, Minimal: { variant: 'minimal', showActions: false } }
} satisfies ContractStory<RecipeSortableList>;
