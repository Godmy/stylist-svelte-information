import type { RecipeFilterBar } from '$stylist/table/interface/recipe/filter-bar';

export function createFilterBarState(getProps: () => RecipeFilterBar) {
	const props = $derived(getProps());
	return {
		get searchValue() {
			return props.searchValue ?? '';
		},
		get searchPlaceholder() {
			// Undefined lets FilterText show its own localized placeholder.
			return props.searchPlaceholder;
		},
		get pillGroups() {
			return props.pillGroups ?? [];
		}
	};
}
