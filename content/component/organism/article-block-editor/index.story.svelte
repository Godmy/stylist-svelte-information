<script lang="ts">
	import { untrack } from 'svelte';
	import ArticleBlockEditor from '$stylist/content/component/organism/article-block-editor/index.svelte';
	import ArticleReader from '$stylist/content/component/organism/article-reader/index.svelte';
	import type { RecipeArticleBlockEditor } from '$stylist/content/interface/recipe/article-block-editor';
	let props: RecipeArticleBlockEditor = $props();
	let value = $state<NonNullable<RecipeArticleBlockEditor['value']>>(
		untrack(() => JSON.parse(JSON.stringify(props.value ?? [])))
	);
</script>

<ArticleBlockEditor {...props} bind:value />
<ArticleReader
	article={{
		headline: 'Предпросмотр',
		lead: 'Этот текст не сохраняется на сервере.',
		blocks: value,
		links: []
	}}
/>
