import { ClassNamesManager } from '$stylist/layout/class/manager/class-names';
import type { RecipeChartLegendBand } from '$stylist/chart/interface/recipe/chart-legend-band';

export default function createChartLegendBandState(getProps: () => RecipeChartLegendBand) {
	const props = $derived(getProps());
	const className = $derived(ClassNamesManager.merge('chart-legend-band', props.class));
	const labelText = $derived(props.text ?? '');
	const valueLabel = $derived(props.valueLabel ?? String(props.value));

	return {
		get className() {
			return className;
		},
		get labelText() {
			return labelText;
		},
		get valueLabel() {
			return valueLabel;
		}
	};
}
