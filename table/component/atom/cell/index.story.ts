import Cell from './index.svelte';
import type { RecipeCell } from '$stylist/table/interface/recipe/cell';
import type { ContractStory } from '$stylist/html/interface/contract/story';

/** Base table cell: renders td or th based on variant. */
export default {
	component: Cell,
	title: 'Cell',
	description: 'Base table cell — renders td or th based on variant.',
	args: { variant: 'data', align: 'left' },
	controls: {
		variant: { type: 'select', options: ['data', 'header'] },
		align: { type: 'select', options: ['left', 'center', 'right'] }
	},
	presets: { Header: { variant: 'header' }, 'Right aligned': { align: 'right' } },
	content: [{ kind: 'text', value: 'Alpha' }],
	context: {
		kind: 'element',
		tag: 'table',
		children: [
			{
				kind: 'element',
				tag: 'tbody',
				children: [{ kind: 'element', tag: 'tr', children: [{ kind: 'outlet' }] }]
			}
		]
	}
} satisfies ContractStory<RecipeCell>;
