import { ClassNamesManager } from '$stylist/layout/class/manager/class-names';
import type { RecipeRangeBarsChart } from '$stylist/chart/interface/recipe/range-bars-chart';

export function createRangeBarsChartState(getProps: () => RecipeRangeBarsChart) {
	const props = $derived(getProps());
	const className = $derived(ClassNamesManager.merge('range-bars-chart', props.class));
	const items = $derived(props.items);
	const labelWidth = $derived(props.labelWidth ?? '11rem');
	const valueWidth = $derived(props.valueWidth ?? '8rem');

	function selectItem(itemId: string): void {
		props.onSelectItem?.(itemId);
	}

	return {
		get className() {
			return className;
		},
		get items() {
			return items;
		},
		get labelWidth() {
			return labelWidth;
		},
		get valueWidth() {
			return valueWidth;
		},
		selectItem
	};
}

export default createRangeBarsChartState;
