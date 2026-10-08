<script lang="ts">
	import Story from '$stylist/theme/component/molecule/story/index.svelte';
	import CanvasImageEditor from './index.svelte';
	import { TOKEN_CONTROLLER_TYPE } from '$stylist/domain/const/object/controller-type';

	const controls = [
		{
			name: 'imageWidth',
			type: TOKEN_CONTROLLER_TYPE.SELECT,
			options: [600, 700, 800, 900],
			defaultValue: 800
		},
		{
			name: 'imageHeight',
			type: TOKEN_CONTROLLER_TYPE.SELECT,
			options: [400, 500, 600, 700],
			defaultValue: 600
		},
		{
			name: 'cropEnabled',
			type: TOKEN_CONTROLLER_TYPE.BOOLEAN,
			defaultValue: false
		},
		{
			name: 'filter',
			type: TOKEN_CONTROLLER_TYPE.SELECT,
			options: [
				'none',
				'grayscale',
				'sepia',
				'invert',
				'blur',
				'brightness',
				'contrast',
				'saturate',
				'hue-rotate'
			],
			defaultValue: 'none'
		}
	];
</script>

<Story
	{controls}
	title="CanvasImageEditor"
	category="Organisms/Image"
	description="Canvas-based image editor component for cropping, filtering, and manipulating images."
	tags={['image', 'editor', 'canvas', 'filter', 'crop']}
>
	{#snippet children(values: any)}
		<CanvasImageEditor
			imageWidth={values.imageWidth}
			imageHeight={values.imageHeight}
			filter={values.filter}
			cropEnabled={values.cropEnabled}
			imageSrc="https://placehold.co/600x400"
			imageAlt="Canvas image editor preview"
		/>
	{/snippet}
</Story>
