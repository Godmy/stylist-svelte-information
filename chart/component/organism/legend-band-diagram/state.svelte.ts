import { ManagerChartLegendBand } from '$stylist/chart/class/manager/chart-legend-band';
import { ClassNamesManager } from '$stylist/layout/class/manager/class-names';
import type { RecipeLegendBandDiagram } from '$stylist/chart/interface/recipe/legend-band-diagram';

export default function createLegendBandDiagramState(getProps: () => RecipeLegendBandDiagram) {
	const props = $derived(getProps());
	const className = $derived(ClassNamesManager.merge('legend-band-diagram', props.class));
	const layout = $derived.by(() =>
		ManagerChartLegendBand.createLayout(props.items, {
			width: props.width,
			height: props.height,
			plotHeight: props.plotHeight,
			labelAreaHeight: props.labelAreaHeight,
			bandWidth: props.bandWidth,
			minValue: props.minValue,
			maxValue: props.maxValue,
			tickCount: props.tickCount,
			color: props.color
		})
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
