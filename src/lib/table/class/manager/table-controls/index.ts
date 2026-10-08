/** AREA: STYLIST CODER MODEL -> AUTO-GENERATED */
import type { ColumnSchema } from '$stylist/table/type/object/column';

type Row = Record<string, unknown>;

export class ObjectManagerTableControls {
	static sortData<T extends Row>(
		data: T[],
		sortKey: string | null,
		sortDirection: 'asc' | 'desc'
	): T[] {
		if (!sortKey) return data;
		return [...data].sort((a, b) => {
			const av = a[sortKey as keyof T];
			const bv = b[sortKey as keyof T];
			const result = String(av ?? '').localeCompare(String(bv ?? ''));
			return sortDirection === 'asc' ? result : -result;
		});
	}

	static groupRows(data: Row[], groupBy: string): Record<string, Row[]> {
		return data.reduce<Record<string, Row[]>>((acc, row) => {
			const key = String(row[groupBy] ?? 'Other');
			if (!acc[key]) acc[key] = [];
			acc[key].push(row);
			return acc;
		}, {});
	}

	static filterRows(data: Row[], columns: string[], filters: Record<string, string>): Row[] {
		return data.filter((row) =>
			columns.every((col) =>
				String(row[col] ?? '')
					.toLowerCase()
					.includes((filters[col] ?? '').toLowerCase())
			)
		);
	}

	static getCellValue<T extends Row>(row: T, schema: ColumnSchema<T>): unknown {
		if (schema.render) return schema.render(row[schema.key], row);
		return row[schema.key as keyof T];
	}
}
