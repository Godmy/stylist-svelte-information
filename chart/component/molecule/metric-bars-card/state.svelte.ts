import type { RecipeMetricBarsCard } from '$stylist/chart/interface/recipe/metric-bars-card';

export function createMetricBarsCardState(getProps: () => RecipeMetricBarsCard) {
	const props = $derived(getProps());
	const text = $derived(props.text ?? '');
	const caption = $derived(props.description);
	const total = $derived(props.total);
	const bars = $derived(props.bars ?? []);
	const color = $derived(props.color ?? 'var(--color-primary-500)');
	const trackColor = $derived(props.trackColor ?? 'var(--color-neutral-200)');
	const containerClasses = $derived(
		['metric-bars-card', typeof props.class === 'string' ? props.class : '']
			.filter(Boolean)
			.join(' ')
	);
	const headerClasses = $derived('metric-bars-card__header');
	const titleClasses = $derived('metric-bars-card__title');
	const captionClasses = $derived('metric-bars-card__caption');
	const totalClasses = $derived('metric-bars-card__total');
	const barsClasses = $derived('metric-bars-card__bars');
	const restProps = $derived.by(() => {
		const {
			class: _class,
			text: _text,
			description: _description,
			total: _total,
			bars: _bars,
			color: _color,
			trackColor: _trackColor,
			...rest
		} = props;
		return rest;
	});

	return {
		get text() {
			return text;
		},
		get caption() {
			return caption;
		},
		get total() {
			return total;
		},
		get bars() {
			return bars;
		},
		get color() {
			return color;
		},
		get trackColor() {
			return trackColor;
		},
		get containerClasses() {
			return containerClasses;
		},
		get headerClasses() {
			return headerClasses;
		},
		get titleClasses() {
			return titleClasses;
		},
		get captionClasses() {
			return captionClasses;
		},
		get totalClasses() {
			return totalClasses;
		},
		get barsClasses() {
			return barsClasses;
		},
		get restProps() {
			return restProps;
		}
	};
}

export default createMetricBarsCardState;
