import type { CreditedImage } from '$stylist/image/type/object/credited-image';
export interface BehaviorArticleBlockEditor {
	uploadImage?: (file: File) => Promise<CreditedImage>;
	resolveImage?: (src: string) => Promise<CreditedImage>;
	onImageAdded?: (image: CreditedImage) => void;
	onBusyChange?: (busy: boolean) => void;
	confirmRemove?: (message: string) => boolean;
}
