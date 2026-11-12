import ArticleBlockEditorStory from '$stylist/content/component/organism/article-block-editor/index.story.svelte';
import type { RecipeArticleBlockEditor } from '$stylist/content/interface/recipe/article-block-editor';
import type { ContractStory } from '$stylist/html/interface/contract/story';

export default {
	component: ArticleBlockEditorStory,
	title: 'Article block editor',
	description: 'Add and reorder blocks; the preview below reads the same live document.',
	args: {
		value: [
			{
				type: 'heading',
				level: 2,
				id: 'section-2',
				text: 'Первый раздел',
				contents: 'Первый раздел'
			},
			{ type: 'paragraph', html: 'Первый абзац.' },
			{ type: 'paragraph', html: 'Второй абзац редактируется в том же поле.' }
		]
	}
} satisfies ContractStory<RecipeArticleBlockEditor>;
