/** AREA: STYLIST CODER MODEL -> AUTO-GENERATED */
import type { ColumnSchema } from '$stylist/table/type/object/column';

export function createColumn<T>(key: keyof T, opts: Omit<ColumnSchema<T>, 'key'>): ColumnSchema<T> {
	return { key, ...opts };
}
