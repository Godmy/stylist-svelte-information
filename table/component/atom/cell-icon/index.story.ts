import CellIcon from '$stylist/table/component/atom/cell-icon/index.svelte';
import type { RecipeCellIcon } from '$stylist/table/interface/recipe/cell-icon';
import type { ContractStory } from '$stylist/html/interface/contract/story';

/** Table cell displaying an SVG icon. */
export default {
	component: CellIcon,
	title: 'CellIcon',
	description: 'Table cell displaying an SVG icon.',
	args: { icon: 'user', label: 'User' },
	controls: {
		icon: { type: 'select', options: ['user', 'check-circle', 'x-circle'] },
		label: { type: 'text' }
	},
	presets: {
		Active: { icon: 'check-circle', label: 'Active' },
		Inactive: { icon: 'x-circle', label: 'Inactive' }
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
} satisfies ContractStory<RecipeCellIcon>;
