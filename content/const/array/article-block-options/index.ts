import type { ArticleBlock } from '$stylist/content/type/alias/article-block';
export const ARTICLE_BLOCK_OPTIONS = [
	{ type: 'paragraph', label: 'Абзац' },
	{ type: 'heading', label: 'Заголовок' },
	{ type: 'photos', label: 'Фото' },
	{ type: 'list', label: 'Список' },
	{ type: 'note', label: 'Врезка' },
	{ type: 'table', label: 'Таблица' },
	{ type: 'comparison', label: 'Сравнение' }
] satisfies { type: ArticleBlock['type']; label: string }[];
