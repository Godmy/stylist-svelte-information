<script lang="ts">
	import type { RecipeVideoScene } from '$stylist/video/interface/recipe/video-scene';

	import { VIDEO_VIDEO_SCENE_MESSAGE } from '$stylist/video/const/record/video-scene-message';
	import { useMessage } from '$stylist/localization/function/hook/use-message';

	let { src, poster, label, active = true }: RecipeVideoScene = $props();
	const t = useMessage('video-scene', VIDEO_VIDEO_SCENE_MESSAGE);
</script>

<video
	class="tc-video-scene"
	{src}
	{poster}
	muted
	playsinline
	loop
	autoplay={active}
	aria-label={label ?? t('label')}
></video>

<style>
	.tc-video-scene {
		width: 100%;
		height: 100%;
		object-fit: cover;
		display: block;
	}
</style>
