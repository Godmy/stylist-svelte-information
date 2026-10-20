import CellPill from './index.svelte';
import type { RecipeCellPill } from '$stylist/table/interface/recipe/cell-pill';
import type { ContractStory } from '$stylist/html/interface/contract/story';

/** Table cell displaying a pill/badge for enum/category values. */
export default {
	component: CellPill,
	title: 'CellPill',
	description: 'Table cell displaying a pill/badge for enum/category values.',
	args: { value: 'Active', variant: 'success' },
	controls: {
		value: { type: 'text' },
		variant: { type: 'select', options: ['default', 'primary', 'success', 'warning', 'danger'] }
	},
	presets: {
		Pending: { value: 'Pending', variant: 'warning' },
		Inactive: { value: 'Inactive', variant: 'danger' },
		Draft: { value: 'Draft', variant: 'default' },
		Primary: { value: 'Primary', variant: 'primary' }
	},
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
} satisfies ContractStory<RecipeCellPill>;
