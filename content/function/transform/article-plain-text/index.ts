/** The visible text of guide markup: search, headings and the editor's previews. */
export function articleHtmlText(html: string) {
	return html
		.replace(/<[^>]*>/g, ' ')
		.replace(/&nbsp;/g, ' ')
		.replace(/&lt;/g, '<')
		.replace(/&gt;/g, '>')
		.replace(/&quot;/g, '"')
		.replace(/&#39;/g, "'")
		.replace(/&amp;/g, '&')
		.replace(/\s+/g, ' ')
		.replace(/ ([,.;:!?»)])/g, '$1')
		.trim();
}
