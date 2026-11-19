/** One column of a catalog row: shown as a chip in the tree and as a field in the editor. */
export type CatalogField = {
	key: string;
	header: string;
	/** Editor control: `reference` picks another row by id, `json` is a monospace text area. */
	kind?: 'text' | 'textarea' | 'boolean' | 'reference' | 'json';
	/** Shown as a chip in every tree row; the column manager toggles it. */
	visible?: boolean;
	/** `false` makes the field read-only in the editor. */
	editable?: boolean;
	/** An empty value is saved as `null` instead of an empty string. */
	nullable?: boolean;
	required?: boolean;
};
