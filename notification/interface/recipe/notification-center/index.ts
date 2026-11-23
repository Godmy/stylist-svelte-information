import type { HTMLAttributes } from 'svelte/elements';
import type { ComputeIntersectAll } from '$stylist/theme/type/compute/intersect-all';
import type { NotificationItem } from '$stylist/notification/type/object/notification-item';

export interface RecipeNotificationCenter extends ComputeIntersectAll<
	[HTMLAttributes<HTMLDivElement>]
> {
	notifications?: NotificationItem[];
	showUnreadCount?: boolean;
	showMarkAllRead?: boolean;
	showClearAll?: boolean;
	showTimestamp?: boolean;
	pollingInterval?: number;
	onNotificationClick?: (notification: NotificationItem) => void;
	onMarkAllRead?: () => void;
	onClearAll?: () => void;
	onFetchMore?: () => void;
}
