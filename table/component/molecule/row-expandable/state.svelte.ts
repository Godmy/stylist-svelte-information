import type { RowExpandableProps as ExpandableTableRowProps } from '$stylist/table/type/object/row-expandable-props';

export function createExpandableTableRowState(getProps: () => ExpandableTableRowProps) {
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
