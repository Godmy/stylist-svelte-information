import type { RecipeRowExpandable } from '$stylist/table/interface/recipe/row-expandable';

export function createExpandableTableRowState(getProps: () => RecipeRowExpandable) {
	const props = $derived(getProps());
	let expanded = $derived(props.isExpanded ?? false);

	function toggleExpanded() {
		expanded = !expanded;
		props.onToggle?.(expanded);
	}

	return {
		get expanded() {
			return expanded;
		},
		toggleExpanded
	};
}
