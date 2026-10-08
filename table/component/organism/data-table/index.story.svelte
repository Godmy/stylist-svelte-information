<script lang="ts">
	import Story from '$stylist/theme/component/molecule/story/index.svelte';
	import type { SlotStory } from '$stylist/theme/interface/slot/story';
	import { createColumn } from '$stylist/table/function/create/column';
	import DataTable from './index.svelte';

	type RowData = Record<string, unknown>;

	type Props = {
		striped: boolean;
		hoverable: boolean;
		compact: boolean;
		showHeader: boolean;
		sortable: boolean;
	};

	const controls: SlotStory[] = [
		{ name: 'striped', type: 'boolean', defaultValue: true },
		{ name: 'hoverable', type: 'boolean', defaultValue: true },
		{ name: 'compact', type: 'boolean', defaultValue: false },
		{ name: 'showHeader', type: 'boolean', defaultValue: true },
		{ name: 'sortable', type: 'boolean', defaultValue: true }
	];

	const data: RowData[] = [
		{ id: 1, name: 'Alice Johnson', role: 'Admin', email: 'alice@example.com', status: 'active' },
		{ id: 2, name: 'Bob Smith', role: 'Manager', email: 'bob@example.com', status: 'active' },
		{ id: 3, name: 'Chris Brown', role: 'User', email: 'chris@example.com', status: 'inactive' },
		{ id: 4, name: 'Diana Lee', role: 'User', email: 'diana@example.com', status: 'active' },
		{ id: 5, name: 'Eve Wilson', role: 'Manager', email: 'eve@example.com', status: 'active' }
	];

	const schema = [
		createColumn<RowData>('id', { cell: 'number', header: 'ID', sortable: true }),
		createColumn<RowData>('name', { cell: 'text', header: 'Name', sortable: true }),
		createColumn<RowData>('email', { cell: 'text', header: 'Email', sortable: true }),
		createColumn<RowData>('role', { cell: 'text', header: 'Role', sortable: true }),
		createColumn<RowData>('status', { cell: 'pill', header: 'Status', sortable: true })
	];

	function handleSort(column: string) {
		console.log('Sorting by:', column);
	}

	function handleRowClick(row: any) {
		console.log('Row clicked:', row);
	}
</script>

<Story
	id="organisms-data-table"
	title="Organisms / Interaction / Controls / Tables / Data Table"
	component={DataTable}
	category="Organisms/Interaction/Controls/Tables"
	description="A data table component for displaying tabular data with sorting and selection capabilities."
	tags={['table', 'data', 'grid']}
	{controls}
>
	{#snippet children(values: any)}
		<div class="sb-organisms-data-table _c1">
			<h1 class="_c2">DataTable Component</h1>

			<div class="_c3">
				<h2 class="_c4">Interactive DataTable</h2>
				<div class="_c5">
					<DataTable {data} {schema} onRowClick={handleRowClick} />
				</div>

				<div class="_c6">
					<div class="_c7">
						<label for="striped" class="_c8">
							<input id="striped" type="checkbox" bind:checked={values.striped} />
							Striped
						</label>
					</div>

					<div class="_c7">
						<label for="hoverable" class="_c8">
							<input id="hoverable" type="checkbox" bind:checked={values.hoverable} />
							Hoverable
						</label>
					</div>

					<div class="_c7">
						<label for="compact" class="_c8">
							<input id="compact" type="checkbox" bind:checked={values.compact} />
							Compact
						</label>
					</div>

					<div class="_c7">
						<label for="show-header" class="_c8">
							<input id="show-header" type="checkbox" bind:checked={values.showHeader} />
							Show Header
						</label>
					</div>

					<div class="_c7">
						<label for="sortable" class="_c8">
							<input id="sortable" type="checkbox" bind:checked={values.sortable} />
							Sortable
						</label>
					</div>
				</div>
			</div>
		</div>
	{/snippet}
</Story>

<style>
	._c1 {
		padding: 1rem;
	}
	._c2 {
		margin-bottom: 1rem;
		font-size: 1.125rem;
		line-height: 1.75rem;
		font-weight: 600;
	}
	._c3 {
		margin-bottom: 1.5rem;
		border-radius: 0.25rem;
		border-width: 1px;
		border-style: solid;
		padding: 1rem;
	}
	._c4 {
		font-size: 1rem;
		line-height: 1.5rem;
		margin-bottom: 0.5rem;
		font-weight: 600;
	}
	._c5 {
		max-width: 56rem;
	}
	._c6 {
		margin-top: 1rem;
		display: flex;
		flex-wrap: wrap;
		gap: 1rem;
	}
	._c7 {
		display: flex;
		align-items: flex-end;
	}
	._c8 {
		display: flex;
		align-items: center;
		gap: 0.25rem;
	}
</style>
