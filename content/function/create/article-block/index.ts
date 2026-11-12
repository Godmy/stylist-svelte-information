import type { ArticleBlock } from '$stylist/content/type/alias/article-block';
export function createArticleBlock(
	type: ArticleBlock['type'],
	blocks: readonly ArticleBlock[]
): ArticleBlock {
	if (type === 'heading')
		return {
			type,
			level: 2,
			id: `section-${Math.max(1, ...blocks.flatMap((block) => (block.type === 'heading' && /^section-\d+$/.test(block.id) ? [Number(block.id.slice(8))] : []))) + 1}`,
			text: '',
			contents: ''
		};
	if (type === 'photos') return { type, variant: 'photo', photos: [] };
	if (type === 'list') return { type, ordered: false, items: [''] };
	if (type === 'note') return { type, emergency: false, html: '' };
	if (type === 'table') return { type, head: ['', ''], rows: [['', '']] };
	if (type === 'comparison')
		return {
			type,
			columns: [
				{ title: 'Минусы', tone: 'negative', items: [] },
				{ title: 'Плюсы', tone: 'positive', items: [] }
			]
		};
	return { type: 'paragraph', html: '' };
}
