import type { SlotFilterPills } from '$stylist/table/interface/slot/filter-pills';
export interface SlotFilterBar {
	searchValue?: string;
	searchPlaceholder?: string;
	pillGroups?: Omit<SlotFilterPills, 'onToggle'>[];
	onSearch?: (value: string) => void;
	onTogglePill?: (columnKey: string, value: string) => void;
	class?: string;
}
