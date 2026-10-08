import { ClassNamesManager } from '$stylist/layout/class/manager/class-names';
import type { RecipeScheduledNotification } from '$stylist/notification/interface/recipe/scheduled-notification';
import type { ScheduledNotificationItem } from '$stylist/notification/type/object/scheduled-notification-item';

const RECURRENCE_LABEL: Record<ScheduledNotificationItem['recurrence'], string> = {
	daily: 'Daily',
	weekly: 'Weekly',
	monthly: 'Monthly',
	once: 'One-time'
};

export function createScheduledNotificationState(getProps: () => RecipeScheduledNotification) {
	const props = $derived(getProps());
	const notifications = $derived(props.notifications ?? []);
	const showEditButton = $derived(props.showEditButton ?? true);
	const showDeleteButton = $derived(props.showDeleteButton ?? true);
	const showRecurrence = $derived(props.showRecurrence ?? true);
	const allowReorder = $derived(props.allowReorder ?? false);
	const className = $derived(props.class ?? '');

	const containerClasses = $derived(
		ClassNamesManager.merge('scheduled-notification', className)
	);

	const restProps = $derived.by(() => {
		const {
			class: _class,
			notifications: _notifications,
			showEditButton: _showEditButton,
			showDeleteButton: _showDeleteButton,
			showRecurrence: _showRecurrence,
			allowReorder: _allowReorder,
			onEdit: _onEdit,
			onDelete: _onDelete,
			onToggle: _onToggle,
			...rest
		} = props;
		return rest;
	});

	function recurrenceLabel(recurrence: ScheduledNotificationItem['recurrence']) {
		return RECURRENCE_LABEL[recurrence] ?? recurrence;
	}

	function handleEdit(notification: ScheduledNotificationItem) {
		props.onEdit?.(notification);
	}

	function handleDelete(id: string) {
		props.onDelete?.(id);
	}

	function handleToggle(id: string) {
		props.onToggle?.(id);
	}

	return {
		get notifications() {
			return notifications;
		},
		get showEditButton() {
			return showEditButton;
		},
		get showDeleteButton() {
			return showDeleteButton;
		},
		get showRecurrence() {
			return showRecurrence;
		},
		get allowReorder() {
			return allowReorder;
		},
		get containerClasses() {
			return containerClasses;
		},
		get restProps() {
			return restProps;
		},
		recurrenceLabel,
		handleEdit,
		handleDelete,
		handleToggle
	};
}

export default createScheduledNotificationState;
