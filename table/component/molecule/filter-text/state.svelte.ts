import type { RecipeFilterText } from '$stylist/table/interface/recipe/filter-text';

export function createFilterTextState(getProps: () => RecipeFilterText) {
	const props = $derived(getProps());
	let value = $state(props.value ?? '');

	$effect(() => {
		value = props.value ?? '';
	});

	const handleInput = (e: Event) => {
		value = (e.target as HTMLInputElement).value;
		props.onSearch?.(value);
	};

	return {
		get value() {
			return value;
		},
		handleInput
	};
}
