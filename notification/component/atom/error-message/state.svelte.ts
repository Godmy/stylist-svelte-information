import type { RecipeErrorMessage } from '$stylist/notification/interface/recipe/error-message';

export function createErrorMessageState(getProps: () => RecipeErrorMessage) {
	const props = $derived(getProps());
	const error = $derived(props.error);
	const text = $derived(props.text ?? 'Error');
	const showRetry = $derived(props.showRetry ?? true);

	const errorMessage = $derived<string | null>(
		error
			? typeof error === 'string'
				? error
				: error.message || 'An unknown error occurred'
			: null
	);

	const containerClasses = $derived(`error-message ${props.class ?? ''}`.trim());

	return {
		get error() {
			return error;
		},
		get text() {
			return text;
		},
		get onRetry() {
			return props.onRetry;
		},
		get showRetry() {
			return showRetry;
		},
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
