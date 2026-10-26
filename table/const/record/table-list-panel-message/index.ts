/** Messages of TableListPanel. */
export const TABLE_TABLE_LIST_PANEL_MESSAGE = {
	en: {
		title: 'Database Tables',
		tables: {
			one: '{count} table',
			other: '{count} tables'
		},
		rows: {
			one: '{count} row',
			other: '{count} rows'
		},
		search: 'Search tables...',
		empty: 'No tables found',
		softDelete: 'Soft Delete'
	},
	ru: {
		title: 'Таблицы базы данных',
		tables: {
			one: '{count} таблица',
			few: '{count} таблицы',
			many: '{count} таблиц',
			other: '{count} таблицы'
		},
		rows: {
			one: '{count} строка',
			few: '{count} строки',
			many: '{count} строк',
			other: '{count} строки'
		},
		search: 'Поиск таблиц…',
		empty: 'Таблицы не найдены',
		softDelete: 'Мягкое удаление'
	}
} as const;
