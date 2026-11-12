import type { ImageAttribution } from '$stylist/image/type/object/image-attribution';
export type CreditedImage = {
	src: string;
	width: number;
	height: number;
	alt: string;
	credit?: ImageAttribution;
};
