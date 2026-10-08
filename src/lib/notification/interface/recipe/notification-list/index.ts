import type { AnyProperty } from '$stylist/layout/type/record/any-property';
import type { ComputeIntersectAll } from '$stylist/theme/type/compute/intersect-all';
import type { NotificationItem } from '$stylist/notification/type/object/notification-item';

export interface RecipeNotificationList extends ComputeIntersectAll<[AnyProperty]> {
	notifications?: NotificationItem[];
	showDismiss?: boolean;
	showTypeIcon?: boolean;
	showTimestamp?: boolean;
	maxVisible?: number;
	onDismiss?: (id: string) => void;
	onNotificationClick?: (notification: NotificationItem) => void;
}
