<script lang="ts">
	import type { RecipeNotificationSettings } from '$stylist/notification/interface/recipe/notification-settings';
	import BaseIcon from '$stylist/svg/component/atom/icon/index.svelte';
	import createNotificationSettingsState from './state.svelte';

	let props: RecipeNotificationSettings = $props();
	const state = createNotificationSettingsState(() => props);
</script>

<div class={`${state.className} _c14`} {...state.restProps}>
	<div class={`${state.headerClassName} _c15`}>
		<div class="_c1">
			<BaseIcon name={state.bellIcon} class="_c2" />

			<h3 class="_c3">Notification Settings</h3>
		</div>

		<p class="_c4">Manage how and when you receive notifications.</p>
	</div>

	<div class="_c5">
		<!-- Channel headers -->

		<div class="_c6">
			<div>Notification Type</div>

			{#if state.showEmail}
				<div class="_c7">
					<BaseIcon name={state.mailIcon} class="_c8" />

					Email
				</div>
			{/if}

			{#if state.showPush}
				<div class="_c7">
					<BaseIcon name={state.smartphoneIcon} class="_c8" />

					Push
				</div>
			{/if}

			{#if state.showSms}
				<div class="_c7">
					<svg class="_c8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"
						/>
					</svg>

					SMS
				</div>
			{/if}

			{#if state.showInApp}
				<div class="_c7">
					<BaseIcon name={state.monitorIcon} class="_c8" />

					In-App
				</div>
			{/if}
		</div>

		<!-- Notification preferences -->

		{#each state.preferences as pref}
			<div class={`${state.sectionClassName} _c16`}>
				<div>
					<h4 class="_c9">{pref.name}</h4>

					<p class="_c4">{pref.description}</p>
				</div>

				{#if state.showEmail}
					<div class="_c7">
						<label class="_c10">
							<input
								type="checkbox"
								class="_c11"
								checked={!!pref.channels['email']}
								onchange={(e) =>
									state.handlePreferenceChange(
										pref.id,

										'email',

										(e.target as HTMLInputElement).checked
									)}
							/>

							<div class="_c12 _c1"></div>
						</label>
					</div>
				{/if}

				{#if state.showPush}
					<div class="_c7">
						<label class="_c10">
							<input
								type="checkbox"
								class="_c11"
								checked={!!pref.channels['push']}
								onchange={(e) =>
									state.handlePreferenceChange(
										pref.id,

										'push',

										(e.target as HTMLInputElement).checked
									)}
							/>

							<div class="_c12 _c1"></div>
						</label>
					</div>
				{/if}

				{#if state.showSms}
					<div class="_c7">
						<label class="_c10">
							<input
								type="checkbox"
								class="_c11"
								checked={!!pref.channels['sms']}
								onchange={(e) =>
									state.handlePreferenceChange(
										pref.id,

										'sms',

										(e.target as HTMLInputElement).checked
									)}
							/>

							<div class="_c12 _c1"></div>
						</label>
					</div>
				{/if}

				{#if state.showInApp}
					<div class="_c7">
						<label class="_c10">
							<input
								type="checkbox"
								class="_c11"
								checked={!!pref.channels['in_app']}
								onchange={(e) =>
									state.handlePreferenceChange(
										pref.id,

										'in_app',

										(e.target as HTMLInputElement).checked
									)}
							/>

							<div class="_c12 _c1"></div>
						</label>
					</div>
				{/if}
			</div>
		{/each}
	</div>

	<div class={`${state.footerClassName} _c17`}>
		<div class="_c13">
			<BaseIcon name={state.settingsIcon} class="_c8" />

			<span>Changes to notification preferences are saved automatically</span>
		</div>
	</div>
</div>

<style>
	._c1 {
		display: flex;

		align-items: center;
	}

	._c10 {
		position: relative;

		display: inline-flex;

		cursor: pointer;

		align-items: center;
	}

	._c11 {
		position: absolute;

		width: 1px;

		height: 1px;

		padding: 0;

		margin: -1px;

		overflow: hidden;

		clip: rect(0, 0, 0, 0);

		white-space: nowrap;

		border-width: 0;
	}

	._c12 {
		height: 1.5rem;

		width: 2.75rem;

		border-radius: 9999px;

		background-color: var(--color-background-tertiary);
	}

	._c13 {
		display: flex;

		align-items: center;

		font-size: 0.75rem;

		line-height: 1rem;

		color: var(--color-text-secondary);
	}

	._c2 {
		margin-right: 0.5rem;

		height: 1.5rem;

		width: 1.5rem;

		color: var(--color-text-secondary);
	}

	._c3 {
		font-size: 1.125rem;

		line-height: 1.75rem;

		font-weight: 500;

		color: var(--color-text-primary);
	}

	._c4 {
		margin-top: 0.25rem;

		font-size: 0.875rem;

		line-height: 1.25rem;

		color: var(--color-text-secondary);
	}

	._c5 > * + * {
		border-top-width: 1px;

		border-style: solid;
	}

	._c6 {
		display: grid;

		grid-template-columns: repeat(5, minmax(0, 1fr));

		gap: 1rem;

		background-color: var(--color-background-secondary);

		padding-left: 1.5rem;

		padding-right: 1.5rem;

		padding-top: 0.75rem;

		padding-bottom: 0.75rem;

		font-size: 0.75rem;

		line-height: 1rem;

		font-weight: 500;

		color: var(--color-text-secondary);
	}

	._c7 {
		display: flex;

		align-items: center;

		justify-content: center;
	}

	._c8 {
		margin-right: 0.25rem;

		height: 1rem;

		width: 1rem;
	}

	._c9 {
		font-size: 0.875rem;

		line-height: 1.25rem;

		font-weight: 500;

		color: var(--color-text-primary);
	}

	._c1::after {
		position: absolute;

		top: 2px;

		left: 2px;

		height: 1.25rem;

		width: 1.25rem;

		border-radius: 9999px;

		border-width: 1px;

		border-style: solid;

		border-color: var(--color-border-primary);

		background-color: var(--color-background-primary);

		transition: all 150ms cubic-bezier(0.4, 0, 0.2, 1);
	}

	._c14 {
		overflow: hidden;
		border-radius: 0.5rem;
		border-width: 1px;
		border-style: solid;
		border-color: var(--color-border-primary);
		background-color: var(--color-background-primary);
		box-shadow:
			0 1px 3px 0 rgb(0 0 0 / 0.1),
			0 1px 2px -1px rgb(0 0 0 / 0.1);
	}

	._c15 {
		border-bottom-width: 1px;
		border-style: solid;
		padding-left: 1.5rem;
		padding-right: 1.5rem;
		padding-top: 1.25rem;
		padding-bottom: 1.25rem;
	}

	._c16 {
		display: grid;
		grid-template-columns: repeat(5, minmax(0, 1fr));
		align-items: center;
		gap: 1rem;
		padding: 1.5rem;
	}

	._c17 {
		border-top-width: 1px;
		border-style: solid;
		padding-left: 1.5rem;
		padding-right: 1.5rem;
		padding-top: 1rem;
		padding-bottom: 1rem;
	}

	/* Toggle switch state: ._c11 = hidden checkbox, ._c12 = toggle track, ._c1 = toggle thumb */
	._c11:checked + ._c12 {
		background-color: var(--color-primary-600);
	}
	._c11:focus + ._c12 {
		box-shadow: 0 0 0 4px rgb(147 197 253 / 0.5);
		outline: none;
	}
	._c12::after {
		content: '';
	}
	._c11:checked + ._c12::after {
		transform: translateX(100%);
		border-color: var(--color-background-primary);
	}
</style>
