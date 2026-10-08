<script lang="ts">
	import type { RecipeDataTable } from '$stylist/table/interface/recipe/data-table';
	import { createDataTableState } from './state.svelte';
	import Table from '$stylist/table/component/atom/table/index.svelte';
	import Row from '$stylist/table/component/atom/row/index.svelte';
	import Column from '$stylist/table/component/molecule/column/index.svelte';
	import CellText from '$stylist/table/component/atom/cell-text/index.svelte';
	import CellIcon from '$stylist/table/component/atom/cell-icon/index.svelte';
	import CellPill from '$stylist/table/component/atom/cell-pill/index.svelte';
	import { ObjectManagerTableControls } from '$stylist/table/class/manager/table-controls';

	type RowData = Record<string, unknown>;

	let props: RecipeDataTable<RowData> = $props();

	const state = createDataTableState(() => props);
</script>

<div
	class="c-data-table {state.className}"
	style={state.containerStyle || undefined}
	{...state.restProps}
>
	<Table striped={state.striped} hoverable={state.hoverable}>
		{#snippet content()}
			<thead>
				<tr>
					{#each state.visibleSchema as col}
						<Column
							schema={col}
							currentSortKey={state.sortKey ?? undefined}
							currentSortDirection={state.sortDirection}
							onSort={state.sort}
						/>
					{/each}
				</tr>
			</thead>
			<tbody>
				{#if state.sortedData.length === 0}
					<tr>
						<td class="c-data-table__empty" colspan={state.visibleSchema.length}>
							No data to display.
						</td>
					</tr>
				{:else}
					{#each state.sortedData as row, i}
						<Row
							striped={state.striped && i % 2 === 1}
							hoverable={state.hoverable}
							onclick={() => state.onRowClick?.(row)}
						>
							{#snippet content()}
								{#each state.visibleSchema as col}
									{#if col.cell === 'icon'}
										<CellIcon
											icon={String(ObjectManagerTableControls.getCellValue(row, col) ?? '')}
										/>
									{:else if col.cell === 'pill'}
										<CellPill
											value={String(ObjectManagerTableControls.getCellValue(row, col) ?? '')}
										/>
									{:else}
										<CellText
											value={ObjectManagerTableControls.getCellValue(row, col) as
												| string
												| number
												| null}
											align={col.cell === 'number' ? 'right' : 'left'}
										/>
									{/if}
								{/each}
							{/snippet}
						</Row>
					{/each}
				{/if}
			</tbody>
		{/snippet}
	</Table>
</div>

<style>
	.c-data-table {
		overflow: auto;
		border: 1px solid var(--color-border-primary);
		border-radius: 0.375rem;
	}

	.c-data-table__empty {
		padding: 2rem;
		text-align: center;
		color: var(--color-text-secondary);
		font-size: 13px;
	}
</style>
