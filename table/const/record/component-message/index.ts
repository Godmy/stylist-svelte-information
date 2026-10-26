/** Interface messages of the component catalog; story descriptions stay data. */
export const TABLE_COMPONENT_MESSAGE = {
	en: {
		search: "Search components... (try 'button', 'input', 'card')",
		clearSearch: 'Clear search',
		gridView: 'Grid view',
		listView: 'List view',
		sortName: 'Sort by Name',
		sortCategory: 'Sort by Category',
		sortRecent: 'Recently Updated',
		showFilters: 'Show filters',
		hideFilters: 'Hide filters',
		categories: 'Categories',
		tags: 'Tags',
		clearFilters: 'Clear all filters',
		stats: {
			one: 'Showing {filtered} of {count} component',
			other: 'Showing {filtered} of {count} components'
		},
		preview: 'Preview',
		aiGenerated: 'AI-Generated',
		open: 'Open',
		emptyTitle: 'No components found',
		emptyText: 'Try adjusting your search or filters'
	},
	ru: {
		search: 'Поиск компонентов… (например, button, input, card)',
		clearSearch: 'Очистить поиск',
		gridView: 'Плитка',
		listView: 'Список',
		sortName: 'По названию',
		sortCategory: 'По категории',
		sortRecent: 'Недавно обновлённые',
		showFilters: 'Показать фильтры',
		hideFilters: 'Скрыть фильтры',
		categories: 'Категории',
		tags: 'Теги',
		clearFilters: 'Сбросить все фильтры',
		stats: {
			one: 'Показано {filtered} из {count} компонента',
			few: 'Показано {filtered} из {count} компонентов',
			many: 'Показано {filtered} из {count} компонентов',
			other: 'Показано {filtered} из {count} компонента'
		},
		preview: 'Предпросмотр',
		aiGenerated: 'Создано ИИ',
		open: 'Открыть',
		emptyTitle: 'Компоненты не найдены',
		emptyText: 'Измените запрос или фильтры'
	}
} as const;
