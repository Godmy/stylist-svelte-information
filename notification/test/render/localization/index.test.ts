import { afterEach, describe, expect, it } from 'vitest';
import { cleanup, render } from '@testing-library/svelte';
import NotificationCenter from '$stylist/notification/component/organism/notification-center/index.svelte';
import ErrorMessage from '$stylist/notification/component/atom/error-message/index.svelte';
import MessageTimestamp from '$stylist/notification/component/atom/message-timestamp/index.svelte';
import { ManagerLocaleContext } from '$stylist/localization/class/manager/locale-context';
import { LOCALIZATION_LOCALE_CONTEXT } from '$stylist/localization/const/value/locale-context';

afterEach(cleanup);

const ru = () =>
	new Map([
		[
			LOCALIZATION_LOCALE_CONTEXT,
			{ ...ManagerLocaleContext.DEFAULT, locale: 'ru', timeZone: 'UTC' }
		]
	]);

describe('notification localization', () => {
	it('speaks English without a provider and Russian inside one', () => {
		const props = { notifications: [], onMarkAllRead: () => {}, onFetchMore: () => {} };
		const en = render(NotificationCenter, { props });
		expect(en.container.textContent).toContain('Notification Center');
		expect(en.container.textContent).toContain('No notifications yet.');
		cleanup();

		const view = render(NotificationCenter, { props, context: ru() });
		expect(view.container.textContent).toContain('Центр уведомлений');
		expect(view.container.textContent).toContain('Уведомлений пока нет.');
		expect(view.container.textContent).toContain('Загрузить ещё');
	});

	it('lets the text prop win over the catalog', () => {
		const view = render(ErrorMessage, {
			props: { error: new Error(''), text: 'Сбой оплаты', onRetry: () => {} },
			context: ru()
		});
		expect(view.container.textContent).toContain('Сбой оплаты');
		expect(view.container.textContent).toContain('Произошла неизвестная ошибка');
		expect(view.getByRole('button').getAttribute('aria-label')).toBe('Повторить действие');
	});

	it('formats relative and yesterday timestamps in the provider locale', () => {
		const minutesAgo = render(MessageTimestamp, {
			props: { timestamp: new Date(Date.now() - 5 * 60000), showRelative: true },
			context: ru()
		});
		expect(minutesAgo.container.textContent).toContain('5 минут назад');
		cleanup();

		const yesterday = new Date();
		yesterday.setDate(yesterday.getDate() - 1);
		const view = render(MessageTimestamp, { props: { timestamp: yesterday }, context: ru() });
		expect(view.container.textContent).toMatch(/^\s*вчера, \d{2}:\d{2}\s*$/);
	});
});
