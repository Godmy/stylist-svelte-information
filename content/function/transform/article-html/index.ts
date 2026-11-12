/** Reduce untrusted editorial HTML to links, emphasis and optional note blocks. */
export function normalizeArticleHtml(html: string, { block = false }: { block?: boolean } = {}) {
	const INLINE = new Set(['a', 'strong', 'em', 'br']);
	const BLOCK = new Set(['p', 'ul', 'ol', 'li']);
	const ALIASES: Record<string, string> = { b: 'strong', i: 'em' };
	const SAFE_HREF = /^(https?:\/\/|\/(?!\/)|#|tel:|mailto:)[^\s"'<>`]*$/i;

	const allowed = (name: string) => INLINE.has(name) || (block && BLOCK.has(name));
	const open: string[] = [];
	let out = '';
	const source = html.replace(/<!--[\s\S]*?-->/g, '');
	const tag = /<(\/?)([a-zA-Z][a-zA-Z0-9]*)\b((?:[^>"']|"[^"]*"|'[^']*')*)>/g;
	let last = 0;
	const text = (value: string) => value.replace(/</g, '&lt;').replace(/>/g, '&gt;');
	for (const match of source.matchAll(tag)) {
		out += text(source.slice(last, match.index));
		last = match.index + match[0].length;
		const name = ALIASES[match[2].toLowerCase()] ?? match[2].toLowerCase();
		if (!allowed(name)) continue;
		if (name === 'br') {
			if (!match[1]) out += '<br>';
			continue;
		}
		if (match[1]) {
			const index = open.lastIndexOf(name);
			if (index < 0) continue;
			for (const closing of open.splice(index).reverse()) out += `</${closing}>`;
			continue;
		}
		if (name === 'a') {
			const href = /\bhref\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s>]+))/i.exec(match[3]);
			const value = (href?.[1] ?? href?.[2] ?? href?.[3] ?? '').trim().replace(/&amp;/g, '&');
			if (!SAFE_HREF.test(value)) continue;
			const escaped = value.replace(/&/g, '&amp;');
			out += /^https?:/i.test(value)
				? `<a href="${escaped}" target="_blank" rel="noopener noreferrer">`
				: `<a href="${escaped}">`;
		} else out += `<${name}>`;
		open.push(name);
	}
	out += text(source.slice(last));
	for (const closing of open.reverse()) out += `</${closing}>`;
	return out
		.replace(/\s+/g, ' ')
		.replace(/\s*(<\/?(?:p|ul|ol|li)>|<br>)\s*/g, '$1')
		.replace(/<(strong|em|a)\b[^>]*>\s*<\/\1>/g, '')
		.trim();
}
