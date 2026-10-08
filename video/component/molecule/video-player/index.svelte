<script lang="ts">
	import type { RecipeVideoPlayer } from '$stylist/video/interface/recipe/video-player';
	import { createVideoPlayerState } from './state.svelte';
	import BaseIcon from '$stylist/svg/component/atom/icon/index.svelte';
	import Button from '$stylist/button/component/atom/button/index.svelte';

	let props: RecipeVideoPlayer = $props();
	const state = createVideoPlayerState(() => props);
</script>

<div class={state.hostClasses} style={state.hostStyle} {...state.restProps}>
	<video
		bind:this={state.videoRef}
		src={state.src}
		poster={state.poster}
		width={state.width}
		height={state.height}
		autoplay={state.autoPlay}
		loop={state.loop}
		onloadedmetadata={() => state.handleLoadedMetadata()}
		ontimeupdate={() => state.handleTimeUpdate()}
		class={`vp-video ${state.videoClass}`}
		controls={false}
	>
		<track kind="captions" label="No captions available" srclang="en" src="" />
	</video>

	{#if state.showControls}
		<div
			class={`vp-controls ${state.controlsClass}`}
			style="--gradient-start: transparent; --gradient-end: color-mix(in srgb, var(--color-text-primary) 80%, transparent); background-image: var(--gradients-directional-vertical);"
		>
			<div class="vp-controls-top">
				<div class="vp-controls-left">
					<Button
						variant="ghost"
						size="sm"
						onclick={() => state.togglePlay()}
						aria-label={state.isPlaying ? 'Pause' : 'Play'}
					>
						{#if state.isPlaying}
							<BaseIcon name="pause" size={20} />
						{:else}
							<BaseIcon name="play" size={20} />
						{/if}
					</Button>

					<Button
						variant="ghost"
						size="sm"
						onclick={() => state.toggleMute()}
						aria-label={state.isMuted ? 'Unmute' : 'Mute'}
					>
						{#if state.isMuted}
							<BaseIcon name="volume-x" size={20} />
						{:else}
							<BaseIcon name="volume-2" size={20} />
						{/if}
					</Button>

					<input
						type="range"
						min="0"
						max="1"
						step="0.01"
						value={state.volume}
						oninput={(e) => state.handleVolumeChange(e)}
						class="vp-volume"
					/>
				</div>

				<Button
					variant="ghost"
					size="sm"
					onclick={() => state.reloadVideo()}
					aria-label="Reload video"
				>
					<BaseIcon name="rotate-ccw" size={20} />
				</Button>
			</div>

			<div class="vp-progress-wrap">
				<span class="vp-time-before">{state.formatTime(state.currentTime)}</span>
				<input
					type="range"
					min="0"
					max={state.duration || 100}
					value={state.currentTime}
					oninput={(e) => state.handleProgressChange(e)}
					class="vp-progress"
				/>
				<span class="vp-time-after">{state.formatTime(state.duration)}</span>
			</div>
		</div>
	{/if}

	{#if state.title}
		<div class="vp-title">{state.title}</div>
	{/if}
</div>

<style>
	.video-player {
		position: relative;
		overflow: hidden;
		border-radius: 0.5rem;
		background-color: var(--color-neutral-900, #171923);
	}
	.vp-video {
		width: 100%;
		height: 100%;
		object-fit: contain;
	}
	.vp-controls {
		position: absolute;
		right: 0;
		bottom: 0;
		left: 0;
		padding: 1rem;
		color: var(--color-text-inverse);
	}
	.vp-controls-top {
		margin-bottom: 0.5rem;
		display: flex;
		align-items: center;
		justify-content: space-between;
	}
	.vp-controls-left {
		display: flex;
		align-items: center;
		gap: 0.5rem;
	}
	.vp-volume {
		width: 5rem;
		accent-color: white;
	}
	.vp-progress-wrap {
		display: flex;
		align-items: center;
	}
	.vp-time-before {
		margin-right: 0.5rem;
		font-size: 0.75rem;
	}
	.vp-progress {
		flex: 1;
		accent-color: white;
	}
	.vp-time-after {
		margin-left: 0.5rem;
		font-size: 0.75rem;
	}
	.vp-title {
		background-color: color-mix(in srgb, var(--color-neutral-900) 50%, transparent);
		padding: 0.5rem;
		font-size: 0.875rem;
		color: var(--color-text-inverse);
	}
</style>
