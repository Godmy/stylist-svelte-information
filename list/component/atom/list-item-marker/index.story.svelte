<script lang="ts">
	import ListItemMarker from './index.svelte';
	import Story from '$stylist/theme/component/molecule/story/index.svelte';
	import type { SlotStory } from '$stylist/theme/interface/slot/story';

	const controls: SlotStory[] = [
		{
			name: 'type',
			type: 'select',
			options: ['bullet', 'number', 'icon'],
			defaultValue: 'bullet'
		},
		{
			name: 'value',
			type: 'text',
			defaultValue: ''
		},
		{
			name: 'color',
			type: 'select',
			options: ['primary', 'secondary', 'success', 'warning', 'danger', 'info', 'neutral'],
			defaultValue: 'neutral'
		},
		{
			name: 'size',
			type: 'select',
			options: ['sm', 'md', 'lg'],
			defaultValue: 'md'
		}
	];
</script>

<Story
	{controls}
	component={ListItemMarker}
	title="ListItemMarker"
	category="Atoms/List"
	description="A marker for list items with various types, colors, and sizes."
	tags={['list', 'marker', 'indicator']}
>
	{#snippet children(values: any)}
		<div class="_c1">
			<!-- Default story -->
			<div class="_c2">
				<ListItemMarker
					type={values.type}
					value={values.value}
					color={values.color}
					size={values.size}
				/>
			</div>

			<!-- Different marker types -->
			<div class="_c3">
				<h3 class="_c4">Bullet Marker</h3>
				<div class="_c5">
					<ListItemMarker type="bullet" color="neutral" size="sm" />
					<ListItemMarker type="bullet" color="neutral" size="md" />
					<ListItemMarker type="bullet" color="neutral" size="lg" />
				</div>
			</div>

			<div class="_c3">
				<h3 class="_c4">Number Marker</h3>
				<div class="_c5">
					<ListItemMarker type="number" value="1" color="primary" size="sm" />
					<ListItemMarker type="number" value="2" color="primary" size="md" />
					<ListItemMarker type="number" value="3" color="primary" size="lg" />
				</div>
			</div>

			<div class="_c3">
				<h3 class="_c4">Icon Markers</h3>
				<div class="_c5">
					<ListItemMarker type="icon" value="check" color="success" size="sm" />
					<ListItemMarker type="icon" value="check" color="success" size="md" />
					<ListItemMarker type="icon" value="check" color="success" size="lg" />
					<ListItemMarker type="icon" value="x" color="danger" size="sm" />
					<ListItemMarker type="icon" value="x" color="danger" size="md" />
					<ListItemMarker type="icon" value="x" color="danger" size="lg" />
				</div>
			</div>

			<div class="_c3">
				<h3 class="_c4">Color Variations</h3>
				<div class="_c5">
					<ListItemMarker type="bullet" color="primary" size="md" />
					<ListItemMarker type="bullet" color="secondary" size="md" />
					<ListItemMarker type="bullet" color="success" size="md" />
					<ListItemMarker type="bullet" color="warning" size="md" />
					<ListItemMarker type="bullet" color="danger" size="md" />
					<ListItemMarker type="bullet" color="info" size="md" />
					<ListItemMarker type="bullet" color="neutral" size="md" />
				</div>
			</div>
		</div>
	{/snippet}
</Story>

<style>
	._c1 > * + * {
		margin-top: 1rem;
	}
	._c2 {
		display: flex;
		align-items: center;
		padding: 1rem;
	}
	._c3 {
		padding: 1rem;
	}
	._c3 > * + * {
		margin-top: 1rem;
	}
	._c4 {
		font-size: 1.125rem;
		line-height: 1.75rem;
		font-weight: 500;
	}
	._c5 {
		display: flex;
		align-items: center;
		flex-wrap: wrap;
		gap: 0.5rem;
	}
</style>
