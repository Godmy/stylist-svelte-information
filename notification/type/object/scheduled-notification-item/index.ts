export type ScheduledNotificationItem = {
	id: string;
	title: string;
	description: string;
	scheduledAt: string;
	enabled: boolean;
	recurrence: 'daily' | 'weekly' | 'monthly' | 'once';
};
