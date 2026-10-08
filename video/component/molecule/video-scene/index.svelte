<script lang="ts">
	type Props = {
		src: string;
		poster?: string;
		label?: string;
		active?: boolean;
	};

	let { src, poster, label = 'Видео-сцена', active = true }: Props = $props();
</script>

<video
	class="tc-video-scene"
	{src}
	{poster}
	muted
	playsinline
	loop
	autoplay={active}
	aria-label={label}
></video>

<style>
	.tc-video-scene {
		width: 100%;
		height: 100%;
		object-fit: cover;
		display: block;
	}
</style>
