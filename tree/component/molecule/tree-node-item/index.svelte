<script lang="ts">
	import Icon from '$stylist/svg/component/atom/icon/index.svelte';
	import type { RecipeTreeNodeItem } from '$stylist/tree/interface/recipe/tree-node-item';
	import createTreeNodeItemState from '$stylist/tree/component/molecule/tree-node-item/state.svelte';
	import Self from '$stylist/tree/component/molecule/tree-node-item/index.svelte';

	import { TREE_TREE_NODE_ITEM_MESSAGE } from '$stylist/tree/const/record/tree-node-item-message';
	import { useMessage } from '$stylist/localization/function/hook/use-message';

	let props: RecipeTreeNodeItem = $props();
	const state = createTreeNodeItemState(() => props);
	const t = useMessage('tree-node-item', TREE_TREE_NODE_ITEM_MESSAGE);
</script>

<div class={state.containerClasses}>
	<div
		class={state.headerClasses}
		onclick={() => !state.hasChildren && state.handleSelect()}
		onkeydown={(e) => {
			if (e.key === 'Enter' || e.key === ' ') {
				e.preventDefault();
				if (!state.hasChildren) state.handleSelect();
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
				aria-label={state.expanded ? t('collapse') : t('expand')}
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
				<!-- Decorative: the node text next to it already names the item. -->
				<img src={state.secondaryIcon} alt="" class={state.secondaryIconImageClasses} />
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
		padding: var(--space-1) var(--space-2);
		border-radius: var(--radius-1-5);
		cursor: pointer;
		transition: background-color;
		min-height: var(--space-8);
	}

	.c-tree-node__header:hover {
		background-color: var(--color-secondary-100);
	}

	.c-tree-node__header--expanded {
		background-color: var(--color-secondary-50);
	}

	/* Tree toggle icon styles */
	.c-tree-node__toggle {
		width: var(--space-4);
		height: var(--space-4);
		margin-right: var(--space-2);
		cursor: pointer;
		color: var(--color-text-secondary);
	}

	.c-tree-node__toggle:hover {
		color: var(--color-text-primary);
	}

	/* No toggle placeholder */
	.c-tree-node__no-toggle {
		width: var(--space-4);
		height: var(--space-4);
		margin-right: var(--space-2);
	}

	/* Tree node text */
	.c-tree-node__text {
		flex: 1;
		color: var(--color-text-primary);
	}

	/* Secondary icon */
	.c-tree-node__icon {
		margin-left: var(--space-2);
		color: var(--color-text-secondary);
	}

	.c-tree-node__icon-img {
		margin-left: var(--space-2);
		width: var(--space-4);
		height: var(--space-4);
	}

	/* Tree node children */
	.c-tree-node__children {
		margin-left: var(--space-6);
		border-left: 2px solid var(--color-border-secondary);
		padding-left: var(--space-2);
	}
</style>
