<script lang="ts">
	import Story from '$stylist/theme/component/molecule/story/index.svelte';
	import type { SlotStory } from '$stylist/theme/interface/slot/story';

	import AudioSlider from './index.svelte';

	const controls: SlotStory[] = [
		{ name: 'value', type: 'text', defaultValue: '50' },
		{ name: 'min', type: 'text', defaultValue: '0' },
		{ name: 'max', type: 'text', defaultValue: '100' },
		{ name: 'step', type: 'text', defaultValue: '1' },
		{ name: 'label', type: 'text', defaultValue: 'Volume' },
		{ name: 'showValue', type: 'boolean', defaultValue: true }
	];
</script>

<Story
	id="atoms-audio-slider"
	title="Audio Slider"
	component={AudioSlider}
	category="Atoms"
	description="An audio slider component for controlling audio levels."
	{controls}
>
	{#snippet children(values: any)}
		<section class="_c1">
			<div class="_c2">
				<p class="_c3">Primary Audio Slider Example</p>
				<p class="_c4">An audio slider component for controlling audio levels.</p>

				<div class="_c5">
					<AudioSlider
						value={parseInt(values.value || '50')}
						min={parseInt(values.min || '0')}
						max={parseInt(values.max || '100')}
						step={parseInt(values.step || '1')}
						label={values.label}
						showValue={values.showValue}
					/>
				</div>
			</div>

			<div class="_c6">
				<h3 class="_c7">Slider Variations</h3>
				<p class="_c8">Different slider configurations with various properties.</p>

				<div class="_c9">
					<article class="_c10">
						<p class="_c11">Low Volume</p>
						<div class="_c12">
							<AudioSlider
								value={10}
								min={0}
								max={100}
								step={1}
								label="Low Volume"
								showValue={true}
							/>
						</div>
					</article>

					<article class="_c10">
						<p class="_c11">High Volume</p>
						<div class="_c12">
							<AudioSlider
								value={90}
								min={0}
								max={100}
								step={1}
								label="High Volume"
								showValue={true}
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
	._c12 {
		display: flex;
		align-items: center;
		justify-content: center;
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
		display: flex;
		align-items: center;
		justify-content: center;
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
