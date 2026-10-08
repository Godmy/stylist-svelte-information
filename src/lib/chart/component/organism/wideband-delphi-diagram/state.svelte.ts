import { ClassNamesManager } from '$stylist/layout/class/manager/class-names';
import { ManagerWidebandDelphiDiagram } from '$stylist/chart/class/manager/wideband-delphi-diagram';
import type { RecipeWidebandDelphiDiagram } from '$stylist/chart/interface/recipe/wideband-delphi-diagram';

export default function createWidebandDelphiDiagramState(getProps: () => RecipeWidebandDelphiDiagram) {
	const props = $derived(getProps());
	const className = $derived(ClassNamesManager.merge('wideband-delphi-diagram', props.class));
	const layout = $derived.by(() =>
		ManagerWidebandDelphiDiagram.createLayout(props.points, {
			width: props.width,
			height: props.height,
			minValue: props.minValue,
			maxValue: props.maxValue,
			timeLabelStep: props.timeLabelStep,
			currency: props.currency
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
