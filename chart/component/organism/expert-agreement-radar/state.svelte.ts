import { ClassNamesManager } from '$stylist/layout/class/manager/class-names';
import { ManagerExpertAgreementRadar } from '$stylist/chart/class/manager/expert-agreement-radar';
import type { RecipeExpertAgreementRadar } from '$stylist/chart/interface/recipe/expert-agreement-radar';

export default function createExpertAgreementRadarState(getProps: () => RecipeExpertAgreementRadar) {
	const props = $derived(getProps());
	const className = $derived(ClassNamesManager.merge('expert-agreement-radar', props.class));
	const layout = $derived.by(() =>
		ManagerExpertAgreementRadar.createLayout(props.axes, {
			width: props.width,
			height: props.height,
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
