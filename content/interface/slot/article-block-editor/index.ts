import type { ArticleBlock } from '$stylist/content/type/alias/article-block';
export interface SlotArticleBlockEditor {
	value?: ArticleBlock[];
	idPrefix?: string;
	disabled?: boolean;
	revealRequest?: { index: number } | null;
	resetKey?: string;
}
