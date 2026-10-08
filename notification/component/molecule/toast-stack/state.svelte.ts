import { TOKEN_COLOR_TONE_ICON } from '$stylist/theme/const/map/color-tone-icon';
import type { TokenColorTone } from '$stylist/theme/type/alias/color-tone';
import type { RecipeToastStack } from '$stylist/notification/interface/recipe/toast-stack';

export function createToastStackState(getProps: () => RecipeToastStack) {
	const props = $derived(getProps());
	const position = $derived(props.position ?? 'bottom-right');
	const maxToasts = $derived(props.maxToasts ?? 5);
	const toasts = $derived(props.toasts ?? []);
	const dismissAllLabel = $derived(props.dismissAllLabel ?? 'Dismiss all');
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
