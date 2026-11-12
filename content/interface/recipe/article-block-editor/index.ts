import type { ComputeIntersectAll } from '$stylist/theme/type/compute/intersect-all';
import type { SlotArticleBlockEditor } from '$stylist/content/interface/slot/article-block-editor';
import type { BehaviorArticleBlockEditor } from '$stylist/content/interface/behavior/article-block-editor';
export interface RecipeArticleBlockEditor extends ComputeIntersectAll<
	[SlotArticleBlockEditor, BehaviorArticleBlockEditor]
> {}
