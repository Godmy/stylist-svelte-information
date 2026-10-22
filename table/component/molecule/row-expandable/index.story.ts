import RowExpandable from '$stylist/table/component/molecule/row-expandable/index.svelte';
import type { RecipeRowExpandable } from '$stylist/table/interface/recipe/row-expandable';
import type { ContractStory } from '$stylist/html/interface/contract/story';

/** Table row that expands to reveal detail content; the row and detail snippets live in index.story.svelte. */
export default {
	component: RowExpandable,
	title: 'RowExpandable',
	description: 'Table row that expands to reveal additional detail content.',
	args: { isExpanded: false },
	controls: { isExpanded: { type: 'boolean' } },
	presets: { Expanded: { isExpanded: true } }
} satisfies ContractStory<RecipeRowExpandable>;
