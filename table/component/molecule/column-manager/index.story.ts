import ColumnManager from '$stylist/table/component/molecule/column-manager/index.svelte';
import type { RecipeColumnManager } from '$stylist/table/interface/recipe/column-manager';
import type { ContractStory } from '$stylist/html/interface/contract/story';

/** Column visibility control for table shells. */
export default {
	component: ColumnManager,
	title: 'ColumnManager',
	description: 'Column visibility control for table shells.',
	args: {
		title: 'Колонки',
		resetLabel: 'Сбросить',
		columns: [
			{ key: 'name', header: 'Name', visible: true, sortable: true },
			{ key: 'role', header: 'Role', visible: true, filterable: true },
			{ key: 'status', header: 'Status', visible: true, filterable: true },
			{ key: 'email', header: 'Email', visible: false, sortable: true }
		]
	}
} satisfies ContractStory<RecipeColumnManager>;
