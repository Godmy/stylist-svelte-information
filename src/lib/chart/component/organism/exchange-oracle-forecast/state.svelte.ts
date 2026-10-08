import { ClassNamesManager } from '$stylist/layout/class/manager/class-names';
import { ManagerExchangeOracleForecast } from '$stylist/chart/class/manager/exchange-oracle-forecast';
import type { RecipeExchangeOracleForecast } from '$stylist/chart/interface/recipe/exchange-oracle-forecast';

export default function createExchangeOracleForecastState(getProps: () => RecipeExchangeOracleForecast) {
	const props = $derived(getProps());
	const className = $derived(ClassNamesManager.merge('exchange-oracle-forecast', props.class));
	const layout = $derived.by(() =>
		ManagerExchangeOracleForecast.createLayout(props.history, props.forecast, {
			width: props.width,
			height: props.height,
			currency: props.currency,
			timeLabelStep: props.timeLabelStep
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
