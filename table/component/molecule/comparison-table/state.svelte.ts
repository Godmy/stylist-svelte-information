import type { RecipeComparisonTable } from '$stylist/table/interface/recipe/comparison-table';

export function createComparisonTableState(getProps: () => RecipeComparisonTable) {
	const props = $derived(getProps());
	const containerClass = $derived(['c-comparison-table', props.class].filter(Boolean).join(' '));
	const headerClass = $derived(
		['c-comparison-table__head', props.headerClass, (props.showHeader ?? true) ? '' : 'sr-only']
			.filter(Boolean)
			.join(' ')
	);
	const featureClass = $derived(
		['c-comparison-table__feature-cell', props.featureClass].filter(Boolean).join(' ')
	);
	const productClass = $derived(
		['c-comparison-table__product', props.productClass].filter(Boolean).join(' ')
	);
	const valueClass = $derived(
		['c-comparison-table__value-cell', props.valueClass].filter(Boolean).join(' ')
	);
	const primaryProductClass = $derived(
		['c-comparison-table__product--primary', props.primaryProductClass].filter(Boolean).join(' ')
	);
	const features = $derived(props.features ?? []);
	const products = $derived(props.products ?? []);
	const featureColumnLabel = $derived(props.featureColumnLabel ?? 'Features');
	const showHeader = $derived(props.showHeader ?? true);
	const showDescription = $derived(props.showDescription ?? false);

	return {
		get containerClass() {
			return containerClass;
		},
		get headerClass() {
			return headerClass;
		},
		get featureClass() {
			return featureClass;
		},
		get productClass() {
			return productClass;
		},
		get valueClass() {
			return valueClass;
		},
		get primaryProductClass() {
			return primaryProductClass;
		},
		get features() {
			return features;
		},
		get products() {
			return products;
		},
		get featureColumnLabel() {
			return featureColumnLabel;
		},
		get showHeader() {
			return showHeader;
		},
		get showDescription() {
			return showDescription;
		}
	};
}
