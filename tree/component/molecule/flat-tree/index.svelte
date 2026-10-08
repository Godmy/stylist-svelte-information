<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { RecipeTree } from '$stylist/tree/interface/recipe/tree';
	import type { TreeNode } from '$stylist/tree/type/object/tree-node';
	import createTreeExpansionState from '$stylist/tree/function/state/tree-expansion/index.svelte';
	let {
		nodes = [],
		selectedId = '',
		onSelect,
		onToggle,
		node: nodeContent,
		class: className = '',
		...restProps
	}: RecipeTree & {
		onToggle?: (node: TreeNode, expanded: boolean) => void;
		node?: Snippet<[TreeNode, number, boolean]>;
	} = $props();
	const state = createTreeExpansionState();
	const rootClass = $derived(['c-flat-tree', className].filter(Boolean).join(' '));

	function handleNodeClick(node: TreeNode): void {
		if (node.disabled) return;
		onSelect?.(node);
		if (node.children?.length) {
			const expanded = !state.isOpen(node);
			state.toggle(node.id);
			onToggle?.(node, expanded);
		}
	}
</script>

{#snippet renderNode(node: TreeNode, depth: number)}
	<li>
		<button
			type="button"
			class="c-tree__item-btn"
			class:c-tree__item-btn--active={node.id === selectedId}
			class:c-tree__item-btn--disabled={node.disabled}
			style:padding-left="{0.5 + depth * 0.75}rem"
			disabled={node.disabled}
			onclick={() => handleNodeClick(node)}
		>
			<span class="c-tree__toggle"
				>{node.children?.length ? (state.isOpen(node) ? '-' : '+') : ''}</span
			>
			<span class="c-tree__label">
				{#if nodeContent}
					{@render nodeContent(node, depth, node.id === selectedId)}
				{:else}
					{node.label}
				{/if}
			</span>
		</button>
		{#if node.children?.length && state.isOpen(node)}
			<ul class="c-tree__children">
				{#each node.children as child}
					{@render renderNode(child, depth + 1)}
				{/each}
			</ul>
		{/if}
	</li>
{/snippet}

<div class={rootClass} {...restProps}>
	<ul class="c-tree__list">
		{#each nodes as node}
			{@render renderNode(node, 0)}
		{/each}
	</ul>
</div>

<style>
	.c-flat-tree {
		display: block;
	}
	.c-tree__list {
		display: flex;
		flex-direction: column;
		gap: 0.25rem;
		list-style: none;
		margin: 0;
		padding: 0;
	}
	.c-tree__item-btn {
		display: flex;
		align-items: flex-start;
		gap: 0.35rem;
		width: 100%;
		border-radius: 0.375rem;
		padding-block: 0.35rem;
		padding-right: 0.5rem;
		text-align: left;
		background: transparent;
		border: none;
		cursor: pointer;
		color: var(--color-text-primary);
		transition: background-color var(--duration-120, 120ms);
		font: inherit;
	}
	.c-tree__item-btn:hover {
		background: var(--color-background-secondary);
	}
	.c-tree__item-btn--active {
		background: var(--color-background-secondary);
		color: var(--color-primary-500);
	}
	.c-tree__item-btn--disabled {
		cursor: not-allowed;
		color: var(--color-text-secondary);
	}
	.c-tree__item-btn:focus-visible {
		outline: 2px solid var(--color-primary-500);
		outline-offset: -2px;
	}
	.c-tree__toggle {
		width: 0.75rem;
		flex: 0 0 auto;
		color: var(--color-text-secondary);
	}
	.c-tree__label {
		min-width: 0;
		word-break: break-word;
	}
	.c-tree__children {
		display: flex;
		flex-direction: column;
		gap: 0.25rem;
		list-style: none;
		margin: 0.25rem 0 0;
		padding: 0;
	}
</style>
