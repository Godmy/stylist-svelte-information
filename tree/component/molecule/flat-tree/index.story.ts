import FlatTree from './index.svelte';
import type { RecipeTree } from '$stylist/tree/interface/recipe/tree';
import type { ContractStory } from '$stylist/html/interface/contract/story';

/** Flat tree: hierarchical nodes rendered as one indented, expandable list. */
export default {
	component: FlatTree,
	title: 'FlatTree',
	description: 'A flat tree component for displaying hierarchical data in a simplified view.',
	args: {
		nodes: [
			{
				id: '1',
				label: 'Root 1',
				children: [
					{ id: '1-1', label: 'Child 1-1' },
					{ id: '1-2', label: 'Child 1-2' }
				]
			},
			{
				id: '2',
				label: 'Root 2',
				children: [
					{ id: '2-1', label: 'Child 2-1' },
					{ id: '2-2', label: 'Child 2-2 (disabled)', disabled: true }
				]
			},
			{ id: '3', label: 'Leaf 3' }
		],
		selectedId: '1'
	},
	controls: {
		selectedId: { type: 'text', description: 'Id of the highlighted node' }
	},
	presets: { 'No Selection': { selectedId: '' } }
} satisfies ContractStory<RecipeTree>;
