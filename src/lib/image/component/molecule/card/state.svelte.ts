import { TOKEN_OPACITY } from '$stylist/theme/const/object/opacity';
import type { LayoutShape } from '$stylist/layout/type/alias/item-layout-shape';
import type { TokenSize } from '$stylist/theme/type/alias/size';
import type { RecipeCard } from '$stylist/image/interface/recipe/card';

export function createCardState(getProps: () => RecipeCard) {
	const props = $derived(getProps());
	const shape = $derived<LayoutShape>(props.shape ?? 'rounded');
	const size = $derived<TokenSize>((props.size as TokenSize | undefined) ?? 'md');
	const elevation = $derived(props.elevation ?? props.layoutElevation ?? 1);
	const clickable = $derived(props.clickable ?? false);
	const fullWidth = $derived(props.fullWidth ?? false);
	const opacity = $derived(
		props.opacity !== undefined ? (TOKEN_OPACITY[props.opacity] ?? '1') : undefined
	);

	const restProps = $derived.by(() => {
		const {
			class: _class,
			shape: _shape,
			size: _size,
			elevation: _elevation,
			layoutElevation: _layoutElevation,
			opacity: _opacity,
			clickable: _clickable,
			fullWidth: _fullWidth,
			children: _children,
			media: _media,
			header: _header,
			footer: _footer,
			...rest
		} = props;
		return rest;
	});

	return {
		get shape() {
			return shape;
		},
		get size() {
			return size;
		},
		get elevation() {
			return elevation;
		},
		get clickable() {
			return clickable;
		},
		get fullWidth() {
			return fullWidth;
		},
		get opacity() {
			return opacity;
		},
		get restProps() {
			return restProps;
		}
	};
}
