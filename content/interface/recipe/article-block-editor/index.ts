import type { ComputeIntersectAll } from '$stylist/theme/type/compute/intersect-all';
import type { BehaviorArticleBlockEditor } from '$stylist/content/interface/behavior/article-block-editor';
import type { ArticleBlock } from '$stylist/content/type/alias/article-block';

export interface RecipeArticleBlockEditor extends ComputeIntersectAll<
	[
		{
			value?: ArticleBlock[];
			idPrefix?: string;
			disabled?: boolean;
			revealRequest?: { index: number } | null;
			resetKey?: string;
		},
		BehaviorArticleBlockEditor
	]
> {}
