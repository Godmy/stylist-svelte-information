import type { SlotFilterPills } from '$stylist/table/interface/slot/filter-pills';
import type { ComputeIntersectAll } from '$stylist/theme/type/compute/intersect-all';

export interface RecipeFilterBar extends ComputeIntersectAll<
	[
		{
			searchValue?: string;
			searchPlaceholder?: string;
			pillGroups?: Omit<SlotFilterPills, 'onToggle'>[];
			onSearch?: (value: string) => void;
			onTogglePill?: (columnKey: string, value: string) => void;
			class?: string;
		}
	]
> {}
