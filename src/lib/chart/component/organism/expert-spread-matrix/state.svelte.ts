import { ClassNamesManager } from '$stylist/layout/class/manager/class-names';
import { ManagerExpertSpreadMatrix } from '$stylist/chart/class/manager/expert-spread-matrix';
import type { RecipeExpertSpreadMatrix } from '$stylist/chart/interface/recipe/expert-spread-matrix';

export default function createExpertSpreadMatrixState(getProps: () => RecipeExpertSpreadMatrix) {
	const props = $derived(getProps());
	const className = $derived(ClassNamesManager.merge('expert-spread-matrix', props.class));
	const layout = $derived.by(() =>
		ManagerExpertSpreadMatrix.createLayout(props.experts, props.periods, props.values, {
			width: props.width,
			cellSize: props.cellSize,
			minValue: props.minValue,
			maxValue: props.maxValue
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
