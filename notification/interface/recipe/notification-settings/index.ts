import type { ComputeIntersectAll } from '$stylist/theme/type/compute/intersect-all';
import type { HTMLAttributes } from 'svelte/elements';
import type { INotificationSettingsPreference } from '$stylist/notification/type/object/notification-settings-preference';
import type { TokenNotifictionChannel } from '$stylist/notification/type/alias/notification-channel';

export interface RecipeNotificationSettings extends ComputeIntersectAll<
	[HTMLAttributes<HTMLDivElement>]
> {
	preferences?: INotificationSettingsPreference[];
	onPreferenceChange?: (id: string, channel: TokenNotifictionChannel, enabled: boolean) => void;
	showEmail?: boolean;
	showPush?: boolean;
	showSms?: boolean;
	showInApp?: boolean;
	headerClass?: string;
	sectionClass?: string;
	footerClass?: string;
}
