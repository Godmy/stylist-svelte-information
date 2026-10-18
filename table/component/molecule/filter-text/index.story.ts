import FilterText from './index.svelte';
import type { RecipeFilterText } from '$stylist/table/interface/recipe/filter-text';
import type { ContractStory } from '$stylist/html/interface/contract/story';

/** Text search input for table filtering. */
export default {
	component: FilterText,
	title: 'FilterText',
	description: 'Text search input for table filtering.',
	args: { placeholder: 'Search users...', value: '' },
	controls: { placeholder: { type: 'text' }, value: { type: 'text' } }
} satisfies ContractStory<RecipeFilterText>;
