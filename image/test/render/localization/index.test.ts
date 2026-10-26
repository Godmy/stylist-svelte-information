import { afterEach, describe, expect, it } from 'vitest';
import { cleanup, render, screen } from '@testing-library/svelte';
import ImageCaptionEditorCard from '$stylist/image/component/organism/image-caption-editor-card/index.svelte';
import ImageGallery from '$stylist/image/component/organism/image-gallery/index.svelte';
import MediaThumbnail from '$stylist/image/component/molecule/media-thumbnail/index.svelte';
import { ManagerLocaleContext } from '$stylist/localization/class/manager/locale-context';
import { LOCALIZATION_LOCALE_CONTEXT } from '$stylist/localization/const/value/locale-context';

afterEach(cleanup);

const ru = () =>
	new Map([[LOCALIZATION_LOCALE_CONTEXT, { ...ManagerLocaleContext.DEFAULT, locale: 'ru' }]]);

describe('image localization', () => {
	it('translates the caption editor and keeps label props', () => {
		render(ImageCaptionEditorCard, {
			props: { src: 'a.jpg', caption: 'Mtskheta', saveLabel: 'Применить' },
			context: ru()
		});
		expect(screen.getByRole('textbox').getAttribute('aria-label')).toBe('Подпись');
		expect(screen.getByRole('button', { name: 'Применить' })).toBeTruthy();
	});

	it('numbers fallback alt texts and labels navigation in the provider locale', () => {
		const view = render(ImageGallery, {
			props: {
				images: [
					{ id: 'a', imageSrc: 'a.jpg' },
					{ id: 'b', imageSrc: 'b.jpg' }
				]
			},
			context: ru()
		});
		const alts = [...view.container.querySelectorAll('img')].map((img) => img.getAttribute('alt'));
		expect(alts).toContain('Изображение галереи 1');
		expect(alts).toContain('Миниатюра 2');
		expect(view.container.querySelector('[aria-label="Следующее изображение"]')).toBeTruthy();
	});

	it('uses English as the base text of former Russian literals', () => {
		const props = { src: 'a.jpg', onRemove: () => {} };
		render(MediaThumbnail, { props });
		expect(screen.getByRole('button').getAttribute('aria-label')).toBe('Remove image');
		cleanup();
		render(MediaThumbnail, { props, context: ru() });
		expect(screen.getByRole('button').getAttribute('aria-label')).toBe('Удалить изображение');
	});
});
