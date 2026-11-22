import { afterEach, describe, expect, it, vi } from 'vitest';
import { cleanup, fireEvent, render, waitFor, within } from '@testing-library/svelte';
import Catalog from '$stylist/tree/component/organism/catalog/index.svelte';
import type { CatalogField } from '$stylist/tree/type/object/catalog-field';

afterEach(cleanup);

const rows = [
	{ id: 'kind:project', parent_id: null, caption: 'Проект', catalog_id: null, is_visible: 1 },
	{ id: 'vps', parent_id: null, caption: 'VPS', catalog_id: null, is_visible: 1 },
	{ id: 'aeza', parent_id: 'vps', caption: 'aeza', catalog_id: null, is_visible: 0 },
	{
		id: 'site',
		parent_id: 'aeza',
		caption: 'myspanish.space',
		catalog_id: 'kind:project',
		is_visible: 1
	}
];
const fields: CatalogField[] = [
	{ key: 'caption', header: 'Caption', required: true },
	{ key: 'catalog_id', header: 'Type', kind: 'reference', nullable: true },
	{ key: 'parent_id', header: 'Parent', kind: 'reference', nullable: true },
	{ key: 'is_visible', header: 'Visible', kind: 'boolean' },
	{ key: 'id', header: 'Id', editable: false }
];
const editor = (container: HTMLElement) =>
	within(container.querySelector<HTMLElement>('.c-catalog__form')!);
const labels = (container: HTMLElement) =>
	[...container.querySelectorAll('.c-catalog__label')].map((node) => node.textContent);

describe('Catalog', () => {
	it('expands branches, shows the type badge and saves only changed columns', async () => {
		const onSave = vi.fn(async () => undefined);
		const view = render(Catalog, { props: { rows, fields, badgeKey: 'catalog_id', onSave } });
		// Every branch starts collapsed.
		expect(labels(view.container)).toEqual(['VPS', 'Проект']);
		await fireEvent.click(view.getByText('Expand all'));
		expect(labels(view.container)).toContain('myspanish.space');
		expect(view.container.querySelector('.c-catalog__badge')?.textContent).toBe('Проект');

		await fireEvent.click(view.getByText('aeza'));
		const parent = editor(view.container).getByLabelText(/Parent/) as HTMLSelectElement;
		// A row cannot move under itself or its subtree.
		const choices = [...parent.options].map((option) => option.value);
		expect(choices).not.toContain('aeza');
		expect(choices).not.toContain('site');
		await fireEvent.change(parent, { target: { value: '' } });
		await fireEvent.click(editor(view.container).getByLabelText(/Visible/));
		await fireEvent.click(view.getByText('Save'));
		await waitFor(() =>
			expect(onSave).toHaveBeenCalledWith('aeza', { parent_id: null, is_visible: 1 })
		);
	});

	it('filters by search and blocks an empty required field', async () => {
		const onSave = vi.fn();
		const view = render(Catalog, { props: { rows, fields, onSave } });
		const search = view.getByPlaceholderText(/Caption/);
		await fireEvent.input(search, { target: { value: 'spanish' } });
		expect(labels(view.container)).toEqual(['VPS', 'aeza', 'myspanish.space']);
		await fireEvent.click(view.getByText('myspanish.space'));
		await fireEvent.input(editor(view.container).getByLabelText(/^Caption/), {
			target: { value: ' ' }
		});
		await fireEvent.click(view.getByText('Save'));
		expect(view.getByRole('alert').textContent).toContain('Caption');
		expect(onSave).not.toHaveBeenCalled();
	});

	it('hides the label panel by default and remembers it with the chosen labels', async () => {
		localStorage.removeItem('test.catalog');
		const props = { rows, fields, storageKey: 'test.catalog' };
		const view = render(Catalog, { props });
		expect(view.container.querySelector('.c-catalog__fields')).toBeNull();
		const toggle = view.getByRole('button', { name: /Labels/ });
		expect(toggle.getAttribute('aria-pressed')).toBe('false');
		await fireEvent.click(toggle);
		const panel = within(view.container.querySelector<HTMLElement>('.c-catalog__fields')!);
		await fireEvent.click(panel.getByLabelText('Type'));
		expect(JSON.parse(localStorage.getItem('test.catalog')!)).toEqual({
			open: true,
			visibility: { catalog_id: true, parent_id: false, is_visible: false, id: false }
		});
		cleanup();

		const again = render(Catalog, { props });
		await waitFor(() => expect(again.container.querySelector('.c-catalog__fields')).not.toBeNull());
		expect(
			(
				within(again.container.querySelector<HTMLElement>('.c-catalog__fields')!).getByLabelText(
					'Type'
				) as HTMLInputElement
			).checked
		).toBe(true);
	});
	it('toggles visibility with the eye button instead of striking rows out', async () => {
		const onSave = vi.fn(async () => undefined);
		const view = render(Catalog, { props: { rows, fields, activeKey: 'is_visible', onSave } });
		await fireEvent.click(view.getByText('Expand all'));
		const hidden = view.getByRole('button', { name: 'Show «aeza»' });
		expect(hidden.getAttribute('aria-pressed')).toBe('false');
		expect(view.getByRole('button', { name: 'Hide «VPS»' }).getAttribute('aria-pressed')).toBe(
			'true'
		);
		const label = view.getByText('aeza');
		expect(getComputedStyle(label).textDecorationLine).not.toContain('line-through');

		await fireEvent.click(hidden);
		await waitFor(() => expect(onSave).toHaveBeenCalledWith('aeza', { is_visible: 1 }));
		await fireEvent.click(view.getByRole('button', { name: 'Hide «VPS»' }));
		await waitFor(() => expect(onSave).toHaveBeenCalledWith('vps', { is_visible: 0 }));
	});

	it('shows the eye without a button when read-only', async () => {
		const view = render(Catalog, { props: { rows, fields, activeKey: 'is_visible' } });
		await fireEvent.click(view.getByText('Expand all'));
		expect(view.queryByRole('button', { name: /Show|Hide/ })).toBeNull();
		expect(view.getAllByRole('img', { name: 'Hidden' })).toHaveLength(1);
	});
});
