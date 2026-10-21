<script lang="ts">
	import type { RecipeVideoScene } from '$stylist/video/interface/recipe/video-scene';

	let { src, poster, label = 'Видео-сцена', active = true }: RecipeVideoScene = $props();
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
