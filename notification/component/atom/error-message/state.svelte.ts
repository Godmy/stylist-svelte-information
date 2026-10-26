import { NOTIFICATION_ERROR_MESSAGE_MESSAGE } from '$stylist/notification/const/record/error-message-message';
import { useMessage } from '$stylist/localization/function/hook/use-message';
import type { RecipeErrorMessage } from '$stylist/notification/interface/recipe/error-message';

export function createErrorMessageState(getProps: () => RecipeErrorMessage) {
	const props = $derived(getProps());
	const t = useMessage('error-message', NOTIFICATION_ERROR_MESSAGE_MESSAGE);
	const error = $derived(props.error);
	const text = $derived(props.text ?? t('title'));
	const showRetry = $derived(props.showRetry ?? true);

	const errorMessage = $derived<string | null>(
		error ? (typeof error === 'string' ? error : error.message || t('unknown')) : null
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
		get retryText() {
			return t('retry');
		},
		get retryLabel() {
			return t('retryLabel');
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
