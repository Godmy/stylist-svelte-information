import type { HTMLAttributes } from 'svelte/elements';
import type { RecipeCellText } from '$stylist/table/interface/recipe/cell-text';
import { TABLE_ALIGNMENT_CLASSES } from '$stylist/table/const/record/table-alignment-classes';

export function createCellTextState(getProps: () => RecipeCellText & HTMLAttributes<HTMLTableCellElement>) {
	const props = $derived(getProps());
	const displayValue = $derived(props.value != null ? String(props.value) : '—');
	const alignClass = $derived(
		(TABLE_ALIGNMENT_CLASSES[props.align ?? 'left'] ?? TABLE_ALIGNMENT_CLASSES['left'])[0] ?? ''
	);

	return {
		get displayValue() {
			return displayValue;
		},
		get alignClass() {
			return alignClass;
		}
	};
}
