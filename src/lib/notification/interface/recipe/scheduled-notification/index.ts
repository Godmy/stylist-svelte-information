import type { AnyProperty } from '$stylist/layout/type/record/any-property';
import type { ComputeIntersectAll } from '$stylist/theme/type/compute/intersect-all';
import type { ScheduledNotificationItem } from '$stylist/notification/type/object/scheduled-notification-item';

export interface RecipeScheduledNotification extends ComputeIntersectAll<[AnyProperty]> {
	notifications?: ScheduledNotificationItem[];
	showEditButton?: boolean;
	showDeleteButton?: boolean;
	showRecurrence?: boolean;
	allowReorder?: boolean;
	onEdit?: (notification: ScheduledNotificationItem) => void;
	onDelete?: (id: string) => void;
	onToggle?: (id: string) => void;
}
