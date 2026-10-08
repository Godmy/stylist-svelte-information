<script lang="ts">
	import Story from '$stylist/theme/component/molecule/story/index.svelte';
	import ColumnManager from './index.svelte';
	import type { SlotColumnConfig } from '$stylist/table/interface/slot/column-config';

	let columns: SlotColumnConfig[] = [
		{ key: 'name', header: 'Name', visible: true, sortable: true },
		{ key: 'role', header: 'Role', visible: true, filterable: true },
		{ key: 'status', header: 'Status', visible: true, filterable: true },
		{ key: 'email', header: 'Email', visible: false, sortable: true }
	];
</script>

<Story
	component={ColumnManager}
	title="ColumnManager"
	description="Column visibility control for table shells."
>
	{#snippet children()}
		<div class="column-manager-story">
			<ColumnManager
				{columns}
				onColumnsChange={(nextColumns) => {
					columns = nextColumns;
				}}
			/>
			<div class="column-manager-story__preview">
				{#each columns as column}
					<span class:column-manager-story__item--hidden={!column.visible}>
						{column.header}
					</span>
				{/each}
			</div>
		</div>
	{/snippet}
</Story>

<style>
	.column-manager-story {
		display: grid;
		gap: 1rem;
		max-width: 320px;
	}

	.column-manager-story__preview {
		display: flex;
		flex-wrap: wrap;
		gap: 0.4rem;
	}

	.column-manager-story__preview span {
		padding: 0.25rem 0.55rem;
		border: 1px solid var(--color-border-primary);
		border-radius: 6px;
		font-size: 12px;
		color: var(--color-text-primary);
	}

	.column-manager-story__item--hidden {
		opacity: 0.45;
		text-decoration: line-through;
	}
</style>
