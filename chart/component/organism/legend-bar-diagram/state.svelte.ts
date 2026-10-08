import { ManagerChartLegendBar } from '$stylist/chart/class/manager/chart-legend-bar';
import { ClassNamesManager } from '$stylist/layout/class/manager/class-names';
import type { RecipeLegendBarDiagram } from '$stylist/chart/interface/recipe/legend-bar-diagram';

export function createLegendBarDiagramState(getProps: () => RecipeLegendBarDiagram) {
	const props = $derived(getProps());
	const className = $derived(ClassNamesManager.merge('legend-bar-diagram', props.class));
	const layout = $derived.by(() =>
		ManagerChartLegendBar.createLayout(
			props.items.map(([text, value]) => ({ text, value })),
			{
				width: props.width,
				height: props.height,
				plotHeight: props.plotHeight,
				labelAreaHeight: props.labelAreaHeight,
				barWidth: props.barWidth,
				color: props.color
			}
		)
	);

	return {
		get className() {
			return className;
		},
		get layout() {
			return layout;
		}
	};
}

export default createLegendBarDiagramState;
