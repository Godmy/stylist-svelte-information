import type { ArticleBlock } from '$stylist/content/type/alias/article-block';
import type { ArticleLink } from '$stylist/content/type/object/article-link';
/** Editorial body shared by readers and editors; publishing metadata belongs to the host. */
export type ArticleDocument = {
	headline: string;
	lead: string;
	blocks: ArticleBlock[];
	links: ArticleLink[];
	compact?: boolean;
};
