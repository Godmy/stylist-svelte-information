import Column from '$stylist/table/component/molecule/column/index.svelte';
import type { RecipeColumn } from '$stylist/table/interface/recipe/column';
import type { ContractStory } from '$stylist/html/interface/contract/story';

/** Table column header from ColumnSchema; index.story.svelte keeps the sort state of the row. */
export default {
	component: Column,
	title: 'Column',
	description: 'Table column header from ColumnSchema — handles sort state.',
	args: { schema: { key: 'name', header: 'Name', cell: 'text', sortable: true } }
} satisfies ContractStory<RecipeColumn>;
