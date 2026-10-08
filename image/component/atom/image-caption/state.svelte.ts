import type { RecipeImageCaption } from '$stylist/image/interface/recipe/image-caption';

export function createImageCaptionState(getProps: () => RecipeImageCaption) {
	const props = $derived(getProps());
	const hostClasses = $derived(
		[
			'c-image-caption',
			props.class,
			props.rounded && 'c-image-caption--rounded',
			props.bordered && 'c-image-caption--bordered',
			props.shadow && 'c-image-caption--shadow'
		]
			.filter(Boolean)
			.join(' ')
	);

	const imageClasses = $derived(
		['c-image-caption__image', props.imageClass, props.rounded && 'c-image-caption__image--rounded']
			.filter(Boolean)
			.join(' ')
	);

	const captionClasses = $derived(
		['c-image-caption__caption', props.captionClass].filter(Boolean).join(' ')
	);

	const restProps = $derived.by(() => {
		const {
			class: _class,
			imageSrc: _imageSrc,
			imageAlt: _imageAlt,
			imageWidth: _imageWidth,
			imageHeight: _imageHeight,
			caption: _caption,
			imageClass: _imageClass,
			captionClass: _captionClass,
			rounded: _rounded,
			bordered: _bordered,
			shadow: _shadow,
			imageLoading: _imageLoading,
			...rest
		} = props;
		return rest;
	});

	return {
		get hostClasses() {
			return hostClasses;
		},
		get imageClasses() {
			return imageClasses;
		},
		get captionClasses() {
			return captionClasses;
		},
		get restProps() {
			return restProps;
		}
	};
}
