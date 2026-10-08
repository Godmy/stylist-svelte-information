import { ClassNamesManager } from '$stylist/layout/class/manager/class-names';
import { ManagerOutlierConstellation } from '$stylist/chart/class/manager/outlier-constellation';
import type { RecipeOutlierConstellation } from '$stylist/chart/interface/recipe/outlier-constellation';

export default function createOutlierConstellationState(getProps: () => RecipeOutlierConstellation) {
	const props = $derived(getProps());
	const className = $derived(ClassNamesManager.merge('outlier-constellation', props.class));
	const layout = $derived.by(() =>
		ManagerOutlierConstellation.createLayout(props.points, {
			width: props.width,
			height: props.height
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
