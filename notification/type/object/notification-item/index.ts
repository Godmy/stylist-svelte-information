import type { TokenColorTone } from '$stylist/theme/type/alias/color-tone';

export type NotificationItem = {
	id: string;
	title: string;
	message?: string;
	type?: TokenColorTone;
	read?: boolean;
	timestamp?: Date;
};
