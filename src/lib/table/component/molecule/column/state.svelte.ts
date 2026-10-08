import type { RecipeColumn } from '$stylist/table/interface/recipe/column';
import { PresetCellHeader } from '$stylist/table/const/preset/cell-header';

export function createColumnState(getProps: () => RecipeColumn) {
	const props = $derived(getProps());
	const key = $derived(String(props.schema.key));
	const isCurrentSort = $derived(props.schema.sortable === true && props.currentSortKey === key);
	const sortDirection = $derived(isCurrentSort ? (props.currentSortDirection ?? 'none') : 'none');
	const sortIcon = $derived(
		isCurrentSort && sortDirection !== 'none'
			? PresetCellHeader.ChevronUp
			: PresetCellHeader.ChevronsUpDown
	);

	function handleSort() {
		if (props.schema.sortable) {
			props.onSort?.(key);
		}
	}

	return {
		get key() {
			return key;
		},
		get isCurrentSort() {
			return isCurrentSort;
		},
		get sortDirection() {
			return sortDirection;
		},
		get sortIcon() {
			return sortIcon;
		},
		handleSort
	};
}
