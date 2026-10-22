<script lang="ts">
	// Render of index.story.ts: custom cell snippets and pill callbacks cannot cross postMessage.
	import DataTable from '$stylist/table/component/organism/data-table/index.svelte';
	import { createColumn } from '$stylist/table/function/create/column';
	import type { RecipeDataTable } from '$stylist/table/interface/recipe/data-table';
	import type { ColumnSchema } from '$stylist/table/type/object/column';

	type RowData = Record<string, unknown>;
	let props: RecipeDataTable<RowData> = $props();
	const statusPill = (value: unknown) =>
		value === 'active' ? 'success' : value === 'inactive' ? 'danger' : 'default';
	const featureSchema = [
		createColumn<RowData>('name', { cell: 'text', header: 'Name', sortable: true }),
		createColumn<RowData>('email', {
			cell: 'custom',
			header: 'Email',
			snippet: emailCell as unknown as ColumnSchema<RowData>['snippet']
		}),
		createColumn<RowData>('id', { cell: 'number', header: 'Seats', sortable: true, total: 15 }),
		createColumn<RowData>('status', {
			cell: 'pill',
			header: 'Status',
			sortable: true,
			pill: statusPill
		})
	];
</script>

<DataTable {...props} />
<h2>Optional features</h2>
<DataTable {...props} schema={featureSchema} maxHeight="10rem" />

{#snippet emailCell(row: RowData)}
	<a href={`mailto:${String(row.email)}`} onclick={(event) => event.stopPropagation()}>
		{String(row.email)}
	</a>
{/snippet}
