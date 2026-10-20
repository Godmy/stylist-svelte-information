import ListItemMarker from './index.svelte';
import type { RecipeListItemMarker } from '$stylist/list/interface/recipe/list-item-marker';
import type { ContractStory } from '$stylist/html/interface/contract/story';
import { LIST_ITEM_MARKER_TYPE } from '$stylist/list/const/array/list-item-marker-type';
import { TOKEN_COLOR_TONE } from '$stylist/design-token/const/array/color-tone';
import { TOKEN_SIZE } from '$stylist/design-token/const/array/size';

/** Bullet, number or icon marker in front of a list item. */
export default {
	component: ListItemMarker,
	title: 'ListItemMarker',
	description: 'A marker for list items with various types, colors, and sizes.',
	args: { type: 'bullet', value: '', color: 'neutral', size: 'md' },
	controls: {
		type: { type: 'select', options: LIST_ITEM_MARKER_TYPE },
		value: { type: 'text', description: 'Number text or icon name' },
		color: { type: 'select', options: TOKEN_COLOR_TONE },
		size: { type: 'select', options: TOKEN_SIZE }
	},
	presets: {
		'Number Marker': { type: 'number', value: '1', color: 'primary' },
		'Icon Check': { type: 'icon', value: 'check', color: 'success' },
		'Icon X': { type: 'icon', value: 'x', color: 'danger' },
		Large: { size: 'lg' }
	},
	layout: 'centered'
} satisfies ContractStory<RecipeListItemMarker>;
