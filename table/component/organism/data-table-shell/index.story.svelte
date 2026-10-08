<script lang="ts">
	import Story from '$stylist/theme/component/molecule/story/index.svelte';
	import type { SlotStory } from '$stylist/theme/interface/slot/story';
	import DataTableShell from './index.svelte';
	import { createColumn } from '$stylist/table/function/create/column';

	type RowData = Record<string, unknown>;

	const controls: SlotStory[] = [
		{ name: 'showSearch', type: 'boolean', defaultValue: true },
		{ name: 'showColumnManager', type: 'boolean', defaultValue: true },
		{ name: 'loading', type: 'boolean', defaultValue: false },
		{ name: 'defaultPageSize', type: 'select', options: [5, 10, 25], defaultValue: 10 }
	];

	const schema = [
		createColumn<RowData>('name', { cell: 'text', header: 'Name', sortable: true }),
		createColumn<RowData>('role', { cell: 'pill', header: 'Role', filterable: 'pills' }),
		createColumn<RowData>('status', { cell: 'pill', header: 'Status', filterable: 'pills' }),
		createColumn<RowData>('email', { cell: 'text', header: 'Email', sortable: true })
	];

	const names = ['Alice', 'Bob', 'Charlie', 'Diana', 'Eve'];
	const roles = ['Admin', 'Editor', 'Viewer'];
	const data: RowData[] = Array.from({ length: 30 }, (_, i) => ({
		name: names[i % names.length],
		role: roles[i % roles.length],
		status: i % 4 === 0 ? 'Inactive' : 'Active',
		email: `user${i}@example.com`
	}));
</script>

<Story
	component={DataTableShell}
	title="DataTableShell"
	description="Full table shell: search, pill filters, column manager, sorting, pagination."
	{controls}
>
	{#snippet children(values: any)}
		<DataTableShell
			{data}
			{schema}
			title="Users"
			showSearch={values.showSearch}
			showColumnManager={values.showColumnManager}
			defaultPageSize={values.defaultPageSize}
			loading={values.loading}
		/>
	{/snippet}
</Story>
