import TableListPanel from '$stylist/table/component/organism/table-list-panel/index.svelte';
import type { RecipeTableListPanel } from '$stylist/table/interface/recipe/table-list-panel';
import type { ContractStory } from '$stylist/html/interface/contract/story';

/** Searchable list of database tables; index.story.svelte keeps the selection onSelect reports. */
export default {
	component: TableListPanel,
	title: 'TableListPanel',
	description:
		'Searchable database tables, optional non-interactive group headings and optional metadata.',
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
	presets: {
		Grouped: {
			groups: {
				users: 'Identity',
				orders: 'Commerce',
				products: 'Commerce',
				categories: 'Commerce',
				audit_log: 'Operations'
			},
			showMetadata: false
		},
		'No selection': { selectedName: null },
		Empty: { items: [] }
	}
} satisfies ContractStory<RecipeTableListPanel>;
