import { afterEach, describe, expect, it } from 'vitest';
import { cleanup, render, screen } from '@testing-library/svelte';
import SortableList from '$stylist/list/component/organism/sortable-list/index.svelte';
import { ManagerLocaleContext } from '$stylist/localization/class/manager/locale-context';
import { LOCALIZATION_LOCALE_CONTEXT } from '$stylist/localization/const/value/locale-context';

afterEach(cleanup);

const ru = () =>
	new Map([[LOCALIZATION_LOCALE_CONTEXT, { ...ManagerLocaleContext.DEFAULT, locale: 'ru' }]]);

const items = [{ id: '1', title: 'Мцхета' }];

describe('list localization', () => {
	it('names the item action button in the provider locale', () => {
		render(SortableList, { props: { items } });
		expect(screen.getByRole('button').getAttribute('aria-label')).toBe('Actions for Мцхета');
		cleanup();

		render(SortableList, { props: { items }, context: ru() });
		expect(screen.getByRole('button').getAttribute('aria-label')).toBe('Действия: Мцхета');
	});
});
