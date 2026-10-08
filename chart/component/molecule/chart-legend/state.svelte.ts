import { ClassNamesManager } from '$stylist/layout/class/manager/class-names';
import type { HTMLAttributes } from 'svelte/elements';
import type { RecipeChartLegend } from '$stylist/chart/interface/recipe/chart-legend';

function resolveClassName(className: unknown): string | undefined {
	return typeof className === 'string' ? className : undefined;
}

export function createChartLegendState(props: RecipeChartLegend & HTMLAttributes<HTMLDivElement>) {
	const classes = $derived(
		ClassNamesManager.merge('c-chart-legend', resolveClassName(props.class))
	);
	const itemClasses = $derived('c-chart-legend__item');
	const dotClasses = $derived('c-chart-legend__dot');

	return {
		get classes() {
			return classes;
		},
		get itemClasses() {
			return itemClasses;
		},
		get dotClasses() {
			return dotClasses;
		}
	};
}

export default createChartLegendState;
