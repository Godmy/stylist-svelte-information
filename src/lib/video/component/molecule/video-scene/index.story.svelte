<script lang="ts">
	import Story from '$stylist/theme/component/molecule/story/index.svelte';
	import type { SlotStory } from '$stylist/theme/interface/slot/story';
	import VideoScene from './index.svelte';

	const controls: SlotStory[] = [
		{
			name: 'src',
			type: 'text',
			defaultValue: 'https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4'
		},
		{ name: 'active', type: 'boolean', defaultValue: true }
	];
</script>

<Story
	id="video-molecules-video-scene"
	title="Video / VideoScene"
	component={VideoScene}
	category="Video/Molecules"
	description="Full-bleed video layer with autoplay toggle."
	{controls}
>
	{#snippet children(values: any)}
		<div class="_stage">
			<VideoScene src={values.src} active={Boolean(values.active)} label="Video scene" />
		</div>
	{/snippet}
</Story>

<style>
	._stage {
		height: 360px;
		overflow: hidden;
		background: #17231f;
	}
</style>
