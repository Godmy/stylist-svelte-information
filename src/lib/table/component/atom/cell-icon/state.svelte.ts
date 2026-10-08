import type { HTMLAttributes } from 'svelte/elements';
import type { RecipeCellIcon } from '$stylist/table/interface/recipe/cell-icon';

export function createCellIconState(getProps: () => RecipeCellIcon & HTMLAttributes<HTMLTableCellElement>) {
	const props = $derived(getProps());
	const icon = $derived(props.icon);
	const label = $derived(props.label ?? '');

	return {
		get icon() {
			return icon;
		},
		get label() {
			return label;
		}
	};
}
