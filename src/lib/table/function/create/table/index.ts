/** AREA: STYLIST CODER MODEL -> AUTO-GENERATED */
import type { TableSchema } from '$stylist/table/type/object/table';

export function createTable<T>(schema: TableSchema<T>) {
	return {
		schema,
		createState(data: T[]) {
			return { data, schema };
		}
	};
}
