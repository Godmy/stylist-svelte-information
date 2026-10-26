import { afterEach, describe, expect, it } from 'vitest';
import { cleanup, render, screen } from '@testing-library/svelte';
import DataTableShell from '$stylist/table/component/organism/data-table-shell/index.svelte';
import TableListPanel from '$stylist/table/component/organism/table-list-panel/index.svelte';
import { ManagerLocaleContext } from '$stylist/localization/class/manager/locale-context';
import { LOCALIZATION_LOCALE_CONTEXT } from '$stylist/localization/const/value/locale-context';

afterEach(cleanup);

const ru = () =>
	new Map([[LOCALIZATION_LOCALE_CONTEXT, { ...ManagerLocaleContext.DEFAULT, locale: 'ru' }]]);

describe('table localization', () => {
	it('translates the shell controls, search and empty state', () => {
		render(DataTableShell, {
			props: {
				data: [],
				schema: [{ key: 'name', header: 'Имя', cell: 'text' as const }],
				title: 'Туры',
				onExport: () => {}
			},
			context: ru()
		});
		expect(screen.getByRole('button', { name: 'Экспорт' })).toBeTruthy();
		expect(screen.getByRole('searchbox').getAttribute('placeholder')).toBe('Поиск…');
		expect(screen.getByRole('combobox').getAttribute('aria-label')).toBe('Строк на странице');
		expect(document.body.textContent).toContain('10 на странице');
		expect(document.body.textContent).toContain('Нет данных для отображения.');
	});

	it('keeps the searchPlaceholder prop and English without a provider', () => {
		render(DataTableShell, { props: { data: [], schema: [], searchPlaceholder: 'Find a tour' } });
		expect(screen.getByRole('searchbox').getAttribute('placeholder')).toBe('Find a tour');
	});

	it('chooses Russian plural forms for table and row counts', () => {
		const items = [
			{ name: 'tours', rowCount: 21, hasSoftDelete: false },
			{ name: 'guides', rowCount: 3, hasSoftDelete: true },
			{ name: 'drivers', rowCount: 5, hasSoftDelete: false },
			{ name: 'bookings', rowCount: 1, hasSoftDelete: false },
			{ name: 'reviews', rowCount: 0, hasSoftDelete: false }
		];
		render(TableListPanel, {
			props: { items, selectedName: 'tours', onSelect: () => {} },
			context: ru()
		});
		const text = document.body.textContent ?? '';
		expect(text).toContain('5 таблиц');
		expect(text).toContain('21 строка');
		expect(text).toContain('3 строки');
		expect(text).toContain('5 строк');
		expect(text).toContain('Мягкое удаление');
	});
});
