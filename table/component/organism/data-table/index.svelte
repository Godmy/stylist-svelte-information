<script lang="ts">
	import type { RecipeDataTable } from '$stylist/table/interface/recipe/data-table';
	import { createDataTableState } from '$stylist/table/component/organism/data-table/state.svelte';
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
	class:c-data-table--sticky={state.stickyHeader}
	style={state.containerStyle || undefined}
	{...state.restProps}
>
	<Table striped={state.striped} hoverable={state.hoverable}>
		{#snippet content()}
			<thead>
				<tr>
					{#if state.rowNumbers}
						<th class="c-data-table__number" scope="col">№</th>
					{/if}
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
						<td
							class="c-data-table__empty"
							colspan={state.visibleSchema.length + (state.rowNumbers ? 1 : 0)}
						>
							{state.emptyText}
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
								{#if state.rowNumbers}
									<td class="c-data-table__number">{i + 1}</td>
								{/if}
								{#each state.visibleSchema as col}
									{#if col.cell === 'custom' && col.snippet}
										<td class="c-data-table__custom">{@render col.snippet(row)}</td>
									{:else if col.cell === 'icon'}
										<CellIcon
											icon={String(ObjectManagerTableControls.getCellValue(row, col) ?? '')}
										/>
									{:else if col.cell === 'pill'}
										<CellPill
											value={String(ObjectManagerTableControls.getCellValue(row, col) ?? '')}
											variant={col.pill?.(row[col.key], row)}
										/>
									{:else}
										<CellText
											value={ObjectManagerTableControls.getCellValue(row, col) as
												string | number | null}
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

	.c-data-table__number,
	.c-data-table__custom {
		padding: 0.3rem 0.75rem;
		border-bottom: 1px solid var(--color-border-primary);
		font-size: 13px;
	}

	.c-data-table__number {
		width: 1%;
		text-align: right;
		white-space: nowrap;
		color: var(--color-text-secondary);
		font-variant-numeric: tabular-nums;
	}

	th.c-data-table__number {
		font-size: 11px;
		font-weight: 600;
		background: var(--color-background-secondary);
	}

	.c-data-table--sticky :global(thead th) {
		position: sticky;
		top: 0;
		z-index: 1;
	}

	.c-data-table__empty {
		padding: 2rem;
		text-align: center;
		color: var(--color-text-secondary);
		font-size: 13px;
	}
</style>
