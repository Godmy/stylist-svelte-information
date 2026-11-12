import type { Snippet } from 'svelte';
import type { ArticleDocument } from '$stylist/content/type/struct/article-document';
export interface SlotArticleReader {
	article: ArticleDocument;
	class?: string;
	/** CSS hooks, including --article-header-height for a fixed site header. */
	style?: string;
	eyebrow?: string;
	beforeTitle?: Snippet;
	afterArticle?: Snippet;
	contentsLabel?: string;
	linksLabel?: string;
}
