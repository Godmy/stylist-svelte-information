import { ClassNamesManager } from '$stylist/layout/class/manager/class-names';
/** AREA: STYLIST CODER MODEL -> AUTO-GENERATED */
import type { RecipeCanvasChart } from '$stylist/chart/interface/recipe/canvas-chart';

export function createCanvasChartState(getProps: () => RecipeCanvasChart) {
	const props = $derived(getProps());
	const width = $derived(props.width ?? 800);
	const height = $derived(props.height ?? 600);
	const data = $derived(props.data ?? []);
	const type = $derived((props.type ?? 'line') as 'line' | 'bar' | 'scatter' | 'area');
	const title = $derived(props.title ?? '');
	const showGrid = $derived(props.showGrid ?? true);
	const colors = $derived(props.colors ?? ['#3b82f6', '#10b981', '#f59e0b', '#ef4444']);

	const canvasClasses = $derived(ClassNamesManager.merge('c-canvas-chart__canvas', props.class));
	const containerClasses = $derived('c-canvas-chart');

	const restProps = $derived.by(() => {
		const {
			class: _class,
			width: _width,
			height: _height,
			data: _data,
			type: _type,
			title: _title,
			showGrid: _showGrid,
			colors: _colors,
			xAxisLabel: _xAxisLabel,
			yAxisLabel: _yAxisLabel,
			children: _children,
			...rest
		} = props;
		return rest;
	});

	return {
		get width() {
			return width;
		},
		get height() {
			return height;
		},
		get data() {
			return data;
		},
		get type() {
			return type;
		},
		get title() {
			return title;
		},
		get showGrid() {
			return showGrid;
		},
		get colors() {
			return colors;
		},
		get canvasClasses() {
			return canvasClasses;
		},
		get containerClasses() {
			return containerClasses;
		},
		get restProps() {
			return restProps;
		}
	};
}

export default createCanvasChartState;
