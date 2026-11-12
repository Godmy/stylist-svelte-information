import type { ArticleBlock } from '$stylist/content/type/alias/article-block';
export type ArticleEditorSection = {
	key: string;
	heading: Extract<ArticleBlock, { type: 'heading' }> | null;
	start: number;
	end: number;
};
