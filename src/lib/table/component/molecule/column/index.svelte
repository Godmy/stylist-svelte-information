<script lang="ts">
	import type { RecipeColumn } from '$stylist/table/interface/recipe/column';
	import { createColumnState } from './state.svelte';
	import Icon from '$stylist/svg/component/atom/icon/index.svelte';

	let props: RecipeColumn = $props();
	const state = createColumnState(() => props);
</script>

<th
	class="c-column {props.schema.sortable ? 'c-column--sortable' : ''} {state.isCurrentSort
		? 'c-column--sorted'
		: ''}"
	style={props.schema.width ? `width:${props.schema.width}px` : undefined}
	data-sort={state.sortDirection !== 'none' ? state.sortDirection : undefined}
	onclick={state.handleSort}
>
	<span class="c-column__inner">
		<span>{props.schema.header}</span>
		{#if props.schema.sortable}
			<Icon name={state.sortIcon} class="c-column__icon" />
		{/if}
	</span>
</th>

<style>
	.c-column {
		padding: 0.4rem 0.75rem;
		text-align: left;
		font-size: 11px;
		font-weight: 600;
		text-transform: uppercase;
		color: var(--color-text-secondary);
		white-space: nowrap;
		background: var(--color-background-secondary);
		border-bottom: 1px solid var(--color-border-primary);
	}

	.c-column--sortable {
		cursor: pointer;
	}

	.c-column--sortable:hover {
		color: var(--color-text-primary);
	}

	.c-column__inner {
		display: inline-flex;
		align-items: center;
		gap: 0.25rem;
	}

	:global(.c-column__icon) {
		width: 0.75rem;
		height: 0.75rem;
		opacity: 0.4;
	}

	.c-column[data-sort] :global(.c-column__icon) {
		opacity: 1;
		color: var(--color-primary-600);
	}

	.c-column[data-sort='desc'] :global(.c-column__icon) {
		transform: rotate(180deg);
	}
</style>
