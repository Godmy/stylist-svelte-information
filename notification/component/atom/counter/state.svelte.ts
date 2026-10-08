import type { RecipeCounter } from '$stylist/notification/interface/recipe/counter';

export function createCounterState(getProps: () => RecipeCounter) {
	const props = $derived(getProps());
	const count = $derived(props.count ?? 0);
	const max = $derived(props.max ?? 99);
	const variant = $derived(props.variant ?? 'primary');
	const size = $derived(props.size ?? 'md');
	const className = $derived(typeof props.class === 'string' ? props.class : undefined);
	const sizeClass = $derived(`counter--${String(size).replaceAll('/', '-')}`);
	const classes = $derived(
		['counter', `counter--${variant}`, sizeClass, className].filter(Boolean).join(' ')
	);
	const displayCount = $derived(count > max ? `${max}+` : count);

	return {
		get count() {
			return count;
		},
		get max() {
			return max;
		},
		get variant() {
			return variant;
		},
		get size() {
			return size;
		},
		get classes() {
			return classes;
		},
		get displayCount() {
			return displayCount;
		}
	};
}

export default createCounterState;
