<script lang="ts">
	import Story from '$stylist/theme/component/molecule/story/index.svelte';
	import TreeNodeItem from './index.svelte';
	import type { TokenControllerType } from '$stylist/domain/type/alias/controller-type';

	const controls = [
		{
			name: 'desc',
			type: 'text' as TokenControllerType,
			defaultValue: 'Sample Node',
			description: 'Node description'
		},
		{
			name: 'level',
			type: 'number' as TokenControllerType,
			defaultValue: 0,
			description: 'Node level in the tree'
		},
		{
			name: 'expanded',
			type: 'boolean' as TokenControllerType,
			defaultValue: false,
			description: 'Whether the node is expanded'
		},
		{
			name: 'selected',
			type: 'boolean' as TokenControllerType,
			defaultValue: false,
			description: 'Whether the node is selected'
		},
		{
			name: 'disabled',
			type: 'boolean' as TokenControllerType,
			defaultValue: false,
			description: 'Whether the node is disabled'
		}
	];

	function handleSelect(key: string | undefined) {
		console.log('Node selected:', key);
	}

	function handleToggle(key: string | undefined) {
		console.log('Node toggled:', key);
	}
</script>

<Story {controls} title="TreeNodeItem Component" description="A single node item in a tree view">
	{#snippet children(controlValues: any)}
		<div class="_c1">
			<TreeNodeItem
				node={{
					key: 'sample-node',
					desc: controlValues.desc,
					child: []
				}}
				onSelectCallback={handleSelect}
			/>
		</div>
	{/snippet}
</Story>

<style>
	._c1 {
		padding: 1rem;
	}
</style>
