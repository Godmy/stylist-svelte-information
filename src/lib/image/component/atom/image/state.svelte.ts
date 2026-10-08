import { ClassNamesManager } from '$stylist/layout/class/manager/class-names';
import type { RecipeImage } from '$stylist/image/interface/recipe/image';

export function createImageState(getProps: () => RecipeImage) {
	const props = $derived(getProps());
	let isLoaded = $state(false);
	let hasError = $state(false);
	const imageSrc = $derived(props.imageSrc);
	const imageFallback = $derived(props.imageFallback);
	const loadingProp = $derived(props.imageLoading ?? 'lazy');
	const imageWidth = $derived(props.imageWidth);
	const imageHeight = $derived(props.imageHeight);
	const content = $derived(props.content);
	const size = $derived(props.size ?? 'md');

	const containerClass = $derived(
		ClassNamesManager.merge(
			'c-image',
			!isLoaded && !hasError ? 'c-image--loading' : '',
			props.class ?? ''
		)
	);
	const wrapperClass = $derived('c-image__placeholder');

	const imageSource = $derived(hasError && imageFallback ? imageFallback : imageSrc);
	const imageClasses = $derived(
		ClassNamesManager.merge(
			'c-image__img',
			`c-image__img--${size}`,
			isLoaded ? 'c-image__img--loaded' : '',
			props.imageClass ?? ''
		)
	);

	function handleLoad() {
		isLoaded = true;
		props.onLoad?.();
	}

	function handleError() {
		hasError = true;
		props.onError?.();
	}

	return {
		get isLoaded() {
			return isLoaded;
		},
		get hasError() {
			return hasError;
		},
		get imageSource() {
			return imageSource;
		},
		get imageClasses() {
			return imageClasses;
		},
		get containerClass() {
			return containerClass;
		},
		get wrapperClass() {
			return wrapperClass;
		},
		get loadingProp() {
			return loadingProp;
		},
		get imageWidth() {
			return imageWidth;
		},
		get imageHeight() {
			return imageHeight;
		},
		get content() {
			return content;
		},
		handleLoad,
		handleError
	};
}
