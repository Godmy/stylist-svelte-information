<script lang="ts">
	import type { RecipeAudioPlayer } from '$stylist/audio/interface/recipe/audio-player';
	import { createAudioPlayerState } from './state.svelte';
	import BaseIcon from '$stylist/svg/component/atom/icon/index.svelte';
	import Button from '$stylist/button/component/atom/button/index.svelte';

	let props: RecipeAudioPlayer = $props();
	const state = createAudioPlayerState(() => props);
</script>

<div class={state.hostClasses} {...state.restProps}>
	<audio
		bind:this={state.audioRef}
		src={state.src}
		autoplay={state.autoPlay}
		loop={state.loop}
		onloadedmetadata={() => state.handleLoadedMetadata()}
		ontimeupdate={() => state.handleTimeUpdate()}
	></audio>

	{#if state.title}
		<div class="ap-title">{state.title}</div>
	{/if}

	{#if state.showControls}
		<div class={`ap-controls ${state.controlsClass}`}>
			<div class="ap-controls-left">
				<Button
					variant="ghost"
					size="sm"
					onclick={() => state.togglePlay()}
					aria-label={state.isPlaying ? 'Pause' : 'Play'}
				>
					{#if state.isPlaying}
						<BaseIcon name={state.icons.PAUSE} size={20} />
					{:else}
						<BaseIcon name={state.icons.PLAY} size={20} />
					{/if}
				</Button>

				<Button
					variant="ghost"
					size="sm"
					onclick={() => state.toggleMute()}
					aria-label={state.isMuted ? 'Unmute' : 'Mute'}
				>
					{#if state.isMuted}
						<BaseIcon name={state.icons.VOLUME_X} size={20} />
					{:else}
						<BaseIcon name={state.icons.VOLUME_2} size={20} />
					{/if}
				</Button>
			</div>

			<div class="ap-progress-wrap">
				<span class="ap-time">{state.formatTime(state.currentTime)}</span>
				<input
					type="range"
					min="0"
					max={state.duration || 100}
					value={state.currentTime}
					oninput={(e) => state.handleProgressChange(e)}
					class="ap-progress"
				/>
				<span class="ap-time">{state.formatTime(state.duration)}</span>
			</div>

			<div class="ap-controls-right">
				<input
					type="range"
					min="0"
					max="1"
					step="0.01"
					value={state.volume}
					oninput={(e) => state.handleVolumeChange(e)}
					class="ap-volume"
				/>
				<Button
					variant="ghost"
					size="sm"
					onclick={() => state.reloadAudio()}
					aria-label="Reload audio"
				>
					<BaseIcon name={state.icons.ROTATE_CCW} size={16} />
				</Button>
			</div>
		</div>
	{/if}
</div>

<style>
	.audio-player {
		border-radius: 0.5rem;
		border: 1px solid var(--color-border-primary);
		background-color: var(--color-background-primary);
		padding: 1rem;
	}
	.ap-title {
		margin-bottom: 0.5rem;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
		font-weight: 500;
		color: var(--color-text-primary);
	}
	.ap-controls {
		display: flex;
		align-items: center;
		justify-content: space-between;
	}
	.ap-controls-left {
		display: flex;
		align-items: center;
		gap: 0.5rem;
	}
	.ap-progress-wrap {
		margin: 0 1rem;
		display: flex;
		flex: 1;
		align-items: center;
		gap: 0.5rem;
	}
	.ap-time {
		width: 2.5rem;
		font-size: 0.75rem;
		color: var(--color-text-secondary);
	}
	.ap-progress {
		flex: 1;
		accent-color: #3b82f6;
	}
	.ap-controls-right {
		display: flex;
		align-items: center;
		gap: 0.5rem;
	}
	.ap-volume {
		width: 5rem;
		accent-color: #3b82f6;
	}
</style>
