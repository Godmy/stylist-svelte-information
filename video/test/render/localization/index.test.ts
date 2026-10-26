import { afterEach, describe, expect, it } from 'vitest';
import { cleanup, render } from '@testing-library/svelte';
import VideoPlayer from '$stylist/video/component/molecule/video-player/index.svelte';
import VideoScene from '$stylist/video/component/molecule/video-scene/index.svelte';
import { ManagerLocaleContext } from '$stylist/localization/class/manager/locale-context';
import { LOCALIZATION_LOCALE_CONTEXT } from '$stylist/localization/const/value/locale-context';

afterEach(cleanup);

const ru = () =>
	new Map([[LOCALIZATION_LOCALE_CONTEXT, { ...ManagerLocaleContext.DEFAULT, locale: 'ru' }]]);

describe('video localization', () => {
	it('labels the player controls and the empty caption track in the provider locale', () => {
		const view = render(VideoPlayer, { props: { src: 'clip.mp4' }, context: ru() });
		const labels = [...view.container.querySelectorAll('[aria-label]')].map((node) =>
			node.getAttribute('aria-label')
		);
		expect(labels).toEqual(
			expect.arrayContaining(['Воспроизвести', 'Громкость', 'Позиция воспроизведения'])
		);
		expect(view.container.querySelector('track')?.getAttribute('label')).toBe('Субтитров нет');
	});

	it('uses English as the base text and keeps the label prop', () => {
		const en = render(VideoScene, { props: { src: 'scene.mp4' } });
		expect(en.container.querySelector('video')?.getAttribute('aria-label')).toBe('Video scene');
		cleanup();

		const ru1 = render(VideoScene, { props: { src: 'scene.mp4' }, context: ru() });
		expect(ru1.container.querySelector('video')?.getAttribute('aria-label')).toBe('Видео-сцена');
		cleanup();

		const own = render(VideoScene, { props: { src: 'scene.mp4', label: 'Прибой' }, context: ru() });
		expect(own.container.querySelector('video')?.getAttribute('aria-label')).toBe('Прибой');
	});
});
