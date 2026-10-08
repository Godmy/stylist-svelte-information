import type { RecipeImageGallery } from '$stylist/image/interface/recipe/image-gallery';

export function createImageGalleryState(getProps: () => RecipeImageGallery) {
	const props = $derived(getProps());
	let currentIndex = $state(0);
	let isFullscreen = $state(false);

	const images = $derived(props.images ?? []);
	const showThumbnails = $derived(props.showThumbnails ?? true);
	const autoPlay = $derived(props.autoPlay ?? false);
	const autoPlayInterval = $derived(props.autoPlayInterval ?? 3000);
	const showCaptions = $derived(props.showCaptions ?? false);
	const containerClass = $derived(props.class == null ? undefined : String(props.class));

	// Auto-play functionality
	$effect(() => {
		let autoPlayTimer: number | null = null;
		if (autoPlay && images.length > 0) {
			autoPlayTimer = window.setInterval(() => {
				currentIndex = (currentIndex + 1) % images.length;
			}, autoPlayInterval);
		}

		return () => {
			if (autoPlayTimer) {
				clearInterval(autoPlayTimer);
			}
		};
	});

	// Handle fullscreen overflow and keyboard
	$effect(() => {
		if (isFullscreen) {
			window.addEventListener('keydown', handleKeyDown);
			document.body.style.overflow = 'hidden';
		} else {
			window.removeEventListener('keydown', handleKeyDown);
			document.body.style.overflow = 'auto';
		}

		return () => {
			window.removeEventListener('keydown', handleKeyDown);
			document.body.style.overflow = 'auto';
		};
	});

	function nextImage() {
		if (images.length === 0) return;
		currentIndex = (currentIndex + 1) % images.length;
	}

	function prevImage() {
		if (images.length === 0) return;
		currentIndex = (currentIndex - 1 + images.length) % images.length;
	}

	function goToImage(index: number) {
		currentIndex = index;
	}

	function openFullscreen(index: number) {
		currentIndex = index;
		isFullscreen = true;
	}

	function closeFullscreen() {
		isFullscreen = false;
	}

	const imageContainerClasses = 'image-gallery__image-container';
	const imageClasses = $derived(
		['image-gallery__image', images[currentIndex]?.imageClass].filter(Boolean).join(' ')
	);
	const navigationButtonClasses = 'image-gallery__nav-button';
	const captionClasses = 'image-gallery__caption';
	const fullscreenCaptionClasses = 'image-gallery__fullscreen-caption';

	function getThumbnailClasses(index: number): string {
		return `image-gallery__thumbnail ${index === currentIndex ? 'image-gallery__thumbnail--active' : ''}`.trim();
	}

	function handleKeyDown(e: KeyboardEvent) {
		if (isFullscreen) {
			if (e.key === 'ArrowRight') nextImage();
			else if (e.key === 'ArrowLeft') prevImage();
			else if (e.key === 'Escape') closeFullscreen();
		}
	}

	const restProps = $derived.by(() => {
		const {
			class: _class,
			images: _images,
			showThumbnails: _showThumbnails,
			autoPlay: _autoPlay,
			autoPlayInterval: _autoPlayInterval,
			showCaptions: _showCaptions,
			thumbnailClass: _thumbnailClass,
			navigationClass: _navigationClass,
			captionClass: _captionClass,
			...rest
		} = props;
		return rest;
	});

	return {
		get images() {
			return images;
		},
		get currentIndex() {
			return currentIndex;
		},
		get isFullscreen() {
			return isFullscreen;
		},
		get showThumbnails() {
			return showThumbnails;
		},
		get showCaptions() {
			return showCaptions;
		},
		get containerClass() {
			return containerClass;
		},
		get restProps() {
			return restProps;
		},
		get imageContainerClasses() {
			return imageContainerClasses;
		},
		get imageClasses() {
			return imageClasses;
		},
		get navigationButtonClasses() {
			return navigationButtonClasses;
		},
		get captionClasses() {
			return captionClasses;
		},
		get fullscreenCaptionClasses() {
			return fullscreenCaptionClasses;
		},
		getThumbnailClasses,
		nextImage,
		prevImage,
		goToImage,
		openFullscreen,
		closeFullscreen
	};
}
