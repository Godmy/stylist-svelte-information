import MessageTimestamp from './index.svelte';
import type { RecipeMessageTimestamp } from '$stylist/notification/interface/recipe/message-timestamp';
import type { ContractStory } from '$stylist/html/interface/contract/story';
import { TOKEN_TIMESTAMP_FORMAT } from '$stylist/calendar/const/array/timestamp-format';

/** Formatted message timestamp; index.story.svelte builds the Date from minutesAgo. */
export default {
	component: MessageTimestamp,
	title: 'MessageTimestamp',
	description: 'Formatted message timestamp with optional relative mode.',
	args: { formatStyle: 'datetime', showRelative: false, minutesAgo: 5 },
	controls: {
		formatStyle: { type: 'select', options: TOKEN_TIMESTAMP_FORMAT },
		showRelative: { type: 'boolean' },
		// minutesAgo is a story knob: the render sets timestamp to now minus these minutes.
		minutesAgo: { type: 'number', min: 0, max: 180 }
	},
	presets: {
		Relative: { showRelative: true, minutesAgo: 42 },
		'Time only': { formatStyle: 'time' }
	},
	layout: 'centered'
} satisfies ContractStory<RecipeMessageTimestamp & { minutesAgo?: number }>;
