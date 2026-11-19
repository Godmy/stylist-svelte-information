import { afterEach, describe, expect, it } from 'vitest';
import { cleanup, fireEvent, render, waitFor, within } from '@testing-library/svelte';
import DataTableShell from '$stylist/table/component/organism/data-table-shell/index.svelte';

afterEach(cleanup);

const props = {
	data: [{ id: 1, name: 'Tbilisi' }],
	schema: [
		{ key: 'id', header: 'id', cell: 'text' as const },
		{ key: 'name', header: 'name', cell: 'text' as const }
	],
	title: 'cities',
	showSearch: false,
	showColumnManager: true,
	columnManagerToggle: true,
	storageKey: 'test.shell.panel',
	columnsStorageKey: 'test.shell.columns.cities'
};
const headers = (container: HTMLElement) =>
	[...container.querySelectorAll('thead th')].map((th) => th.textContent?.trim());

describe('DataTableShell column manager toggle', () => {
	it('keeps the panel closed by default and remembers it with hidden columns', async () => {
		localStorage.clear();
		const view = render(DataTableShell, { props });
		expect(view.container.querySelector('.c-data-table-shell__aside')).toBeNull();
		await fireEvent.click(view.getByRole('button', { name: /Columns/ }));
		const panel = within(view.container.querySelector<HTMLElement>('.c-data-table-shell__aside')!);
		await fireEvent.click(panel.getByLabelText('id'));
		expect(headers(view.container)).not.toContain('id');
		cleanup();

		const again = render(DataTableShell, { props });
		await waitFor(() =>
			expect(again.container.querySelector('.c-data-table-shell__aside')).not.toBeNull()
		);
		expect(headers(again.container)).not.toContain('id');
		expect(headers(again.container)).toContain('name');
	});

	it('keeps the old always-open panel without the toggle', () => {
		const view = render(DataTableShell, {
			props: { ...props, columnManagerToggle: false, storageKey: undefined }
		});
		expect(view.container.querySelector('.c-data-table-shell__aside')).not.toBeNull();
		expect(view.queryByRole('button', { name: /Columns/ })).toBeNull();
	});
});
