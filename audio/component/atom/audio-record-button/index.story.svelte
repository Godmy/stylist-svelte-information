<script lang="ts">
	import type { SlotAudioRecording } from '$stylist/audio/interface/slot/audio-recording';
	import type { RecipeAudioRecordButton } from '$stylist/audio/interface/recipe/audio-record-button';

	import AudioRecordButton from '$stylist/audio/component/atom/audio-record-button/index.svelte';

	// Render of index.story.ts: the recorded file and the event log come from callback props.
	let args: RecipeAudioRecordButton = $props();

	let recording = $state<SlotAudioRecording | null>(null);
	let eventLog = $state<string[]>([]);

	function handleRecordingStart() {
		eventLog = ['Recording started', ...eventLog].slice(0, 4);
	}

	function handleRecorded(nextRecording: SlotAudioRecording) {
		if (recording?.url) URL.revokeObjectURL(recording.url);
		recording = nextRecording;
		eventLog = [
			`Recorded ${nextRecording.file.name} (${Math.round(nextRecording.blob.size / 1024)} KB)`,
			...eventLog
		].slice(0, 4);
	}

	function handleError(error: Error) {
		eventLog = [`Error: ${error.message}`, ...eventLog].slice(0, 4);
	}
</script>

<section class="_c1">
	<div class="_c2">
		<p class="_c3">Recorder</p>
		<div class="_c4">
			<AudioRecordButton
				{...args}
				onRecordingStart={handleRecordingStart}
				onRecorded={handleRecorded}
				onError={handleError}
			/>
		</div>

		{#if recording}
			<div class="_c5">
				<audio src={recording.url} controls class="_c6"></audio>
				<dl class="_c7">
					<div>
						<dt>File</dt>
						<dd>{recording.fileName}</dd>
					</div>
					<div>
						<dt>Size</dt>
						<dd>{Math.round(recording.blob.size / 1024)} KB</dd>
					</div>
					<div>
						<dt>Duration</dt>
						<dd>{Math.round(recording.durationMs / 1000)} s</dd>
					</div>
				</dl>
			</div>
		{/if}
	</div>

	<div class="_c8">
		<p class="_c3">Events</p>
		<div class="_c9">
			{#each eventLog as item, index (index)}
				<p>{item}</p>
			{:else}
				<p>No recorder events yet</p>
			{/each}
		</div>
	</div>
</section>

<style>
	._c1 {
		display: grid;
		width: 100%;
		gap: 1rem;
	}

	@media (min-width: 900px) {
		._c1 {
			grid-template-columns: minmax(0, 1.2fr) minmax(18rem, 0.8fr);
		}
	}

	._c2,
	._c8 {
		border: 1px solid var(--color-border-primary);
		border-radius: 0.5rem;
		background: var(--color-background-primary);
		padding: 1rem;
	}

	._c3 {
		margin: 0;
		font-size: 0.875rem;
		font-weight: 600;
		color: var(--color-text-primary);
	}

	._c4 {
		margin-top: 1rem;
	}

	._c5 {
		margin-top: 1rem;
		display: grid;
		gap: 0.75rem;
	}

	._c6 {
		width: 100%;
	}

	._c7 {
		display: grid;
		gap: 0.5rem;
		margin: 0;
		font-size: 0.8125rem;
	}

	._c7 div {
		display: flex;
		justify-content: space-between;
		gap: 1rem;
	}

	._c7 dt {
		color: var(--color-text-secondary);
	}

	._c7 dd {
		margin: 0;
		max-width: 70%;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
		color: var(--color-text-primary);
	}

	._c9 {
		margin-top: 1rem;
		display: grid;
		gap: 0.5rem;
		color: var(--color-text-secondary);
		font-size: 0.8125rem;
	}

	._c9 p {
		margin: 0;
	}
</style>
