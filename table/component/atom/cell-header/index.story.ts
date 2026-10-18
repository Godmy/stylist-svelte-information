import CellHeader from './index.svelte';
import type { RecipeCellHeader } from '$stylist/table/interface/recipe/cell-header';
import type { ContractStory } from '$stylist/html/interface/contract/story';

/** Sortable table header cell; index.story.svelte keeps the sort state of the header row. */
export default {
	component: CellHeader,
	title: 'CellHeader',
	description: 'Sortable table header cell with sort-direction icon.',
	args: { title: 'Name', sortKey: 'name' },
	controls: {
		title: { type: 'text' },
		sortKey: { type: 'text' }
	}
} satisfies ContractStory<RecipeCellHeader>;
