import { TOKEN_COLOR_TONE_ICON } from '$stylist/theme/const/map/color-tone-icon';
import type { TokenColorTone } from '$stylist/design-token/type/alias/color-tone';
import { NOTIFICATION_TOAST_STACK_MESSAGE } from '$stylist/notification/const/record/toast-stack-message';
import { useMessage } from '$stylist/localization/function/hook/use-message';
import type { RecipeToastStack } from '$stylist/notification/interface/recipe/toast-stack';

export function createToastStackState(getProps: () => RecipeToastStack) {
	const props = $derived(getProps());
	const t = useMessage('toast-stack', NOTIFICATION_TOAST_STACK_MESSAGE);
	const position = $derived(props.position ?? 'bottom-right');
	const maxToasts = $derived(props.maxToasts ?? 5);
	const toasts = $derived(props.toasts ?? []);
	const dismissAllLabel = $derived(props.dismissAllLabel ?? t('dismissAll'));
	const canDismissAll = $derived(Boolean(props.onDismissAll) && toasts.length > 1);

	const containerClasses = $derived(
		`toast-stack toast-stack--${position} ${props.class ?? ''}`.trim()
	);
	const restProps = $derived.by(() => {
		const {
			class: _class,
			toasts: _toasts,
			position: _position,
			maxToasts: _maxToasts,
			onDismissAll: _onDismissAll,
			dismissAllLabel: _dismissAllLabel,
			toastClass: _toastClass,
			...rest
		} = props;
		return rest;
	});

	function getToastColor(type: TokenColorTone) {
		return `toast-item toast-item--${type}`;
	}

	function getToastIcon(type: TokenColorTone) {
		return TOKEN_COLOR_TONE_ICON[type];
	}

	function getToastIconColor(type: TokenColorTone) {
		return `toast-item__icon toast-item__icon--${type}`;
	}

	return {
		get containerClasses() {
			return containerClasses;
		},
		get toasts() {
			return toasts;
		},
		get maxToasts() {
			return maxToasts;
		},
		get dismissAllLabel() {
			return dismissAllLabel;
		},
		get dismissLabel() {
			return t('dismiss');
		},
		get canDismissAll() {
			return canDismissAll;
		},
		get restProps() {
			return restProps;
		},
		getToastColor,
		getToastIcon,
		getToastIconColor,
		X: 'x' as const
	};
}
