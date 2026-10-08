import type { HTMLAttributes } from 'svelte/elements';
import { formatAudioTime } from '$stylist/audio/function/script/audio-format-time';
import { TOKEN_AUDIO_ICON } from '$stylist/audio/const/record/audio-icon';
import type { RecipeAudioPlayer } from '$stylist/audio/interface/recipe/audio-player';

type RestProps = Omit<HTMLAttributes<HTMLDivElement>, 'class'>;

export function createAudioPlayerState(getProps: () => RecipeAudioPlayer) {
	const props = $derived(getProps());
	let audioRef = $state<HTMLAudioElement | null>(null);
	let isPlaying = $state(false);
	let isMuted = $state(props.muted ?? false);
	let currentTime = $state(0);
	let duration = $state(0);
	let volume = $state(1.0);

	const src = $derived(props.src);
	const title = $derived(props.title);
	const showControls = $derived(props.showControls ?? true);
	const autoPlay = $derived(props.autoPlay ?? false);
	const loop = $derived(props.loop ?? false);
	const hostClass = $derived(props.class ?? '');
	const controlsClass = $derived(props.controlsClass ?? '');

	const hostClasses = $derived(`audio-player ${hostClass}`.trim());

	const restProps = $derived.by(() => {
		const {
			class: _class,
			src: _src,
			title: _title,
			showControls: _showControls,
			autoPlay: _autoPlay,
			loop: _loop,
			muted: _muted,
			controlsClass: _controlsClass,
			...rest
		} = props;
		return rest as RestProps;
	});

	function togglePlay() {
		if (audioRef) {
			if (isPlaying) {
				audioRef.pause();
			} else {
				audioRef.play();
			}
			isPlaying = !isPlaying;
		}
	}

	function toggleMute() {
		if (audioRef) {
			audioRef.muted = !audioRef.muted;
			isMuted = !isMuted;
		}
	}

	function handleLoadedMetadata() {
		if (audioRef) {
			duration = audioRef.duration;
		}
	}

	function handleTimeUpdate() {
		if (audioRef) {
			currentTime = audioRef.currentTime;
		}
	}

	function handleVolumeChange(e: Event) {
		const target = e.target as HTMLInputElement;
		const newVolume = parseFloat(target.value);
		if (audioRef) {
			audioRef.volume = newVolume;
			volume = newVolume;
			if (newVolume === 0) {
				isMuted = true;
				audioRef.muted = true;
			} else if (isMuted) {
				isMuted = false;
				audioRef.muted = false;
			}
		}
	}

	function handleProgressChange(e: Event) {
		const target = e.target as HTMLInputElement;
		const newTime = parseFloat(target.value);
		if (audioRef) {
			audioRef.currentTime = newTime;
			currentTime = newTime;
		}
	}

	function reloadAudio() {
		if (audioRef) {
			audioRef.load();
			currentTime = 0;
		}
	}

	return {
		get audioRef() {
			return audioRef;
		},
		set audioRef(val: HTMLAudioElement | null) {
			audioRef = val;
		},
		get isPlaying() {
			return isPlaying;
		},
		get isMuted() {
			return isMuted;
		},
		get currentTime() {
			return currentTime;
		},
		get duration() {
			return duration;
		},
		get volume() {
			return volume;
		},
		get src() {
			return src;
		},
		get title() {
			return title;
		},
		get showControls() {
			return showControls;
		},
		get autoPlay() {
			return autoPlay;
		},
		get loop() {
			return loop;
		},
		get hostClasses() {
			return hostClasses;
		},
		get controlsClass() {
			return controlsClass;
		},
		get restProps() {
			return restProps;
		},
		get icons() {
			return TOKEN_AUDIO_ICON;
		},
		togglePlay,
		toggleMute,
		handleLoadedMetadata,
		handleTimeUpdate,
		handleVolumeChange,
		handleProgressChange,
		reloadAudio,
		formatTime: formatAudioTime
	};
}
