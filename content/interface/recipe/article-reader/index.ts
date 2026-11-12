import type { ComputeIntersectAll } from '$stylist/theme/type/compute/intersect-all';
import type { SlotArticleReader } from '$stylist/content/interface/slot/article-reader';
import type { BehaviorArticleReader } from '$stylist/content/interface/behavior/article-reader';
export interface RecipeArticleReader extends ComputeIntersectAll<
	[SlotArticleReader, BehaviorArticleReader]
> {}
