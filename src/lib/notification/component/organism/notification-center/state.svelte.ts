import { ClassNamesManager } from '$stylist/layout/class/manager/class-names';
import { TOKEN_COLOR_TONE_ICON } from '$stylist/theme/const/map/color-tone-icon';
import type { RecipeNotificationCenter } from '$stylist/notification/interface/recipe/notification-center';
import type { NotificationItem } from '$stylist/notification/type/object/notification-item';

export function createNotificationCenterState(getProps: () => RecipeNotificationCenter) {
	const props = $derived(getProps());
	const notifications = $derived(props.notifications ?? []);
	const showUnreadCount = $derived(props.showUnreadCount ?? true);
	const showMarkAllRead = $derived(props.showMarkAllRead ?? true);
	const showClearAll = $derived(props.showClearAll ?? true);
	const showTimestamp = $derived(props.showTimestamp ?? true);
	const pollingInterval = $derived(props.pollingInterval);
	const className = $derived(props.class ?? '');

	const unread = $derived(notifications.filter((n) => !n.read).length);
	const canMarkAllRead = $derived(showMarkAllRead && Boolean(props.onMarkAllRead) && unread > 0);
	const canClearAll = $derived(showClearAll && Boolean(props.onClearAll) && notifications.length > 0);
	const canFetchMore = $derived(Boolean(props.onFetchMore));

	const containerClasses = $derived(
		ClassNamesManager.merge('notification-center', className)
	);

	const restProps = $derived.by(() => {
		const {
			class: _class,
			notifications: _notifications,
			showUnreadCount: _showUnreadCount,
			showMarkAllRead: _showMarkAllRead,
			showClearAll: _showClearAll,
			showTimestamp: _showTimestamp,
			pollingInterval: _pollingInterval,
			onNotificationClick: _onNotificationClick,
			onMarkAllRead: _onMarkAllRead,
			onClearAll: _onClearAll,
			onFetchMore: _onFetchMore,
			...rest
		} = props;
		return rest;
	});

	$effect(() => {
		const interval = pollingInterval;
		const fetchMore = props.onFetchMore;
		if (!interval || !fetchMore) return;
		const timer = setInterval(fetchMore, interval);
		return () => clearInterval(timer);
	});

	function getTypeIcon(type: NotificationItem['type']) {
		return TOKEN_COLOR_TONE_ICON[type ?? 'info'] ?? TOKEN_COLOR_TONE_ICON.info;
	}

	function handleNotificationClick(notification: NotificationItem) {
		props.onNotificationClick?.(notification);
	}

	function handleMarkAllRead() {
		props.onMarkAllRead?.();
	}

	function handleClearAll() {
		props.onClearAll?.();
	}

	function handleFetchMore() {
		props.onFetchMore?.();
	}

	return {
		get notifications() {
			return notifications;
		},
		get showUnreadCount() {
			return showUnreadCount;
		},
		get showTimestamp() {
			return showTimestamp;
		},
		get unread() {
			return unread;
		},
		get canMarkAllRead() {
			return canMarkAllRead;
		},
		get canClearAll() {
			return canClearAll;
		},
		get canFetchMore() {
			return canFetchMore;
		},
		get containerClasses() {
			return containerClasses;
		},
		get restProps() {
			return restProps;
		},
		getTypeIcon,
		handleNotificationClick,
		handleMarkAllRead,
		handleClearAll,
		handleFetchMore
	};
}

export default createNotificationCenterState;
