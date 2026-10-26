import { afterEach, describe, expect, it } from 'vitest';
import { cleanup, render } from '@testing-library/svelte';
import TreeNodeItem from '$stylist/tree/component/molecule/tree-node-item/index.svelte';
import { ManagerLocaleContext } from '$stylist/localization/class/manager/locale-context';
import { LOCALIZATION_LOCALE_CONTEXT } from '$stylist/localization/const/value/locale-context';

afterEach(cleanup);

const ru = () =>
	new Map([[LOCALIZATION_LOCALE_CONTEXT, { ...ManagerLocaleContext.DEFAULT, locale: 'ru' }]]);

const node = { key: 'root', desc: 'Грузия', child: [{ key: 'tbilisi', desc: 'Тбилиси' }] };

describe('tree localization', () => {
	it('labels the toggle in English without a provider and in Russian inside one', () => {
		const en = render(TreeNodeItem, { props: { node } });
		expect(en.container.querySelector('button')?.getAttribute('aria-label')).toBe('Expand');
		cleanup();

		const view = render(TreeNodeItem, { props: { node }, context: ru() });
		expect(view.container.querySelector('button')?.getAttribute('aria-label')).toBe('Развернуть');
	});
});
