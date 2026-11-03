import type { RecipeComparisonCard } from '$stylist/table/interface/recipe/comparison-card';

export function createComparisonCardState(getProps: () => RecipeComparisonCard) {
	const props = $derived(getProps());
	const headingLevel = $derived(props.headingLevel ?? 3);
	const restProps = $derived.by(() => {
		const {
			title: _title,
			headingLevel: _headingLevel,
			columns: _columns,
			item: _item,
			class: _class,
			...rest
		} = props;
		return rest;
	});

	return {
		get rootClass() {
			return ['table-comparison-card', props.class].filter(Boolean).join(' ');
		},
		get headingLevel() {
			return headingLevel;
		},
		/** Column titles sit one level below the card title. */
		get columnLevel() {
			return (headingLevel + 1) as 3 | 4 | 5 | 6;
		},
		get restProps() {
			return restProps;
		}
	};
}

export default createComparisonCardState;
