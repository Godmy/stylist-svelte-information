<script lang="ts">
	// Render of index.story.ts: the header cells are controlled and share the sort state of the row.
	import CellHeader from '$stylist/table/component/atom/cell-header/index.svelte';
	import type { RecipeCellHeader } from '$stylist/table/interface/recipe/cell-header';
	import type { TokenSortDirection } from '$stylist/table/type/record/sort-direction';

	let args: RecipeCellHeader = $props();
	let sortKey = $state('name');
	let sortDir = $state<TokenSortDirection>('asc');

	function toggle(key: string) {
		sortDir = key === sortKey && sortDir === 'asc' ? 'desc' : 'asc';
		sortKey = key;
	}
</script>

<table>
	<thead>
		<tr>
			<CellHeader
				{...args}
				currentSortKey={sortKey}
				currentSortDirection={sortDir}
				onValueChange={toggle}
			/>
			<CellHeader
				title="Email"
				sortKey="email"
				currentSortKey={sortKey}
				currentSortDirection={sortDir}
				onValueChange={toggle}
			/>
			<CellHeader title="Role" />
		</tr>
	</thead>
</table>
