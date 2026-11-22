import { render, cleanup, fireEvent } from '@testing-library/svelte';
import { afterEach, expect, test, vi } from 'vitest';
import Panel from '$stylist/table/component/organism/table-list-panel/index.svelte';
afterEach(cleanup);
const items = [
	{ name: 'users', rowCount: 12, hasSoftDelete: false },
	{ name: 'orders', rowCount: 30, hasSoftDelete: true },
	{ name: 'audit', rowCount: 0, hasSoftDelete: false }
];
test('group headings are non-interactive and follow explicit group order, with unknown tables retained', () => {
	const onSelect = vi.fn(),
		view = render(Panel, {
			items,
			selectedName: 'users',
			onSelect,
			groups: { orders: 'Commerce', users: 'Identity' },
			showMetadata: false
		});
	expect(view.getAllByRole('heading').map((heading) => heading.textContent)).toEqual([
		'Commerce',
		'Identity',
		'Other'
	]);
	expect(view.container.querySelectorAll('.c-table-list-panel__item')).toHaveLength(3);
	expect(view.container.querySelector('.c-table-list-panel__meta')).toBeNull();
	for (const heading of view.getAllByRole('heading'))
		expect(heading.closest('button,a,[tabindex]')).toBeNull();
	expect(view.getByRole('button', { name: /users/ }).getAttribute('aria-current')).toBe('true');
	expect(onSelect).not.toHaveBeenCalled();
});
test('search hides empty groups and clears without losing the table inventory', async () => {
	const view = render(Panel, {
		items,
		selectedName: null,
		onSelect: vi.fn(),
		groups: { users: 'Identity', orders: 'Commerce', audit: 'Operations' }
	});
	const search = view.getByRole('textbox');
	await fireEvent.input(search, { target: { value: '  ORD  ' } });
	expect(view.getAllByRole('heading', { level: 3 }).map((heading) => heading.textContent)).toEqual([
		'Commerce'
	]);
	expect(view.container.querySelectorAll('.c-table-list-panel__item')).toHaveLength(1);
	await fireEvent.input(search, { target: { value: 'missing' } });
	expect(view.queryByRole('button')).toBeNull();
	expect(view.getByText('No tables found')).not.toBeNull();
	await fireEvent.input(search, { target: { value: '' } });
	expect(view.container.querySelectorAll('.c-table-list-panel__item')).toHaveLength(3);
});
test('selection, double click and Alt+Enter keep their existing actions', async () => {
	const onSelect = vi.fn(),
		onOpen = vi.fn(),
		view = render(Panel, {
			items,
			selectedName: null,
			onSelect,
			onOpen,
			groups: { users: 'Identity' }
		}),
		row = view.getByRole('button', { name: /users/ });
	await fireEvent.click(row);
	expect(onSelect).toHaveBeenCalledWith('users');
	await fireEvent.doubleClick(row);
	expect(onOpen).toHaveBeenCalledWith('users');
	onOpen.mockClear();
	await fireEvent.keyDown(row, { key: 'Enter', altKey: true });
	expect(onOpen).toHaveBeenCalledWith('users');
});
test('legacy callers retain a flat list and metadata by default', () => {
	const view = render(Panel, { items, selectedName: null, onSelect: vi.fn() });
	expect(view.getByRole('heading', { name: 'Database Tables' })).not.toBeNull();
	expect(view.queryByRole('heading', { level: 3 })).toBeNull();
	expect(view.getByText('3 tables')).not.toBeNull();
});
