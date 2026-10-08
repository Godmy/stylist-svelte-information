import type { RecipeAudioSlider } from '$stylist/audio/interface/recipe/audio-slider';

export function createAudioSliderState(getProps: () => RecipeAudioSlider) {
	const props = $derived(getProps());
	let localValue = $state(props.value ?? 0);

	$effect(() => {
		localValue = props.value ?? 0;
	});

	const min = $derived(props.min ?? 0);
	const max = $derived(props.max ?? 100);
	const step = $derived(props.step ?? 1);
	const label = $derived(props.label ?? '');
	const showValue = $derived(props.showValue ?? true);
	const className = $derived(props.class ?? '');

	const restProps = $derived.by(() => {
		const {
			class: _class,
			value: _value,
			min: _min,
			max: _max,
			step: _step,
			label: _label,
			showValue: _showValue,
			...rest
		} = props;
		return rest;
	});

	return {
		get value() {
			return localValue;
		},
		set value(v: number) {
			localValue = v;
		},
		get min() {
			return min;
		},
		get max() {
			return max;
		},
		get step() {
			return step;
		},
		get label() {
			return label;
		},
		get showValue() {
			return showValue;
		},
		get className() {
			return className;
		},
		get restProps() {
			return restProps;
		}
	};
}
