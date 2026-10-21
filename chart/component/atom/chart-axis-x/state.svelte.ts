import { ClassNamesManager } from '$stylist/layout/class/manager/class-names';
import type { RecipeChartAxisX } from '$stylist/chart/interface/recipe/chart-axis-x';

function resolveClassName(className: unknown): string | undefined {
	return typeof className === 'string' ? className : undefined;
}

export function createChartAxisXState(getProps: () => RecipeChartAxisX) {
	const props = $derived(getProps());
	const axisClasses = $derived(
		ClassNamesManager.merge('c-chart-axis', resolveClassName(props.class))
	);
	const gridClasses = $derived('c-chart-axis__grid');
	const labelClasses = $derived('c-chart-axis__label');

	return {
		get axisClasses() {
			return axisClasses;
		},
		get gridClasses() {
			return gridClasses;
		},
		get labelClasses() {
			return labelClasses;
		}
	};
}

export default createChartAxisXState;
