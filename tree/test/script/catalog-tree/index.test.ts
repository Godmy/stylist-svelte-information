import { describe, expect, it } from 'vitest';
import { buildCatalogTree } from '$stylist/tree/function/script/build-catalog-tree';
import { filterCatalogTree } from '$stylist/tree/function/script/filter-catalog-tree';

const rows = [
	{ id: 'vps', parent_id: null, caption: 'VPS' },
	{ id: 'aeza', parent_id: 'vps', caption: 'aeza' },
	{ id: 'site', parent_id: 'aeza', caption: 'myspanish.space', url: 'https://myspanish.space' },
	{ id: 'lonely', parent_id: 'missing', caption: 'Сирота' },
	{ id: 'a', parent_id: 'b', caption: 'A' },
	{ id: 'b', parent_id: 'a', caption: 'B' },
	{ id: 'note', parent_id: null, caption: '' }
];

describe('buildCatalogTree', () => {
	it('nests rows by parent, counts descendants and keeps orphans and cycles as roots', () => {
		const tree = buildCatalogTree(rows);
		const ids = tree.map((node) => node.id);
		expect(ids).toContain('vps');
		expect(ids).toContain('lonely');
		expect(ids).toEqual(expect.arrayContaining(['a', 'b']));
		const vps = tree.find((node) => node.id === 'vps')!;
		expect(vps.descendants).toBe(2);
		expect(vps.children[0].children[0].label).toBe('myspanish.space');
		expect(tree.find((node) => node.id === 'note')?.label).toBe('note');
		// Branches come before leaves.
		expect(tree[0].children.length).toBeGreaterThan(0);
	});
});

describe('buildCatalogTree weight', () => {
	it('puts heavier siblings first and keeps the old order on equal weight', () => {
		const tree = buildCatalogTree([
			{ id: 'folder', parent_id: null, caption: 'Б' },
			{ id: 'child', parent_id: 'folder', caption: 'x' },
			{ id: 'light', parent_id: null, caption: 'А' },
			{ id: 'heavy', parent_id: null, caption: 'Я', weight: 10 },
			{ id: 'text', parent_id: null, caption: 'В', weight: 'n/a' }
		]);
		expect(tree.map((node) => node.id)).toEqual(['heavy', 'folder', 'light', 'text']);
	});
});

describe('filterCatalogTree', () => {
	it('keeps matches with their ancestors and searches listed columns', () => {
		const tree = buildCatalogTree(rows);
		const byUrl = filterCatalogTree(tree, 'HTTPS://MYSPANISH', ['url']);
		expect(byUrl.map((node) => node.id)).toEqual(['vps']);
		expect(byUrl[0].children[0].children.map((node) => node.id)).toEqual(['site']);
		expect(filterCatalogTree(tree, 'https', [])).toEqual([]);
		expect(filterCatalogTree(tree, '  ')).toHaveLength(tree.length);
	});
});
