import { afterEach, describe, expect, it } from 'vitest';
import { cleanup, render } from '@testing-library/svelte';
import AudioPlayer from '$stylist/audio/component/organism/audio-player/index.svelte';
import AudioVisualizer from '$stylist/audio/component/atom/audio-visualizer/index.svelte';
import Transcriber from '$stylist/audio/component/organism/transcriber/index.svelte';
import { ManagerLocaleContext } from '$stylist/localization/class/manager/locale-context';
import { LOCALIZATION_LOCALE_CONTEXT } from '$stylist/localization/const/value/locale-context';

afterEach(cleanup);

const ru = () =>
	new Map([[LOCALIZATION_LOCALE_CONTEXT, { ...ManagerLocaleContext.DEFAULT, locale: 'ru' }]]);

const labels = (container: HTMLElement) =>
	[...container.querySelectorAll('[aria-label]')].map((node) => node.getAttribute('aria-label'));

describe('audio localization', () => {
	it('labels the player controls in the provider locale', () => {
		const en = render(AudioPlayer, { props: { src: 'track.mp3' } });
		expect(labels(en.container)).toEqual(
			expect.arrayContaining(['Play', 'Mute', 'Playback position', 'Volume', 'Reload audio'])
		);
		cleanup();

		const view = render(AudioPlayer, { props: { src: 'track.mp3' }, context: ru() });
		expect(labels(view.container)).toEqual(
			expect.arrayContaining([
				'Воспроизвести',
				'Выключить звук',
				'Громкость',
				'Перезагрузить аудио'
			])
		);
	});

	it('keeps prop texts over catalog defaults', () => {
		const view = render(AudioVisualizer, {
			props: { src: 'cover.png', title: 'Сулико' },
			context: ru()
		});
		expect(view.container.textContent).toContain('Сулико');
		expect(view.container.textContent).toContain('Неизвестный исполнитель');
	});

	it('translates the transcriber placeholder', () => {
		const view = render(Transcriber, { context: ru() });
		expect(view.container.textContent).toContain('Здесь появится расшифровка.');
		expect(
			view.container.querySelector('.c-transcriber__progress')?.getAttribute('aria-label')
		).toBe('Ход расшифровки');
	});
});
