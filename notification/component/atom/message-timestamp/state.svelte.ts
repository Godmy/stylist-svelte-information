import { ClassNamesManager } from '$stylist/layout/class/manager/class-names';
import { NOTIFICATION_MESSAGE_TIMESTAMP_MESSAGE } from '$stylist/notification/const/record/message-timestamp-message';
import { useMessage } from '$stylist/localization/function/hook/use-message';
import { useFormat } from '$stylist/localization/function/hook/use-format';
import type { RecipeMessageTimestamp } from '$stylist/notification/interface/recipe/message-timestamp';

export function createMessageTimestampState(getProps: () => RecipeMessageTimestamp) {
	const props = $derived(getProps());
	const t = useMessage('message-timestamp', NOTIFICATION_MESSAGE_TIMESTAMP_MESSAGE);
	const format = useFormat();
	const TIME: Intl.DateTimeFormatOptions = { hour: '2-digit', minute: '2-digit' };
	// Initialize props with defaults
	const timestamp = $derived.by(() => {
		if (props.timestamp instanceof Date) {
			return props.timestamp;
		}
		const candidate = new Date(props.timestamp as unknown as string | number | Date);
		return Number.isNaN(candidate.getTime()) ? new Date(0) : candidate;
	});
	const formatStyle = $derived(props.formatStyle ?? 'datetime');
	const showRelative = $derived(props.showRelative ?? false);

	// Format time value
	function formatTimeValue(): string {
		if (showRelative) {
			const diff = Date.now() - timestamp.getTime();
			const minutes = Math.floor(diff / 60000);
			const hours = Math.floor(diff / 3600000);
			const days = Math.floor(diff / 86400000);

			if (minutes < 1) return format.relative(0, 'second');
			if (minutes < 60) return format.relative(-minutes, 'minute');
			if (hours < 24) return format.relative(-hours, 'hour');
			if (days < 7) return format.relative(-days, 'day');
		}

		switch (formatStyle) {
			case 'time':
				return format.date(timestamp, TIME);
			case 'date':
				return format.date(timestamp, { day: '2-digit', month: '2-digit', year: 'numeric' });
			case 'datetime':
			default:
				const today = new Date();
				const yesterday = new Date(today);
				yesterday.setDate(yesterday.getDate() - 1);

				const isToday =
					timestamp.getDate() === today.getDate() &&
					timestamp.getMonth() === today.getMonth() &&
					timestamp.getFullYear() === today.getFullYear();

				const isYesterday =
					timestamp.getDate() === yesterday.getDate() &&
					timestamp.getMonth() === yesterday.getMonth() &&
					timestamp.getFullYear() === yesterday.getFullYear();

				if (isToday) {
					return format.date(timestamp, TIME);
				} else if (isYesterday) {
					return t('dateTime', {
						date: format.relative(-1, 'day'),
						time: format.date(timestamp, TIME)
					});
				} else {
					return t('dateTime', {
						date: format.date(timestamp, { day: '2-digit', month: 'short' }),
						time: format.date(timestamp, TIME)
					});
				}
		}
	}

	const formattedTime = $derived(formatTimeValue());

	// Generate formatted datetime for the datetime attribute
	const formattedDateTime = $derived(timestamp.toISOString());

	// Generate styles
	const styles = {
		container: 'text-xs text-[--color-text-secondary] whitespace-nowrap'
	};

	// Merge classes with custom classes
	const classes = $derived(ClassNamesManager.join(String(props.class ?? ''), styles.container));

	return {
		get timestamp() {
			return timestamp;
		},
		get formatStyle() {
			return formatStyle;
		},
		get showRelative() {
			return showRelative;
		},
		get formattedTime() {
			return formattedTime;
		},
		get formattedDateTime() {
			return formattedDateTime;
		},
		get classes() {
			return classes;
		}
	};
}

export default createMessageTimestampState;
