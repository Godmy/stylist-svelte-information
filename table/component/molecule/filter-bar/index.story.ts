import FilterBar from './index.svelte';
import type { RecipeFilterBar } from '$stylist/table/interface/recipe/filter-bar';
import type { ContractStory } from '$stylist/html/interface/contract/story';

/** Composed filter bar; index.story.svelte keeps the active pills the bar reports. */
export default {
	component: FilterBar,
	title: 'FilterBar',
	description: 'Composed filter bar: text search + pill group filters.',
	args: {
		searchValue: '',
		searchPlaceholder: 'Search...',
		pillGroups: [
			{
				columnKey: 'status',
				label: 'Status',
				options: ['Active', 'Inactive', 'Pending'],
				active: []
			}
		]
	},
	controls: { searchValue: { type: 'text' }, searchPlaceholder: { type: 'text' } }
} satisfies ContractStory<RecipeFilterBar>;
