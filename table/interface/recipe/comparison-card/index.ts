import type { Snippet } from 'svelte';
import type { HTMLAttributes } from 'svelte/elements';
import type { ComparisonCardColumn } from '$stylist/table/type/object/comparison-card-column';
import type { ComparisonCardItem } from '$stylist/table/type/object/comparison-card-item';

export interface RecipeComparisonCard extends Omit<HTMLAttributes<HTMLDivElement>, 'title'> {
	/** Heading over the columns; empty renders none. */
	title?: string;
	/** Level of `title`; column titles are one level lower (default 3, columns h4). */
	headingLevel?: 2 | 3 | 4 | 5;
	/** Compared columns side by side, stacked in a narrow container. */
	columns: ComparisonCardColumn[];
	/** Custom item content, e.g. the consumer's sanitized inline HTML; default prints label and value. */
	item?: Snippet<[ComparisonCardItem, ComparisonCardColumn]>;
	class?: string;
}
