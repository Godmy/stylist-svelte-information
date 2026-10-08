<script lang="ts">
	import type { RecipeRowExpandable } from '$stylist/table/interface/recipe/row-expandable';
	import { createExpandableTableRowState } from './state.svelte';
	import Icon from '$stylist/svg/component/atom/icon/index.svelte';

	let {
		expandableContent,
		rowContent,
		isExpanded = false,
		class: hostClass = '',
		cellClass = '',
		headerCellClass = '',
		onToggle,
		...restProps
	}: RecipeRowExpandable = $props();

	const state = createExpandableTableRowState({
		expandableContent,
		rowContent,
		isExpanded,
		class: hostClass,
		cellClass,
		headerCellClass,
		onToggle,
		...restProps
	});
</script>

<tr class="c-row-expandable {hostClass}" data-expanded={state.expanded || undefined} {...restProps}>
	<td class="c-row-expandable__toggle {headerCellClass}">
		<button
			type="button"
			class="c-row-expandable__btn"
			onclick={() => state.toggleExpanded()}
			aria-expanded={state.expanded}
		>
			<Icon
				name={state.expanded ? 'chevron-down' : 'chevron-right'}
				class="c-row-expandable__icon"
			/>
		</button>
	</td>
	{@render rowContent()}
</tr>

{#if state.expanded}
	<tr class="c-row-expandable c-row-expandable--detail {hostClass}">
		<td class="c-row-expandable__detail {cellClass}" colspan="999">
			{@render expandableContent()}
		</td>
	</tr>
{/if}

<style>
	.c-row-expandable {
		border-bottom: 1px solid var(--color-border-primary);
	}

	.c-row-expandable__toggle {
		padding: 0.25rem 0.5rem;
		width: 2rem;
	}

	.c-row-expandable__btn {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		width: 1.5rem;
		height: 1.5rem;
		background: none;
		border: none;
		border-radius: 4px;
		cursor: pointer;
		color: var(--color-text-secondary);
	}

	.c-row-expandable__btn:hover {
		background: var(--color-background-secondary);
		color: var(--color-text-primary);
	}

	.c-row-expandable__btn:focus-visible {
		outline: 2px solid var(--color-primary-500);
		outline-offset: 2px;
	}

	:global(.c-row-expandable__icon) {
		width: 0.9rem;
		height: 0.9rem;
	}

	.c-row-expandable__detail {
		padding: 0.75rem 1rem;
		background: var(--color-background-secondary);
		color: var(--color-text-secondary);
		font-size: 13px;
	}
</style>
