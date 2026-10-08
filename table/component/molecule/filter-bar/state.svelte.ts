import type { RecipeFilterBar } from '$stylist/table/interface/recipe/filter-bar';

export function createFilterBarState(getProps: () => RecipeFilterBar) {
	const props = $derived(getProps());
	return {
		get searchValue() {
			return props.searchValue ?? '';
		},
		get searchPlaceholder() {
			return props.searchPlaceholder ?? 'Search...';
		},
		get pillGroups() {
			return props.pillGroups ?? [];
		}
	};
}
