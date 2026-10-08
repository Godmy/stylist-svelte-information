import type { ColumnSchema } from '$stylist/table/type/object/column';
/** AREA: STYLIST CODER MODEL -> AUTO-GENERATED */

export interface RecipeColumn<T = Record<string, unknown>> {
	schema: ColumnSchema<T>;
	currentSortKey?: string;
	currentSortDirection?: 'asc' | 'desc' | 'none';
	onSort?: (key: string) => void;
}
