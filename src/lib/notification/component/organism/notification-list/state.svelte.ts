import { ClassNamesManager } from '$stylist/layout/class/manager/class-names';
import { TOKEN_COLOR_TONE_ICON } from '$stylist/theme/const/map/color-tone-icon';
import type { RecipeNotificationList } from '$stylist/notification/interface/recipe/notification-list';
import type { NotificationItem } from '$stylist/notification/type/object/notification-item';

export function createNotificationListState(getProps: () => RecipeNotificationList) {
	const props = $derived(getProps());
	const showDismiss = $derived(props.showDismiss ?? true);
	const showTypeIcon = $derived(props.showTypeIcon ?? true);
	const showTimestamp = $derived(props.showTimestamp ?? true);
	const maxVisible = $derived(props.maxVisible ?? 5);
	const className = $derived(props.class ?? '');

	const notifications = $derived((props.notifications ?? []).slice(0, maxVisible));

	const containerClasses = $derived(ClassNamesManager.merge('notification-list', className));

	const restProps = $derived.by(() => {
		const {
			class: _class,
			notifications: _notifications,
			showDismiss: _showDismiss,
			showTypeIcon: _showTypeIcon,
			showTimestamp: _showTimestamp,
			maxVisible: _maxVisible,
			onDismiss: _onDismiss,
			onNotificationClick: _onNotificationClick,
			...rest
		} = props;
		return rest;
	});

	function getTypeIcon(type: NotificationItem['type']) {
		return TOKEN_COLOR_TONE_ICON[type ?? 'info'] ?? TOKEN_COLOR_TONE_ICON.info;
	}

	function getTypeClass(type: NotificationItem['type']) {
		return `notification-list__item-icon notification-list__item-icon--${type ?? 'info'}`;
	}

	function handleNotificationClick(notification: NotificationItem) {
		props.onNotificationClick?.(notification);
	}

	function handleDismiss(event: MouseEvent, id: string) {
		event.stopPropagation();
		props.onDismiss?.(id);
	}

	return {
		get notifications() {
			return notifications;
		},
		get showDismiss() {
			return showDismiss;
		},
		get showTypeIcon() {
			return showTypeIcon;
		},
		get showTimestamp() {
			return showTimestamp;
		},
		get containerClasses() {
			return containerClasses;
		},
		get restProps() {
			return restProps;
		},
		getTypeIcon,
		getTypeClass,
		handleNotificationClick,
		handleDismiss
	};
}

export default createNotificationListState;
