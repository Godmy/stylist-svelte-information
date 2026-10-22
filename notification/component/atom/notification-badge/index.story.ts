import NotificationBadge from '$stylist/notification/component/atom/notification-badge/index.svelte';
import type { RecipeNotificationBadge } from '$stylist/notification/interface/recipe/notification-badge';
import type { ContractStory } from '$stylist/html/interface/contract/story';
import { TOKEN_COLOR_TONE } from '$stylist/design-token/const/array/color-tone';
import { TOKEN_ALIGNMENT } from '$stylist/layout/const/array/alignment';
import { TOKEN_MARKER } from '$stylist/notification/const/array/marker';

/** Badge marker for unread counts and notification states. */
export default {
	component: NotificationBadge,
	title: 'NotificationBadge',
	description: 'Badge marker for unread counts and notification states.',
	args: {
		count: 12,
		marker: 'number',
		appearance: 'danger',
		position: 'top-end',
		showZero: false
	},
	controls: {
		count: { type: 'range', min: 0, max: 140, step: 1 },
		marker: { type: 'select', options: TOKEN_MARKER },
		// default, neutral, primary, success, info, warning, danger: the tones the badge styles.
		appearance: {
			type: 'select',
			options: [...TOKEN_COLOR_TONE.slice(0, 3), ...TOKEN_COLOR_TONE.slice(5, 9)]
		},
		// The four corners the badge can be placed at.
		position: {
			type: 'select',
			options: TOKEN_ALIGNMENT.filter((alignment) => /^(top|bottom)-(start|end)$/.test(alignment))
		},
		showZero: { type: 'boolean' }
	},
	presets: {
		Dot: { marker: 'dot', appearance: 'success' },
		Check: { marker: 'check', appearance: 'success' },
		Overflow: { count: 140 }
	},
	content: [
		{
			kind: 'element',
			tag: 'button',
			attrs: { type: 'button' },
			children: [{ kind: 'text', value: 'Inbox' }]
		}
	],
	layout: 'centered'
} satisfies ContractStory<RecipeNotificationBadge>;
