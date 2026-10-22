import DataTableShell from '$stylist/table/component/organism/data-table-shell/index.svelte';
import type { RecipeDataTableShell } from '$stylist/table/interface/recipe/data-table-shell';
import type { ContractStory } from '$stylist/html/interface/contract/story';
import { createColumn } from '$stylist/table/function/create/column';

type RowData = Record<string, unknown>;

const names = ['Alice', 'Bob', 'Charlie', 'Diana', 'Eve'];
const roles = ['Admin', 'Editor', 'Viewer'];

/** Full table shell: search, pill filters, column manager, sorting, pagination. */
export default {
	component: DataTableShell,
	title: 'DataTableShell',
	description: 'Full table shell: search, pill filters, column manager, sorting, pagination.',
	args: {
		title: 'Users',
		showSearch: true,
		showColumnManager: true,
		loading: false,
		defaultPageSize: 10,
		schema: [
			createColumn<RowData>('name', { cell: 'text', header: 'Name', sortable: true }),
			createColumn<RowData>('role', { cell: 'pill', header: 'Role', filterable: 'pills' }),
			createColumn<RowData>('status', { cell: 'pill', header: 'Status', filterable: 'pills' }),
			createColumn<RowData>('email', { cell: 'text', header: 'Email', sortable: true })
		],
		data: Array.from({ length: 30 }, (_, i) => ({
			name: names[i % names.length],
			role: roles[i % roles.length],
			status: i % 4 === 0 ? 'Inactive' : 'Active',
			email: `user${i}@example.com`
		}))
	},
	controls: {
		title: { type: 'text' },
		showSearch: { type: 'boolean' },
		showColumnManager: { type: 'boolean' },
		loading: { type: 'boolean' },
		defaultPageSize: { type: 'select', options: [5, 10, 25] }
	},
	presets: { Loading: { loading: true } }
} satisfies ContractStory<RecipeDataTableShell<RowData>>;
