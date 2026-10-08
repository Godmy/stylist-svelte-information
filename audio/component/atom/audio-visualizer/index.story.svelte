<script lang="ts">
	import Story from '$stylist/theme/component/molecule/story/index.svelte';
	import type { SlotStory } from '$stylist/theme/interface/slot/story';

	import AudioVisualizer from './index.svelte';

	const controls: SlotStory[] = [
		{ name: 'title', type: 'text', defaultValue: 'Sample Track' },
		{ name: 'author', type: 'text', defaultValue: 'Sample Artist' },
		{ name: 'duration', type: 'text', defaultValue: '3:45' },
		{ name: 'isPlaying', type: 'boolean', defaultValue: false }
	];
</script>

<Story
	id="atoms-audio-visualizer"
	title="Audio Visualizer"
	component={AudioVisualizer}
	category="Atoms"
	description="An audio visualizer component that shows audio tracks with play controls."
	{controls}
>
	{#snippet children(values: any)}
		<section class="_c1">
			<div class="_c2">
				<p class="_c3">Primary Audio Visualizer Example</p>
				<p class="_c4">An audio visualizer component that shows audio tracks with play controls.</p>

				<div class="_c5">
					<AudioVisualizer
						title={values.title}
						author={values.author}
						duration={values.duration}
						isPlaying={values.isPlaying}
						alt="Sample track artwork"
						src="https://placehold.co/64x64"
					/>
				</div>
			</div>

			<div class="_c6">
				<h3 class="_c7">Visualizer Variations</h3>
				<p class="_c8">Different visualizer configurations with various properties.</p>

				<div class="_c9">
					<article class="_c10">
						<p class="_c11">Playing Track</p>
						<AudioVisualizer
							title="Summer Vibes"
							author="Beach Tunes"
							duration="4:20"
							isPlaying={true}
							alt="Album artwork"
							src="https://placehold.co/64x64"
						/>
					</article>

					<article class="_c10">
						<p class="_c11">Paused Track</p>
						<AudioVisualizer
							title="Chill Beats"
							author="Relaxing Sounds"
							duration="5:15"
							isPlaying={false}
							alt="Album artwork"
							src="https://placehold.co/64x64"
						/>
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
