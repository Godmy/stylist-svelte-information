<script lang="ts">
	import Story from '$stylist/theme/component/molecule/story/index.svelte';
	import type { SlotStory } from '$stylist/theme/interface/slot/story';

	import VideoPlayer from './index.svelte';

	let {
		id = '',
		title = '',
		description = '',
		controls = [
			{
				name: 'src',
				type: 'text',
				defaultValue:
					'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4'
			},
			{ name: 'autoPlay', type: 'boolean', defaultValue: false },
			{ name: 'showControls', type: 'boolean', defaultValue: true },
			{ name: 'muted', type: 'boolean', defaultValue: false },
			{ name: 'width', type: 'number', defaultValue: 640 },
			{ name: 'height', type: 'number', defaultValue: 400 }
		]
	} = $props<{
		id?: string;
		title?: string;
		description?: string;
		controls?: SlotStory[];
	}>();
</script>

<Story {id} {title} {description} component={VideoPlayer} category="Molecules" {controls}>
	{#snippet children(values: any)}
		<section class="sb-molecules-video-player _c1">
			<div class="_c2">
				<p class="_c3">Primary Video Player Example</p>
				<p class="_c4">Interactive video player with customizable options.</p>

				<div class="_c5">
					<VideoPlayer
						src={values.src}
						autoPlay={values.autoPlay}
						showControls={values.showControls}
						muted={values.muted}
						width={values.width}
						height={values.height}
					/>
				</div>
			</div>

			<div class="_c6">
				<h3 class="_c7">Video Player Variations</h3>
				<p class="_c8">Different video player configurations with various options.</p>

				<div class="_c9">
					<article class="_c10">
						<p class="_c11">Autoplay Enabled</p>
						<div>
							<VideoPlayer
								src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4"
								autoPlay={true}
								showControls={true}
								muted={true}
								height={200}
							/>
						</div>
					</article>

					<article class="_c10">
						<p class="_c11">No Controls</p>
						<div>
							<VideoPlayer
								src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4"
								autoPlay={false}
								showControls={false}
								muted={false}
								height={200}
							/>
						</div>
					</article>
				</div>
			</div>
		</section>
	{/snippet}
</Story>

<style>
	._c1 {
		display: grid;
		width: 100%;
		gap: 2rem;
	}
	@media (min-width: 1024px) {
		._c1 {
			grid-template-columns: 1fr 1fr;
		}
	}
	._c10 {
		border-radius: 1rem;
		border-width: 1px;
		border-style: dashed;
		border-color: var(--color-border-primary);
		background-color: var(--color-background-primary);
		padding: 1rem;
	}
	._c11 {
		margin-bottom: 0.5rem;
		font-size: 0.875rem;
		line-height: 1.25rem;
		font-weight: 600;
		color: var(--color-text-primary);
	}
	._c2 {
		border-radius: 2rem;
		border-width: 1px;
		border-style: solid;
		border-color: var(--color-border-primary);
		background-color: var(--color-background-primary);
		padding: 1.5rem;
		box-shadow: 0 1px 2px 0 rgb(0 0 0 / 0.05);
	}
	._c3 {
		font-size: 0.875rem;
		line-height: 1.25rem;
		font-weight: 600;
		letter-spacing: 0.025em;
		color: var(--color-text-secondary);
		text-transform: uppercase;
	}
	._c4 {
		margin-top: 0.25rem;
		color: var(--color-text-primary);
	}
	._c5 {
		margin-top: 1.5rem;
	}
	._c6 {
		border-radius: 2rem;
		border-width: 1px;
		border-style: solid;
		border-color: var(--color-border-primary);
		background-color: var(--color-background-secondary);
		padding: 1.5rem;
		box-shadow: 0 1px 2px 0 rgb(0 0 0 / 0.05);
	}
	._c7 {
		font-size: 1rem;
		line-height: 1.5rem;
		font-weight: 600;
		color: var(--color-text-primary);
	}
	._c8 {
		font-size: 0.875rem;
		line-height: 1.25rem;
		color: var(--color-text-secondary);
	}
	._c9 {
		margin-top: 1.25rem;
	}
	._c9 > * + * {
		margin-top: 1rem;
	}
</style>
