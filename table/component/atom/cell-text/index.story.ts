import CellText from '$stylist/table/component/atom/cell-text/index.svelte';
import type { RecipeCellText } from '$stylist/table/interface/recipe/cell-text';
import type { ContractStory } from '$stylist/html/interface/contract/story';

/** Table cell for text/number values with optional truncation. */
export default {
	component: CellText,
	title: 'CellText',
	description: 'Table cell for text/number values with optional truncation.',
	args: { value: 'Hello world', truncate: false, align: 'left' },
	controls: {
		value: { type: 'text' },
		truncate: { type: 'boolean' },
		align: { type: 'select', options: ['left', 'center', 'right'] }
	},
	presets: {
		Number: { value: 42, align: 'right' },
		Truncated: {
			value: 'A very long text that gets truncated when it overflows the cell boundary',
			truncate: true
		},
		Empty: { value: null }
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
} satisfies ContractStory<RecipeCellText>;
