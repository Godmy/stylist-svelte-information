import ArticleReader from '$stylist/content/component/organism/article-reader/index.svelte';
import type { RecipeArticleReader } from '$stylist/content/interface/recipe/article-reader';
import type { ContractStory } from '$stylist/html/interface/contract/story';

export default {
	component: ArticleReader,
	title: 'Article reader',
	description:
		'Editorial blocks without site routes, publishing metadata or product recommendations.',
	args: {
		eyebrow: 'База знаний',
		article: {
			headline: 'Как устроена статья',
			lead: 'Общая модель для <strong>чтения и редактирования</strong>.',
			blocks: [
				{ type: 'heading', level: 2, id: 'section-2', text: 'Структура', contents: 'Структура' },
				{
					type: 'paragraph',
					html: 'Абзацы, списки, изображения и таблицы используют одну модель.'
				},
				{
					type: 'list',
					ordered: false,
					items: ['Пишите понятно', 'Разделяйте материал на разделы']
				},
				{ type: 'note', emergency: false, html: '<p>Проверьте ссылки перед публикацией.</p>' },
				{
					type: 'table',
					head: ['Блок', 'Назначение'],
					rows: [
						['Заголовок', 'Навигация'],
						['Абзац', 'Текст']
					]
				},
				{
					type: 'comparison',
					columns: [
						{ title: 'Преимущества', tone: 'positive', items: ['Одна модель'] },
						{ title: 'Ограничения', tone: 'neutral', items: ['Публикацией управляет проект'] }
					]
				}
			],
			links: [{ href: '#section-2', label: 'К структуре' }]
		}
	},
	controls: { eyebrow: { type: 'text' } }
} satisfies ContractStory<RecipeArticleReader>;
