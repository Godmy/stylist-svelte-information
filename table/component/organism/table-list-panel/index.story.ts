import TableListPanel from './index.svelte';
import type { RecipeTableListPanel } from '$stylist/table/interface/recipe/table-list-panel';
import type { ContractStory } from '$stylist/html/interface/contract/story';

/** Searchable list of database tables; index.story.svelte keeps the selection onSelect reports. */
export default {
	component: TableListPanel,
	title: 'TableListPanel',
	description: 'Searchable list of database tables with row counts and soft-delete badges.',
	args: {
		selectedName: 'users',
		items: [
			{ name: 'users', rowCount: 1284, hasSoftDelete: true },
			{ name: 'orders', rowCount: 5321, hasSoftDelete: true },
			{ name: 'products', rowCount: 342, hasSoftDelete: false },
			{ name: 'categories', rowCount: 18, hasSoftDelete: false },
			{ name: 'audit_log', rowCount: 98210, hasSoftDelete: false }
		]
	},
	presets: { 'No selection': { selectedName: null }, Empty: { items: [] } }
} satisfies ContractStory<RecipeTableListPanel>;
