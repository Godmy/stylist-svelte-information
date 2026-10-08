import type { HTMLAttributes } from 'svelte/elements';
import type { RecipeCanvasImageEditor } from '$stylist/image/interface/recipe/canvas-image-editor';

export function createCanvasImageEditorState(
	getProps: () => RecipeCanvasImageEditor & HTMLAttributes<HTMLCanvasElement>
) {
	const props = $derived(getProps());
	let canvasRef = $state<HTMLCanvasElement | null>(null);
	let image = $state<HTMLImageElement | null>(null);
	let imageLoaded = $state(false);
	const currentCropArea = $state({ x: 0, y: 0, width: 0, height: 0 });

	const width = $derived(Number(props.imageWidth ?? 800));
	const height = $derived(Number(props.imageHeight ?? 600));
	const imageSrc = $derived(props.imageSrc);
	const cropEnabled = $derived(props.cropEnabled ?? false);
	const filter = $derived((props.filter ?? 'none') as string);
	const brightness = $derived(props.brightness ?? 100);
	const contrast = $derived(props.contrast ?? 100);
	const saturation = $derived(props.saturation ?? 100);
	const hue = $derived(props.hue ?? 0);

	// Load image when src changes
	$effect(() => {
		if (imageSrc) {
			const img = new Image();
			img.onload = () => {
				image = img;
				imageLoaded = true;
				drawImage();
			};
			img.src = imageSrc;
		}
	});

	// Draw image on canvas when it's loaded
	$effect(() => {
		if (canvasRef && image && imageLoaded) {
			drawImage();
		}
	});

	// Apply filter when it changes
	$effect(() => {
		if (canvasRef && imageLoaded) {
			applyFilter();
		}
	});

	function drawImage() {
		if (!canvasRef || !image) return;
		const ctx = canvasRef.getContext('2d');
		if (!ctx) return;
		ctx.clearRect(0, 0, canvasRef.width, canvasRef.height);
		ctx.drawImage(image, 0, 0, canvasRef.width, canvasRef.height);
	}

	function applyFilter() {
		if (!canvasRef || !image) return;
		const ctx = canvasRef.getContext('2d');
		if (!ctx) return;
		ctx.clearRect(0, 0, canvasRef.width, canvasRef.height);

		let filterString = '';
		switch (filter) {
			case 'grayscale':
				filterString += 'grayscale(100%) ';
				break;
			case 'sepia':
				filterString += 'sepia(100%) ';
				break;
			case 'invert':
				filterString += 'invert(100%) ';
				break;
			case 'blur':
				filterString += 'blur(2px) ';
				break;
			case 'brightness':
				filterString += `brightness(${brightness}%) `;
				break;
			case 'contrast':
				filterString += `contrast(${contrast}%) `;
				break;
			case 'saturate':
				filterString += `saturate(${saturation}%) `;
				break;
			case 'hue-rotate':
				filterString += `hue-rotate(${hue}deg) `;
				break;
			default:
				break;
		}

		ctx.filter = filterString.trim();
		ctx.drawImage(image, 0, 0, canvasRef.width, canvasRef.height);
		ctx.filter = 'none';
	}

	function cropImage() {
		if (!canvasRef || !image) return;
		const ctx = canvasRef.getContext('2d');
		if (!ctx) return;

		const tempCanvas = document.createElement('canvas');
		const tempCtx = tempCanvas.getContext('2d');
		if (!tempCtx) return;

		tempCanvas.width = currentCropArea.width;
		tempCanvas.height = currentCropArea.height;

		tempCtx.drawImage(
			image,
			currentCropArea.x,
			currentCropArea.y,
			currentCropArea.width,
			currentCropArea.height,
			0,
			0,
			currentCropArea.width,
			currentCropArea.height
		);

		ctx.clearRect(0, 0, canvasRef.width, canvasRef.height);
		ctx.drawImage(tempCanvas, 0, 0, canvasRef.width, canvasRef.height);
		image.src = tempCanvas.toDataURL();
	}

	const restProps = $derived.by(() => {
		const {
			class: _class,
			imageSrc: _imageSrc,
			imageAlt: _imageAlt,
			imageLoading: _imageLoading,
			imageFallback: _imageFallback,
			imageClass: _imageClass,
			imageWidth: _imageWidth,
			imageHeight: _imageHeight,
			cropEnabled: _cropEnabled,
			filter: _filter,
			brightness: _brightness,
			contrast: _contrast,
			saturation: _saturation,
			hue: _hue,
			children: _children,
			...rest
		} = props;
		return rest;
	});

	return {
		get width() {
			return width;
		},
		get height() {
			return height;
		},
		get restProps() {
			return restProps;
		},
		get canvasRef() {
			return canvasRef;
		},
		set canvasRef(val: HTMLCanvasElement | null) {
			canvasRef = val;
		},
		get imageLoaded() {
			return imageLoaded;
		},
		cropImage
	};
}

export default createCanvasImageEditorState;
