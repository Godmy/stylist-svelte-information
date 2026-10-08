import type { RecipeListItemMarker } from '$stylist/list/interface/recipe/list-item-marker';

export function createListItemMarkerState(getProps: () => RecipeListItemMarker) {
	const props = $derived(getProps());
	const type = $derived(props.type ?? 'bullet');
	const value = $derived(props.value ?? '');
	const color = $derived(props.color ?? 'gray');
	const size = $derived(props.size ?? 'md');
	const className = $derived(typeof props.class === 'string' ? props.class : undefined);
	const sizeClass = $derived(`list-item-marker--${String(size).replaceAll('/', '-')}`);
	const classes = $derived(
		['list-item-marker', `list-item-marker--${color}`, sizeClass, className]
			.filter(Boolean)
			.join(' ')
	);
	const bulletClasses = $derived(
		`list-item-marker__bullet list-item-marker__bullet--${String(size).replaceAll('/', '-')}`
	);

	return {
		get type() {
			return type;
		},
		get value() {
			return value;
		},
		get color() {
			return color;
		},
		get size() {
			return size;
		},
		get classes() {
			return classes;
		},
		get bulletClasses() {
			return bulletClasses;
		}
	};
}

export default createListItemMarkerState;
