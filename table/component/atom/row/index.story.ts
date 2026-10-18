import Row from './index.svelte';
import type { RecipeRow } from '$stylist/table/interface/recipe/row';
import type { ContractStory } from '$stylist/html/interface/contract/story';

/** Table row with striped, active, and hoverable states. */
export default {
	component: Row,
	title: 'Row',
	description: 'Table row with striped, active, and hoverable states.',
	args: { striped: true, active: false, hoverable: true },
	controls: {
		striped: { type: 'boolean' },
		active: { type: 'boolean' },
		hoverable: { type: 'boolean' }
	},
	presets: { Active: { active: true } },
	content: [
		{ kind: 'element', tag: 'td', children: [{ kind: 'text', value: 'Alpha' }] },
		{ kind: 'element', tag: 'td', children: [{ kind: 'text', value: '1' }] }
	],
	context: {
		kind: 'element',
		tag: 'table',
		children: [{ kind: 'element', tag: 'tbody', children: [{ kind: 'outlet' }] }]
	}
} satisfies ContractStory<RecipeRow>;
