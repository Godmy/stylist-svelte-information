import type { ComparisonCardItem } from '$stylist/table/type/object/comparison-card-item';

/**
 * A column of a comparison card: «Pros» / «Cons», «Before» / «After».
 * `tone` colours the column title: `positive`, `negative` or `neutral` (default).
 */
export type ComparisonCardColumn = {
	title: string;
	tone?: 'positive' | 'negative' | 'neutral';
	items: ComparisonCardItem[];
};
