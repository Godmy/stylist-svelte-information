<script lang="ts">
	import type { RecipeDataTableShell } from '$stylist/table/interface/recipe/data-table-shell';
	import { createDataTableShellState } from './state.svelte';
	import FilterBar from '$stylist/table/component/molecule/filter-bar/index.svelte';
	import ColumnManager from '$stylist/table/component/molecule/column-manager/index.svelte';
	import DataTable from '$stylist/table/component/organism/data-table/index.svelte';
	import Icon from '$stylist/svg/component/atom/icon/index.svelte';
	import { TABLE_DATA_TABLE_SHELL_MESSAGE } from '$stylist/table/const/record/data-table-shell-message';
	import { useMessage } from '$stylist/localization/function/hook/use-message';

	type RowData = Record<string, unknown>;

	let {
		data = [],
		schema = [],
		title,
		searchPlaceholder,
		showSearch = true,
		showColumnManager = false,
		pageSizeOptions = [10, 25, 50],
		defaultPageSize = 10,
		loading = false,
		onExport,
		onRowClick,
		columnManagerToggle = false,
		storageKey,
		columnsStorageKey,
		fill = false,
		class: className = '',
		...restProps
	}: RecipeDataTableShell<RowData> = $props();

	const state = createDataTableShellState({
		get data() {
			return data;
		},
		get schema() {
			return schema;
		},
		get title() {
			return title;
		},
		get searchPlaceholder() {
			return searchPlaceholder;
		},
		get showSearch() {
			return showSearch;
		},
		get showColumnManager() {
			return showColumnManager;
		},
		get pageSizeOptions() {
			return pageSizeOptions;
		},
		get defaultPageSize() {
			return defaultPageSize;
		},
		get loading() {
			return loading;
		},
		get onExport() {
			return onExport;
		},
		get onRowClick() {
			return onRowClick;
		},
		get storageKey() {
			return storageKey;
		},
		get columnsStorageKey() {
			return columnsStorageKey;
		},
		get class() {
			return className;
		}
	});

	const t = useMessage('data-table-shell', TABLE_DATA_TABLE_SHELL_MESSAGE);
	const uid = $props.id();
	const toggleable = $derived(showColumnManager && columnManagerToggle);
	const managerVisible = $derived(showColumnManager && (!columnManagerToggle || state.columnsOpen));

	const columnManagerColumns = $derived(
		schema.map((col) => ({
			key: String(col.key),
			header: col.header,
			visible: state.columnVisibility[String(col.key)] !== false
		}))
	);
</script>

<div class="c-data-table-shell {className}" class:c-data-table-shell--fill={fill} {...restProps}>
	{#if title || onExport || toggleable}
		<div class="c-data-table-shell__header">
			{#if title}<h3 class="c-data-table-shell__title">{title}</h3>{/if}
			<div class="c-data-table-shell__controls">
				{#if toggleable}
					<button
						type="button"
						class="c-data-table-shell__btn c-data-table-shell__toggle"
						aria-pressed={state.columnsOpen}
						aria-controls="{uid}-columns"
						title={state.columnsOpen ? t('hideColumns') : t('showColumns')}
						onclick={state.toggleColumns}
					>
						<Icon name="columns" size="sm" />{t('columns')}
					</button>
				{/if}
				{#if onExport}
					<button type="button" class="c-data-table-shell__btn" onclick={onExport}
						>{t('export')}</button
					>
				{/if}
				<select
					class="c-data-table-shell__select"
					aria-label={t('pageSize')}
					value={state.pageSize}
					onchange={(e) => state.setPageSize(Number((e.target as HTMLSelectElement).value))}
				>
					{#each pageSizeOptions as size}
						<option value={size}>{t('perPage', { size })}</option>
					{/each}
				</select>
			</div>
		</div>
	{/if}

	<div class="c-data-table-shell__body">
		{#if managerVisible}
			<aside class="c-data-table-shell__aside" id="{uid}-columns">
				<ColumnManager
					columns={columnManagerColumns}
					onColumnsChange={(cols) => {
						state.setColumnVisibility(
							Object.fromEntries(cols.map((column) => [column.key, column.visible]))
						);
					}}
				/>
			</aside>
		{/if}

		<div class="c-data-table-shell__main">
			{#if showSearch}
				<FilterBar
					searchValue={state.searchTerm}
					{searchPlaceholder}
					pillGroups={Object.entries(state.pillOptions).map(([key, options]) => ({
						columnKey: key,
						label: schema.find((c) => String(c.key) === key)?.header ?? key,
						options,
						active: state.pillFilters[key] ?? []
					}))}
					onSearch={state.setSearch}
					onTogglePill={state.togglePill}
				/>
			{/if}

			{#if loading}
				<div class="c-data-table-shell__loading">{t('loading')}</div>
			{:else}
				<DataTable
					data={state.pageData}
					schema={state.visibleSchema}
					{onRowClick}
					stickyHeader={fill}
					class={fill ? 'c-data-table-shell__table' : ''}
				/>

				{#if state.totalPages > 1}
					<div class="c-data-table-shell__pagination">
						<button
							type="button"
							class="c-data-table-shell__btn"
							onclick={state.goPrev}
							disabled={state.currentPage <= 1}>{t('previous')}</button
						>
						<span class="c-data-table-shell__page-info">
							{state.currentPage} / {state.totalPages}
						</span>
						<button
							type="button"
							class="c-data-table-shell__btn"
							onclick={state.goNext}
							disabled={state.currentPage >= state.totalPages}>{t('next')}</button
						>
					</div>
				{/if}
			{/if}
		</div>
	</div>
</div>

<style>
	.c-data-table-shell {
		display: grid;
		border: 1px solid var(--color-border-primary);
		border-radius: 0.5rem;
		overflow: hidden;
		background: var(--color-background-primary);
	}

	.c-data-table-shell__header {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 0.65rem 0.9rem;
		border-bottom: 1px solid var(--color-border-primary);
	}

	.c-data-table-shell__title {
		margin: 0;
		font-size: 14px;
		font-weight: 600;
	}

	.c-data-table-shell__controls {
		display: flex;
		gap: 0.5rem;
		align-items: center;
	}

	.c-data-table-shell__btn {
		padding: 0.2rem 0.65rem;
		border: 1px solid var(--color-border-primary);
		border-radius: 6px;
		background: var(--color-background-primary);
		font-size: 12px;
		cursor: pointer;
		color: var(--color-text-primary);
	}

	.c-data-table-shell__toggle {
		display: inline-flex;
		align-items: center;
		gap: 0.35rem;
	}

	.c-data-table-shell__toggle[aria-pressed='true'] {
		border-color: var(--color-primary-600);
		color: var(--color-primary-600);
	}

	/* Fill mode: the shell takes the parent height and only the table scrolls. */
	.c-data-table-shell--fill {
		display: flex;
		flex-direction: column;
		min-height: 0;
	}

	.c-data-table-shell--fill .c-data-table-shell__body {
		flex: 1;
		min-height: 0;
	}

	.c-data-table-shell--fill .c-data-table-shell__aside {
		overflow: auto;
	}

	.c-data-table-shell--fill .c-data-table-shell__main {
		display: flex;
		flex-direction: column;
		min-height: 0;
	}

	.c-data-table-shell--fill :global(.c-data-table-shell__table) {
		flex: 0 1 auto;
		min-height: 0;
		border: 0;
		border-radius: 0;
	}

	.c-data-table-shell__btn:disabled {
		opacity: 0.4;
		cursor: default;
	}

	.c-data-table-shell__select {
		padding: 0.2rem 0.5rem;
		border: 1px solid var(--color-border-primary);
		border-radius: 6px;
		font-size: 12px;
		background: var(--color-background-primary);
		color: var(--color-text-primary);
	}

	.c-data-table-shell__body {
		display: flex;
	}

	.c-data-table-shell__aside {
		border-right: 1px solid var(--color-border-primary);
		min-width: 160px;
	}

	.c-data-table-shell__main {
		flex: 1;
		min-width: 0;
		display: grid;
		grid-template-rows: auto 1fr auto;
	}

	.c-data-table-shell__loading {
		padding: 2rem;
		text-align: center;
		color: var(--color-text-secondary);
		font-size: 13px;
	}

	.c-data-table-shell__pagination {
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 0.75rem;
		padding: 0.5rem;
		border-top: 1px solid var(--color-border-primary);
	}

	.c-data-table-shell__page-info {
		font-size: 13px;
		color: var(--color-text-secondary);
	}
</style>
