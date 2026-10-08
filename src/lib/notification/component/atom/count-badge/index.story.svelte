<script lang="ts">
	import type { SlotStory } from '$stylist/theme/interface/slot/story';
	import Story from '$stylist/theme/component/molecule/story/index.svelte';
	import CountBadge from './index.svelte';

	const controls: SlotStory[] = [
		{
			name: 'count',
			type: 'select',
			defaultValue: '12',
			options: ['0', '1', '3', '5', '10', '12', '25', '50', '99', '100', '152', '200']
		},
		{
			name: 'max',
			type: 'select',
			defaultValue: '99',
			options: ['10', '50', '99', '100', '200', '500', '999']
		},
		{ name: 'showZero', type: 'boolean', defaultValue: false }
	];

	const inboxViews = [
		{ label: 'Inbox', count: 12 },
		{ label: 'Mentions', count: 3 },
		{ label: 'Approvals', count: 0 },
		{ label: 'Archive', count: 152 }
	];
</script>

<Story
	{controls}
	component={CountBadge}
	title="CountBadge Component"
	description="Compact counter for unread states with support for maximum display values"
	tags={['information', 'indicator', 'counter', 'notifications']}
>
	{#snippet children(values: any)}
		{@const count = Number(values.count)}
		{@const max = Number(values.max)}
		<div class="_c1">
			<div class="_c2">
				<button class="_c3">
					Messages
					<span class="_c4">
						<CountBadge
							count={Number.isNaN(count) ? 12 : count}
							max={Number.isNaN(max) ? 99 : max}
							showZero={values.showZero as boolean}
						/>
					</span>
				</button>
			</div>

			<div class="_c5 _c2">
				<ul class="_c6">
					{#each inboxViews as view}
						<li class="_c7">
							<span class="_c8">{view.label}</span>
							<CountBadge
								count={view.label === 'Inbox' ? (Number.isNaN(count) ? 12 : count) : view.count}
								max={Number.isNaN(max) ? 99 : max}
								showZero={values.showZero as boolean}
							/>
						</li>
					{/each}
				</ul>
			</div>
		</div>
	{/snippet}
</Story>

<style>
	._c1 > * + * {
		margin-top: 2rem;
	}
	._c2 {
		display: flex;
		align-items: center;
		gap: 0.75rem;
		border-radius: 1rem;
		border: 1px solid var(--color-border-primary, #d1d5db);
		background-color: var(--color-background-primary, #ffffff);
		padding: 1rem;
		box-shadow: 0 1px 2px 0 rgb(0 0 0 / 0.05);
	}
	._c3 {
		position: relative;
		border-radius: 0.75rem;
		border: 0;
		background-color: var(--color-neutral-900, #111827);
		padding-left: 1rem;
		padding-right: 1rem;
		padding-top: 0.5rem;
		padding-bottom: 0.5rem;
		font-size: 0.875rem;
		line-height: 1.25rem;
		font-weight: 600;
		color: var(--color-text-inverse, #ffffff);
	}
	._c4 {
		position: absolute;
		top: -0.5rem;
		right: -0.5rem;
	}
	._c5 {
		border-radius: 1rem;
		border: 1px solid var(--color-border-primary, #d1d5db);
		padding: 1rem;
		box-shadow: 0 1px 2px 0 rgb(0 0 0 / 0.05);
	}
	._c6 {
		font-size: 0.875rem;
		line-height: 1.25rem;
	}
	._c6 > * + * {
		border-top: 1px solid var(--color-border-primary, #d1d5db);
	}
	._c7 {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding-top: 0.75rem;
		padding-bottom: 0.75rem;
	}
	._c8 {
		color: var(--color-text-primary, #111827);
	}
</style>
