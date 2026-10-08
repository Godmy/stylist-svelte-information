import { ClassNamesManager } from '$stylist/layout/class/manager/class-names';
import type { HTMLAttributes } from 'svelte/elements';
import type { RecipeChartCanvas as ChartCanvasProps } from '$stylist/chart/interface/recipe/chart-canvas';

function resolveClassName(className: unknown): string | undefined {
	return typeof className === 'string' ? className : undefined;
}

export function createChartCanvasState(props: ChartCanvasProps & HTMLAttributes<HTMLDivElement>) {
	const width = $derived(props.width ?? 640);
	const height = $derived(props.height ?? 380);
	const padding = $derived(36);
	const wrapperClasses = $derived(
		ClassNamesManager.merge('c-chart-canvas', resolveClassName(props.class))
	);
	const svgClasses = $derived('c-chart-canvas__svg');

	return {
		get width() {
			return width;
		},
		get height() {
			return height;
		},
		get padding() {
			return padding;
		},
		get wrapperClasses() {
			return wrapperClasses;
		},
		get svgClasses() {
			return svgClasses;
		}
	};
}

export default createChartCanvasState;
