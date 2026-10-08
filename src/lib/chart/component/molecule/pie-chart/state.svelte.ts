import { ClassNamesManager } from '$stylist/layout/class/manager/class-names';
import { ManagerPieChart } from '$stylist/chart/class/manager/pie-chart';
import type { RecipePieChart } from '$stylist/chart/interface/recipe/pie-chart';

export function createPieChartState(getProps: () => RecipePieChart) {
	const props = $derived(getProps());
	const data = $derived((props as any).data ?? []);
	const width = $derived((props as any).width ?? 200);
	const height = $derived((props as any).height ?? 200);
	const colors = $derived((props as any).colors);
	const classNameStr = $derived(props.class == null ? undefined : String(props.class));
	const resolvedColors = $derived(ManagerPieChart.resolveColors(colors));
	const total = $derived(ManagerPieChart.resolveTotal(data));
	const segments = $derived(ManagerPieChart.resolveSegments(data, total, resolvedColors));
	const containerClasses = $derived(ClassNamesManager.merge('c-pie-chart', classNameStr));
	const legendClasses = $derived('c-pie-chart__legend');
	const legendItemClasses = $derived('c-pie-chart__legend-item');
	const legendSwatchClasses = $derived('c-pie-chart__legend-swatch');
	const legendTextClasses = $derived('c-pie-chart__legend-text');
	const restProps = $derived.by(() => {
		const {
			class: _class,
			data: _data,
			width: _width,
			height: _height,
			colors: _colors,
			...rest
		} = props;
		return rest;
	});

	return {
		get data() {
			return data;
		},
		get width() {
			return width;
		},
		get height() {
			return height;
		},
		get colors() {
			return colors;
		},
		get resolvedColors() {
			return resolvedColors;
		},
		get total() {
			return total;
		},
		get segments() {
			return segments;
		},
		get containerClasses() {
			return containerClasses;
		},
		get legendClasses() {
			return legendClasses;
		},
		get legendItemClasses() {
			return legendItemClasses;
		},
		get legendSwatchClasses() {
			return legendSwatchClasses;
		},
		get legendTextClasses() {
			return legendTextClasses;
		},
		get restProps() {
			return restProps;
		}
	};
}

export default createPieChartState;
