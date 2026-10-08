<script lang="ts">
	import type { HTMLAttributes } from 'svelte/elements';
	import type { RecipeCellHeader } from '$stylist/table/interface/recipe/cell-header';
	import { createCellHeaderState } from './state.svelte';
	import Icon from '$stylist/svg/component/atom/icon/index.svelte';

	let props: RecipeCellHeader & HTMLAttributes<HTMLTableHeaderCellElement> = $props();
	const state = createCellHeaderState(() => props);
</script>

<th
	class="c-cell-header {props.sortKey ? 'c-cell-header--sortable' : ''} {state.isCurrentSort
		? 'c-cell-header--sorted'
		: ''} {props.class ?? ''}"
	data-sort={state.sortDirection ?? undefined}
	onclick={state.handleClick}
>
	<span class="c-cell-header__inner">
		<span>{props.title}</span>
		{#if props.sortKey}
			<Icon name={state.sortIcon} class="c-cell-header__icon" />
		{/if}
	</span>
</th>

<style>
	.c-cell-header {
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

	.c-cell-header--sortable {
		cursor: pointer;
	}

	.c-cell-header--sortable:hover {
		color: var(--color-text-primary);
	}

	.c-cell-header__inner {
		display: inline-flex;
		align-items: center;
		gap: 0.25rem;
	}

	:global(.c-cell-header__icon) {
		width: 0.75rem;
		height: 0.75rem;
		opacity: 0.4;
	}

	.c-cell-header[data-sort] :global(.c-cell-header__icon) {
		opacity: 1;
		color: var(--color-primary-600);
	}

	.c-cell-header[data-sort='desc'] :global(.c-cell-header__icon) {
		transform: rotate(180deg);
	}
</style>
