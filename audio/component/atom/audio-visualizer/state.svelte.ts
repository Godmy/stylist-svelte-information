import type { HTMLAttributes } from 'svelte/elements';
import { AUDIO_AUDIO_VISUALIZER_MESSAGE } from '$stylist/audio/const/record/audio-visualizer-message';
import { useMessage } from '$stylist/localization/function/hook/use-message';
import type { RecipeAudioVisualizer } from '$stylist/audio/interface/recipe/audio-visualizer';

export function createAudioVisualizerState(
	getProps: () => RecipeAudioVisualizer & HTMLAttributes<HTMLDivElement>
) {
	const props = $derived(getProps());
	let localIsPlaying = $derived(props.isPlaying ?? false);

	const src = $derived(props.src ?? '');
	const t = useMessage('audio-visualizer', AUDIO_AUDIO_VISUALIZER_MESSAGE);
	const alt = $derived(props.alt ?? t('alt'));
	const title = $derived(props.title ?? t('title'));
	const author = $derived(props.author ?? t('author'));
	const duration = $derived(props.duration ?? '0:00');
	const className = $derived(props.class ?? '');

	const restProps = $derived.by(() => {
		const {
			class: _class,
			src: _src,
			alt: _alt,
			title: _title,
			author: _author,
			duration: _duration,
			isPlaying: _isPlaying,
			onPlayToggle: _onPlayToggle,
			...rest
		} = props;
		return rest;
	});

	function togglePlay() {
		localIsPlaying = !localIsPlaying;
		props.onPlayToggle?.(localIsPlaying);
	}

	return {
		get src() {
			return src;
		},
		get alt() {
			return alt;
		},
		get title() {
			return title;
		},
		get author() {
			return author;
		},
		get duration() {
			return duration;
		},
		get isPlaying() {
			return localIsPlaying;
		},
		get className() {
			return className;
		},
		get restProps() {
			return restProps;
		},
		togglePlay
	};
}
