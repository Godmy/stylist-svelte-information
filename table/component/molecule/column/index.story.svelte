<script lang="ts">
	// Render of index.story.ts: the column headers are controlled and share the sort state of the row.
	import Column from '$stylist/table/component/molecule/column/index.svelte';
	import type { RecipeColumn } from '$stylist/table/interface/recipe/column';
	import type { TokenSortDirection } from '$stylist/table/type/record/sort-direction';

	let args: RecipeColumn = $props();
	let sortKey = $state('name');
	let sortDir = $state<TokenSortDirection>('asc');
</script>

<table>
	<thead>
		<tr>
			<Column
				{...args}
				currentSortKey={sortKey}
				currentSortDirection={sortDir}
				onSort={(key) => {
					sortDir = key === sortKey && sortDir === 'asc' ? 'desc' : 'asc';
					sortKey = key;
				}}
			/>
			<Column schema={{ key: 'role', header: 'Role', cell: 'pill', filterable: 'pills' }} />
			<Column schema={{ key: 'avatar', header: '', cell: 'icon', width: 40 }} />
		</tr>
	</thead>
</table>
