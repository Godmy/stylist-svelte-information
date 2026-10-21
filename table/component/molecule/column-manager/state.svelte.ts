import type { RecipeColumnManager } from '$stylist/table/interface/recipe/column-manager';

export function createColumnManagerState(getProps: () => RecipeColumnManager) {
	const props = $derived(getProps());
	let localColumns = $derived(props.columns.map((column) => ({ ...column })));

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
