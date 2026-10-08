<script lang="ts">
	import Story from '$stylist/theme/component/molecule/story/index.svelte';
	import type { SlotStory } from '$stylist/theme/interface/slot/story';
	import TreeView from './index.svelte';

	type Props = {
		expandable: boolean;
		selectable: boolean;
		showIcons: boolean;
		indentSize: number;
	};

	const controls: SlotStory[] = [
		{ name: 'expandable', type: 'boolean', defaultValue: true },
		{ name: 'selectable', type: 'boolean', defaultValue: true },
		{ name: 'showIcons', type: 'boolean', defaultValue: true },
		{ name: 'indentSize', type: 'number', defaultValue: 20 }
	];

	const nodes = [
		{
			id: '1',
			label: 'Root 1',
			icon: '📁',
			children: [
				{ id: '1-1', label: 'Child 1-1', icon: '📄' },
				{ id: '1-2', label: 'Child 1-2', icon: '📄' }
			]
		},
		{
			id: '2',
			label: 'Root 2',
			icon: '📁',
			children: [{ id: '2-1', label: 'Child 2-1', icon: '📄' }]
		}
	];

	function handleNodeSelect(node: any) {
		console.log('Node selected:', node);
	}
</script>

<Story
	id="molecules-flat-tree"
	title="Molecules / Interaction / Controls / Trees / Flat Tree"
	component={TreeView}
	category="Molecules/Interaction/Controls/Trees"
	description="A flat tree component for displaying hierarchical data in a simplified view."
	tags={['tree', 'hierarchy', 'flat']}
	{controls}
>
	{#snippet children(values: any)}
		<div class="sb-molecules-flat-tree _c1">
			<h1 class="_c2">FlatTree Component</h1>

			<div class="_c3">
				<h2 class="_c4">Interactive FlatTree</h2>
				<div class="_c5">
					<TreeView {nodes}>
						{#snippet node(node, depth, selected)}
							<span class="_c6" class:_c7={selected}>
								<span class="_c8">{node.children?.length ? 'group' : 'leaf'}</span>
								<span>{node.label}</span>
								<span class="_c9">depth {depth}</span>
							</span>
						{/snippet}
					</TreeView>
				</div>
			</div>
		</div>
	{/snippet}
</Story>

<style>
	._c1 {
		padding: 1rem;
	}
	._c2 {
		margin-bottom: 1rem;
		font-size: 1.125rem;
		line-height: 1.75rem;
		font-weight: 600;
	}
	._c3 {
		margin-bottom: 1.5rem;
		border-radius: 0.25rem;
		border-width: 1px;
		border-style: solid;
		padding: 1rem;
	}
	._c4 {
		font-size: 1rem;
		line-height: 1.5rem;
		margin-bottom: 0.5rem;
		font-weight: 600;
	}
	._c5 {
		max-width: 28rem;
	}
	._c6 {
		display: inline-flex;
		min-width: 0;
		align-items: center;
		gap: 0.5rem;
	}
	._c7 {
		font-weight: 600;
	}
	._c8,
	._c9 {
		border-radius: 0.25rem;
		background: var(--color-background-secondary);
		padding: 0.0625rem 0.375rem;
		font-size: 0.75rem;
		color: var(--color-text-secondary);
	}
</style>
