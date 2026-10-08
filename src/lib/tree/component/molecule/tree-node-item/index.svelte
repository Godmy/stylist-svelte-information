<script lang="ts">
	import Icon from '$stylist/svg/component/atom/icon/index.svelte';
	import type { RecipeTreeNodeItem } from '$stylist/tree/interface/recipe/tree-node-item';
	import createTreeNodeItemState from './state.svelte';
	import Self from './index.svelte';

	let props: RecipeTreeNodeItem = $props();
	const state = createTreeNodeItemState(() => props);
</script>

<div class={state.containerClasses}>
	<div
		class={state.headerClasses}
		onclick={() => !state.hasChildren && state.handleSelect()}
		onkeydown={(e) => {
			if (e.key === 'Enter' || e.key === ' ') {
				e.preventDefault();
				!state.hasChildren && state.handleSelect();
			}
		}}
		role="treeitem"
		tabindex="0"
		aria-expanded={state.hasChildren ? state.expanded : undefined}
		aria-selected="false"
		{...state.filteredRestProps}
	>
		{#if state.hasChildren}
			<button
				type="button"
				class={state.toggleIconClasses}
				onclick={state.toggleExpand}
				onkeydown={(e) => {
					if (e.key === 'Enter' || e.key === ' ') {
						e.preventDefault();
						state.toggleExpand(e);
					}
				}}
				tabindex="0"
				aria-label={state.expanded ? 'Collapse' : 'Expand'}
			>
				{#if state.expanded}
					<Icon name={state.ChevronDown} style="width:1rem;height:1rem;" />
				{:else}
					<Icon name={state.ChevronRight} style="width:1rem;height:1rem;" />
				{/if}
			</button>
		{:else}
			<div class={state.noToggleClasses}></div>
		{/if}

		<span class={state.textClasses}>{state.node.desc}</span>

		{#if state.secondaryIcon}
			{#if state.faIcon}
				<span class={state.secondaryIconClasses}>{state.secondaryIcon}</span>
			{:else}
				<img
					src={state.secondaryIcon}
					alt="secondary icon"
					class={state.secondaryIconImageClasses}
				/>
			{/if}
		{/if}
	</div>

	{#if state.hasChildren && state.expanded}
		<div class={state.childrenClasses} role="group">
			{#each state.node.child as child (child.key || child.desc)}
				<Self
					node={child}
					onSelectCallback={props.onSelectCallback}
					secondaryIcon={state.secondaryIcon}
					faIcon={state.faIcon}
					expandedNodes={state.expandedNodes}
				/>
			{/each}
		</div>
	{/if}
</div>

<style>
	/* Base tree node container styles */
	.c-tree-node {
		display: flex;
		flex-direction: column;
	}

	/* Tree node header styles */
	.c-tree-node__header {
		display: flex;
		align-items: center;
		padding: var(--spacing-1) var(--spacing-2);
		border-radius: var(--border-radius-base);
		cursor: pointer;
		transition: background-color;
		min-height: var(--spacing-8);
	}

	.c-tree-node__header:hover {
		background-color: var(--color-secondary-100);
	}

	.c-tree-node__header--expanded {
		background-color: var(--color-secondary-50);
	}

	/* Tree toggle icon styles */
	.c-tree-node__toggle {
		width: var(--spacing-4);
		height: var(--spacing-4);
		margin-right: var(--spacing-2);
		cursor: pointer;
		color: var(--color-text-secondary);
	}

	.c-tree-node__toggle:hover {
		color: var(--color-text-primary);
	}

	/* No toggle placeholder */
	.c-tree-node__no-toggle {
		width: var(--spacing-4);
		height: var(--spacing-4);
		margin-right: var(--spacing-2);
	}

	/* Tree node text */
	.c-tree-node__text {
		flex: 1;
		color: var(--color-text-primary);
	}

	/* Secondary icon */
	.c-tree-node__icon {
		margin-left: var(--spacing-2);
		color: var(--color-text-secondary);
	}

	.c-tree-node__icon-img {
		margin-left: var(--spacing-2);
		width: var(--spacing-4);
		height: var(--spacing-4);
	}

	/* Tree node children */
	.c-tree-node__children {
		margin-left: var(--spacing-6);
		border-left: 2px solid var(--color-border-secondary);
		padding-left: var(--spacing-2);
	}
</style>
