import Table from './index.svelte';
import type { RecipeTable } from '$stylist/table/interface/recipe/table';
import type { ContractStory } from '$stylist/html/interface/contract/story';
import type { HtmlNode } from '$stylist/html/type/alias/html-node';

const row = (tag: 'th' | 'td', cells: string[]): HtmlNode => ({
	kind: 'element',
	tag: 'tr',
	children: cells.map((value) => ({ kind: 'element', tag, children: [{ kind: 'text', value }] }))
});

/** A table component for displaying tabular data. */
export default {
	component: Table,
	title: 'Table',
	description: 'A table component for displaying tabular data.',
	args: { caption: 'Example table', striped: false, bordered: false, hoverable: true },
	controls: {
		caption: { type: 'text' },
		striped: { type: 'boolean' },
		bordered: { type: 'boolean' },
		hoverable: { type: 'boolean' }
	},
	presets: {
		Striped: { caption: 'Striped example', striped: true },
		Bordered: { caption: 'Bordered example', bordered: true }
	},
	content: [
		{ kind: 'element', tag: 'thead', children: [row('th', ['Name', 'Value'])] },
		{
			kind: 'element',
			tag: 'tbody',
			children: [row('td', ['Alpha', '123']), row('td', ['Beta', '456'])]
		}
	]
} satisfies ContractStory<RecipeTable>;
