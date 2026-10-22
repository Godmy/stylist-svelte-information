import Card from '$stylist/image/component/molecule/card/index.svelte';
import type { RecipeCard } from '$stylist/image/interface/recipe/card';
import type { ContractStory } from '$stylist/html/interface/contract/story';
import { TOKEN_SIZE } from '$stylist/design-token/const/array/size';
import { ITEM_LAYOUT_SHAPE } from '$stylist/layout/const/array/item-layout-shape';

/** Flexible card container with optional media, header, and footer slots. */
export default {
	component: Card,
	title: 'Card',
	description: 'Flexible card container with optional media, header, and footer slots.',
	args: { shape: 'rounded', size: 'md', elevation: 1, clickable: false, fullWidth: false },
	controls: {
		shape: { type: 'select', options: ITEM_LAYOUT_SHAPE },
		// xs … xl: the size tokens the card padding maps.
		size: { type: 'select', options: TOKEN_SIZE.slice(0, 5) },
		elevation: { type: 'range', min: 0, max: 6, step: 1 },
		clickable: { type: 'boolean' },
		fullWidth: { type: 'boolean' }
	},
	presets: { Clickable: { clickable: true, elevation: 3 }, Pill: { shape: 'pill' } }
} satisfies ContractStory<RecipeCard>;
