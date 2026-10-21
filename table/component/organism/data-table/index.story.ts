import DataTable from './index.svelte';
import type { RecipeDataTable } from '$stylist/table/interface/recipe/data-table';
import type { ContractStory } from '$stylist/html/interface/contract/story';
import { createColumn } from '$stylist/table/function/create/column';

type RowData = Record<string, unknown>;

/** Data table with sortable columns built from a schema. */
export default {
	component: DataTable,
	title: 'DataTable',
	description:
		'A data table component for displaying tabular data with sorting and selection capabilities.',
	args: {
		rowNumbers: true,
		stickyHeader: true,
		emptyText: 'Nothing found for this period.',
		striped: true,
		hoverable: true,
		maxHeight: 'none',
		data: [
			{ id: 1, name: 'Alice Johnson', role: 'Admin', email: 'alice@example.com', status: 'active' },
			{ id: 2, name: 'Bob Smith', role: 'Manager', email: 'bob@example.com', status: 'active' },
			{ id: 3, name: 'Chris Brown', role: 'User', email: 'chris@example.com', status: 'inactive' },
			{ id: 4, name: 'Diana Lee', role: 'User', email: 'diana@example.com', status: 'active' },
			{ id: 5, name: 'Eve Wilson', role: 'Manager', email: 'eve@example.com', status: 'active' }
		],
		schema: [
			createColumn<RowData>('id', { cell: 'number', header: 'ID', sortable: true }),
			createColumn<RowData>('name', { cell: 'text', header: 'Name', sortable: true }),
			createColumn<RowData>('email', { cell: 'text', header: 'Email', sortable: true }),
			createColumn<RowData>('role', { cell: 'text', header: 'Role', sortable: true }),
			createColumn<RowData>('status', { cell: 'pill', header: 'Status', sortable: true })
		]
	},
	controls: {
		rowNumbers: { type: 'boolean' },
		stickyHeader: { type: 'boolean' },
		emptyText: { type: 'text' },
		striped: { type: 'boolean' },
		hoverable: { type: 'boolean' },
		maxHeight: { type: 'text' }
	},
	presets: { Empty: { data: [] } }
} satisfies ContractStory<RecipeDataTable<RowData>>;
