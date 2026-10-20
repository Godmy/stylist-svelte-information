import TreeNodeItem from './index.svelte';
import type { RecipeTreeNodeItem } from '$stylist/tree/interface/recipe/tree-node-item';
import type { ContractStory } from '$stylist/html/interface/contract/story';

/** A single node of a tree view, with an expand toggle when it has children. */
export default {
	component: TreeNodeItem,
	title: 'TreeNodeItem',
	description: 'A single node item in a tree view.',
	args: {
		node: { key: 'sample-node', desc: 'Sample Node', child: [] }
	},
	presets: {
		'With Children': {
			node: {
				key: 'parent-node',
				desc: 'Parent Node',
				child: [
					{ key: 'child-1', desc: 'Child 1', child: [] },
					{ key: 'child-2', desc: 'Child 2', child: [] }
				]
			}
		}
	}
} satisfies ContractStory<RecipeTreeNodeItem>;
