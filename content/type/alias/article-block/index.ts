import type { CreditedImage } from '$stylist/image/type/object/credited-image';
import type { ArticleComparisonColumn } from '$stylist/content/type/object/article-comparison-column';
export type ArticleBlock =
	/** `id` is the anchor (`section-N`) menu links point to; `contents` lists the heading in «В этой статье» under that label, empty skips it. */
	| { type: 'heading'; level: 2 | 3; id: string; text: string; contents: string }
	| { type: 'paragraph'; html: string }
	| { type: 'list'; ordered: boolean; items: string[] }
	/** One photo spans the column, two or more form a gallery; a first `hero` spans the page above the text, `illustration` is a drawn cover, `infographic` keeps its frame. */
	| {
			type: 'photos';
			variant: 'photo' | 'hero' | 'illustration' | 'infographic';
			photos: CreditedImage[];
	  }
	| { type: 'note'; emergency: boolean; html: string }
	| { type: 'table'; head: string[]; rows: string[][] }
	/** Columns compared side by side (pros and cons): rendered by stylist ComparisonCard. */
	| { type: 'comparison'; columns: ArticleComparisonColumn[] };
