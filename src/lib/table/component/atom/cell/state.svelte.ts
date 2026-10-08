import type { HTMLAttributes } from 'svelte/elements';
import type { RecipeCell } from '$stylist/table/interface/recipe/cell';
import { TABLE_ALIGNMENT_CLASSES } from '$stylist/table/const/record/table-alignment-classes';

export function createCellState(getProps: () => RecipeCell & HTMLAttributes<HTMLTableCellElement>) {
	const props = $derived(getProps());
	const variant = $derived(props.variant ?? 'data');
	const align = $derived((props.align ?? 'left') as 'left' | 'center' | 'right');
	const alignClass = $derived(
		(TABLE_ALIGNMENT_CLASSES[align] ?? TABLE_ALIGNMENT_CLASSES['left'])[0] ?? ''
	);

	return {
		get variant() {
			return variant;
		},
		get align() {
			return align;
		},
		get alignClass() {
			return alignClass;
		}
	};
}
