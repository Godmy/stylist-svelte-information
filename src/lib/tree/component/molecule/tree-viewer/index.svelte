<script lang="ts">
	import type { RecipeTreeViewer } from '$stylist/tree/interface/recipe/tree-viewer';
	import FlatTree from '$stylist/tree/component/molecule/flat-tree/index.svelte';
	import { normalizeTreeViewerNode } from '$stylist/tree/function/script/normalize-tree-viewer-node';
	import createTreeViewerState from './state.svelte';

	let props: RecipeTreeViewer = $props();

	const state = createTreeViewerState(() => props);

	const nodes = $derived(state.tree.map((node, index) => normalizeTreeViewerNode(node, index)));

	const restProps = $derived.by(() => {
		const {
			class: _class,
			tree: _tree,
			onSelectCallback: _onSelectCallback,
			onToggleCallback: _onToggleCallback,
			itemHeight: _itemHeight,
			visibleItemCount: _visibleItemCount,
			bufferSize: _bufferSize,
			onSelect: _onSelect,
			onExpand: _onExpand,
			onCollapse: _onCollapse,
			...rest
		} = props;
		return rest;
	});
</script>

<div class="tree-viewer {state.className}" {...restProps}>
	<FlatTree
		{nodes}
		onSelect={(node) => {
			state.handleTreeNodeSelect(node.id);
		}}
		onToggle={(node, expanded) => {
			state.handleTreeNodeToggle(node.id, expanded);
		}}
	>
		{#snippet node(node)}
			<span class="tree-viewer__node">
				<span class="tree-viewer__label">{node.label}</span>
			</span>
		{/snippet}
	</FlatTree>
</div>

<style>
	.tree-viewer {
		display: flex;
		flex-direction: column;
		gap: var(--spacing-1);
	}
	.tree-viewer__node {
		display: inline-flex;
		min-width: 0;
		align-items: center;
		gap: var(--spacing-2);
	}
	.tree-viewer__label {
		min-width: 0;
		overflow-wrap: anywhere;
	}
</style>
