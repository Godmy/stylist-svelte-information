import { describe, expect, it } from 'vitest';
import { createArticleBlock } from '$stylist/content/function/create/article-block';
import { checkArticleBlocks } from '$stylist/content/function/check/article-blocks';
import { splitArticleSections } from '$stylist/content/function/script/split-article-sections';
import { normalizeArticleHtml } from '$stylist/content/function/transform/article-html';
import { articleHtmlText } from '$stylist/content/function/transform/article-plain-text';
import type { ArticleBlock } from '$stylist/content/type/alias/article-block';

describe('shared article model', () => {
	it('creates stable new heading anchors without changing existing ones', () => {
		const blocks: ArticleBlock[] = [
			{ type: 'heading', level: 2, id: 'section-9', text: 'Title', contents: 'Title' },
			{ type: 'heading', level: 3, id: 'custom-anchor', text: 'Subtitle', contents: '' }
		];
		expect(createArticleBlock('heading', blocks)).toEqual({
			type: 'heading',
			level: 2,
			id: 'section-10',
			text: '',
			contents: ''
		});
		expect(blocks[0]).toHaveProperty('id', 'section-9');
	});
	it('groups introductory text and heading sections without changing the stored blocks', () => {
		const blocks: ArticleBlock[] = [
			{ type: 'paragraph', html: 'Intro' },
			{ type: 'heading', level: 2, id: 'section-2', text: 'Title', contents: 'Title' },
			{ type: 'paragraph', html: 'Body' }
		];
		expect(
			splitArticleSections(blocks).map(({ key, start, end }) => ({ key, start, end }))
		).toEqual([
			{ key: 'intro', start: 0, end: 1 },
			{ key: 'section-2', start: 1, end: 3 }
		]);
		expect(splitArticleSections([])).toEqual([]);
	});
	it('reports empty blocks with their original indices for editor navigation', () => {
		const problems = checkArticleBlocks([
			{ type: 'paragraph', html: '<strong></strong>' },
			{ type: 'list', ordered: false, items: [] },
			{ type: 'photos', variant: 'photo', photos: [] }
		]);
		expect(problems.map((problem) => problem.index)).toEqual([0, 1, 2]);
		expect(checkArticleBlocks([{ type: 'paragraph', html: 'Text' }])).toEqual([]);
	});
});

describe('article HTML boundary', () => {
	it('removes event handlers, unsafe links and active markup while preserving emphasis', () => {
		const html = normalizeArticleHtml(
			'<b onclick="bad()">Safe</b><a href="javascript:bad()">bad</a><img src=x onerror="bad()"><script>bad()</script><a href="/help" onmouseover="bad()">Help</a>'
		);
		expect(html).toBe('<strong>Safe</strong>badbad()<a href="/help">Help</a>');
		expect(html).not.toMatch(/javascript:|onerror|onclick|<script|<img/);
	});
	it('keeps block markup only in note blocks and rewrites external link attributes', () => {
		expect(normalizeArticleHtml('<p>Text</p><ul><li>Item</li></ul>')).toBe('TextItem');
		expect(normalizeArticleHtml('<p>Text</p><ul><li>Item</li></ul>', { block: true })).toBe(
			'<p>Text</p><ul><li>Item</li></ul>'
		);
		expect(normalizeArticleHtml('<a href="https://example.com?a=1&amp;b=2">Site</a>')).toContain(
			'rel="noopener noreferrer"'
		);
	});
	it('projects the same visible text for search and editor validation', () => {
		expect(articleHtmlText('<strong>Text</strong>&nbsp; &amp; <em>more</em>')).toBe('Text & more');
	});
});
