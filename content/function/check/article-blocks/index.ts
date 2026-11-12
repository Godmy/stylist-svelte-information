import type { ArticleBlock } from '$stylist/content/type/alias/article-block';
import type { ArticleBlockProblem } from '$stylist/content/type/object/article-block-problem';
import { articleBlockLabel } from '$stylist/content/function/resolve/article-block-label';
import { articleHtmlText } from '$stylist/content/function/transform/article-plain-text';
export function checkArticleBlocks(blocks: readonly ArticleBlock[]): ArticleBlockProblem[] {
	const list: ArticleBlockProblem[] = [];
	blocks.forEach((block, index) => {
		const name = `Блок ${index + 1} (${articleBlockLabel(block.type).toLowerCase()})`;
		const problem =
			block.type === 'heading'
				? !block.text.trim() && 'пустой заголовок'
				: block.type === 'paragraph' || block.type === 'note'
					? !articleHtmlText(block.html) && 'пустой текст'
					: block.type === 'list'
						? !block.items.some((item) => articleHtmlText(item)) && 'нет пунктов'
						: block.type === 'photos'
							? !block.photos.length && 'добавьте фото или удалите блок'
							: block.type === 'comparison'
								? block.columns.some(
										(column) =>
											!column.title.trim() || !column.items.some((item) => articleHtmlText(item))
									) && 'у каждой колонки нужны заголовок и пункты'
								: !block.head.some((cell) => cell.trim()) && 'пустая шапка таблицы';
		if (problem) list.push({ text: `${name}: ${problem}`, index });
	});
	return list;
}
