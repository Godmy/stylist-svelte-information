import { ClassNamesManager } from '$stylist/layout/class/manager/class-names';
import type { SVGAttributes } from 'svelte/elements';
import type { RecipeChartName as ChartNameProps } from '$stylist/chart/interface/recipe/chart-name';

function resolveClassName(className: unknown): string | undefined {
	return typeof className === 'string' ? className : undefined;
}

export function createChartNameState(getProps: () => ChartNameProps & SVGAttributes<SVGTextElement>) {
	const props = $derived(getProps());
	const classes = $derived(ClassNamesManager.merge('c-chart-name', resolveClassName(props.class)));

	return {
		get classes() {
			return classes;
		}
	};
}

export default createChartNameState;
