import type { RowExpandableProps as ExpandableTableRowProps } from '$stylist/table/type/object/row-expandable-props';

export function createExpandableTableRowState(props: ExpandableTableRowProps) {
	let expanded = $state(props.isExpanded ?? false);

	$effect(() => {
		expanded = props.isExpanded ?? false;
	});

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
