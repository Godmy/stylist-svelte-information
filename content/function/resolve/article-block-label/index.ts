import { ARTICLE_BLOCK_OPTIONS } from '$stylist/content/const/array/article-block-options';
import type { ArticleBlock } from '$stylist/content/type/alias/article-block';
export function articleBlockLabel(type: ArticleBlock['type']) {
	return ARTICLE_BLOCK_OPTIONS.find((item) => item.type === type)?.label ?? type;
}
