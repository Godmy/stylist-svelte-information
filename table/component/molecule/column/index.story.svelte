<script lang="ts">
	import Story from '$stylist/theme/component/molecule/story/index.svelte';
	import Column from './index.svelte';

	let sortKey = $state('name');
	let sortDir = $state<'asc' | 'desc' | 'none'>('asc');
</script>

<Story
	component={Column}
	title="Column"
	description="Table column header from ColumnSchema — handles sort state."
>
	{#snippet children()}
		<table>
			<thead
				><tr>
					<Column
						schema={{ key: 'name', header: 'Name', cell: 'text', sortable: true }}
						currentSortKey={sortKey}
						currentSortDirection={sortDir}
						onSort={(k) => {
							sortKey = k;
							sortDir = sortDir === 'asc' ? 'desc' : 'asc';
						}}
					/>
					<Column schema={{ key: 'role', header: 'Role', cell: 'pill', filterable: 'pills' }} />
					<Column schema={{ key: 'avatar', header: '', cell: 'icon', width: 40 }} />
				</tr></thead
			>
		</table>
	{/snippet}
</Story>
