import type { LayoutHTMLAttributes } from '$stylist/layout/interface/behavior/layout-html-attributes';
import type { ComputeIntersectAll } from '$stylist/theme/type/compute/intersect-all';
import type { Snippet } from 'svelte';

export interface RecipeRowExpandable extends ComputeIntersectAll<
	[
		Omit<LayoutHTMLAttributes<HTMLTableRowElement>, 'class'>,
		{
			expandableContent: Snippet;
			rowContent: Snippet;
			isExpanded?: boolean;
			class?: string;
			cellClass?: string;
			headerCellClass?: string;
			onToggle?: (expanded: boolean) => void;
		}
	]
> {}
