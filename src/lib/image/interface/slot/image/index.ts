export interface SlotImage {
	imageSrc?: string;
	imageAlt?: string;
	imageClass?: string;
	imageFallback?: string;
	imageWidth?: number | string;
	imageHeight?: number | string;
	imageLoading?: 'eager' | 'lazy';
}
