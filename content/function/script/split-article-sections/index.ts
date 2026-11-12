import type { ArticleBlock } from '$stylist/content/type/alias/article-block';
import type { ArticleEditorSection } from '$stylist/content/type/object/article-editor-section';
export function splitArticleSections(blocks: ArticleBlock[]) {
	const list: ArticleEditorSection[] = [];
	blocks.forEach((block, index) => {
		if (block.type === 'heading')
			list.push({ key: block.id, heading: block, start: index, end: index + 1 });
		else if (!list.length) list.push({ key: 'intro', heading: null, start: index, end: index + 1 });
		else list[list.length - 1].end = index + 1;
	});
	return list;
}
