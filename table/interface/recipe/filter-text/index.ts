import type { ComputeIntersectAll } from '$stylist/theme/type/compute/intersect-all';

export interface RecipeFilterText extends ComputeIntersectAll<
	[
		{
			value?: string;
			placeholder?: string;
			onSearch?: (value: string) => void;
			class?: string;
		}
	]
> {}
