import type { RecipeErrorMessage } from '$stylist/notification/interface/recipe/error-message';

export function createErrorMessageState(getProps: () => RecipeErrorMessage) {
	const props = $derived(getProps());
	const error = props.error;
	const text = props.text ?? 'Error';
	const onRetry = props.onRetry;
	const showRetry = props.showRetry ?? true;

	let errorMessage = $state<string | null>(null);

	$effect(() => {
		if (error) {
			errorMessage =
				typeof error === 'string' ? error : error.message || 'An unknown error occurred';
		} else {
			errorMessage = null;
		}
	});

	const containerClasses = $derived(`error-message ${props.class ?? ''}`.trim());

	return {
		error,
		text,
		onRetry,
		showRetry,
		get errorMessage() {
			return errorMessage;
		},
		get containerClasses() {
			return containerClasses;
		},
		titleClasses: 'error-message__title',
		textClasses: 'error-message__text',
		buttonClasses: 'error-message__retry-btn',
		buttonContainerClasses: 'error-message__actions'
	};
}
