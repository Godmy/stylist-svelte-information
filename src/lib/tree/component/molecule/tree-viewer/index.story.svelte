<script lang="ts">
	import Story from '$stylist/theme/component/molecule/story/index.svelte';
	import TreeViewer from './index.svelte';
	import type { TreeNodeItemNode } from '$stylist/tree/type/object/tree-node-item-node';

	// Create sample tree data
	const createSampleTree = (): TreeNodeItemNode[] => [
		{
			key: 'root-1',
			desc: 'System Architecture',
			child: [
				{
					key: 'module-1',
					desc: 'Authentication Module',
					child: [
						{
							key: 'auth-1',
							desc: 'Login Component',
							child: []
						},
						{
							key: 'auth-2',
							desc: 'Registration Component',
							child: []
						}
					]
				},
				{
					key: 'module-2',
					desc: 'Data Management',
					child: [
						{
							key: 'data-1',
							desc: 'Database Layer',
							child: []
						},
						{
							key: 'data-2',
							desc: 'API Services',
							child: []
						}
					]
				},
				{
					key: 'module-3',
					desc: 'UI Components',
					child: [
						{
							key: 'ui-1',
							desc: 'Layout Components',
							child: []
						},
						{
							key: 'ui-2',
							desc: 'Form Components',
							child: []
						},
						{
							key: 'ui-3',
							desc: 'Navigation Components',
							child: []
						}
					]
				}
			]
		},
		{
			key: 'root-2',
			desc: 'Documentation',
			child: [
				{
					key: 'doc-1',
					desc: 'API Documentation',
					child: [
						{
							key: 'api-1',
							desc: 'User API',
							child: []
						},
						{
							key: 'api-2',
							desc: 'Product API',
							child: []
						}
					]
				},
				{
					key: 'doc-2',
					desc: 'User Guides',
					child: [
						{
							key: 'guide-1',
							desc: 'Getting Started',
							child: []
						},
						{
							key: 'guide-2',
							desc: 'Advanced Usage',
							child: []
						}
					]
				}
			]
		},
		{
			key: 'root-3',
			desc: 'Configuration',
			child: []
		}
	];

	const treeData: TreeNodeItemNode[] = $state(createSampleTree());
	let selectedKey: string | undefined = $state(undefined);

	function handleSelectCallback(key: string | undefined) {
		console.log('Selected node in TreeViewer:', key);
		selectedKey = key;
	}

	function handleToggleCallback(key: string | undefined) {
		console.log('Toggled node in TreeViewer:', key);
	}
</script>

<Story
	title="TreeViewer Component"
	description="Interactive tree viewer with hierarchical data display"
>
	<div class="_c1">
		<p class="_c2">
			Selected node: {selectedKey || 'None'}
		</p>
		<div class="_c3">
			<TreeViewer
				tree={treeData}
				onSelectCallback={handleSelectCallback}
				onToggleCallback={handleToggleCallback}
			/>
		</div>
	</div>
</Story>

<style>
	._c1 {
		padding: 1rem;
	}
	._c2 {
		margin-bottom: 0.5rem;
		font-size: 0.875rem;
		line-height: 1.25rem;
		color: var(--color-text-secondary);
	}
	._c3 {
		border-radius: 0.25rem;
		border-width: 1px;
		border-style: solid;
	}
</style>
