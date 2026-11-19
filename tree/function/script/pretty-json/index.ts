/** Indents a JSON string for reading; anything that is not valid JSON is returned as is. */
export function prettyJson(value: unknown): string {
	if (typeof value !== 'string' || !value) return '';
	try {
		return JSON.stringify(JSON.parse(value), null, 2);
	} catch {
		return value;
	}
}
