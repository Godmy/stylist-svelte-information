import type { SlotColumnManager as ColumnManagerProps } from '$stylist/table/interface/slot/column-manager';

export function createColumnManagerState(getProps: () => ColumnManagerProps) {
	const props = $derived(getProps());
	let localColumns = $state(props.columns.map((column) => ({ ...column })));

	$effect(() => {
		localColumns = props.columns.map((column) => ({ ...column }));
	});

	function emit(nextColumns: Array<(typeof props.columns)[number]>) {
		localColumns = nextColumns.map((column) => ({ ...column }));
		props.onColumnsChange?.(nextColumns.map((column) => ({ ...column })));
	}

	function toggle(index: number) {
		emit(
			localColumns.map((column, currentIndex) =>
				currentIndex === index ? { ...column, visible: !column.visible } : column
			)
		);
	}

	function move(from: number, to: number) {
		const nextColumns = [...localColumns];
		const [movedColumn] = nextColumns.splice(from, 1);
		nextColumns.splice(to, 0, movedColumn);
		emit(nextColumns);
	}

	function reset() {
		emit(props.columns.map((column) => ({ ...column, visible: true })));
	}

	return {
		get localColumns() {
			return localColumns;
		},
		emit,
		toggle,
		move,
		reset
	};
}
