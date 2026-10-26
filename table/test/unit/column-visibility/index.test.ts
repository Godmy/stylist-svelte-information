import { afterEach, describe, expect, it, vi } from 'vitest';
import { createColumnVisibility } from '$stylist/table/function/state/column-visibility/state.svelte';

describe('createColumnVisibility', () => {
	afterEach(() => {
		localStorage.clear();
		vi.restoreAllMocks();
	});

	it('remembers hidden columns per key and restores them', () => {
		const first = createColumnVisibility(() => 'columns:a');
		first.set(['notes', 'hotel', 'notes']);
		expect(first.hidden).toEqual(['notes', 'hotel']);
		expect(JSON.parse(localStorage.getItem('columns:a') ?? '')).toEqual(['notes', 'hotel']);

		const again = createColumnVisibility(() => 'columns:a');
		expect(again.hidden).toEqual([]);
		again.restore();
		expect(again.isHidden('hotel')).toBe(true);

		const other = createColumnVisibility(() => 'columns:b');
		other.restore();
		expect(other.hidden).toEqual([]);
	});

	it('toggles a column', () => {
		const state = createColumnVisibility(() => 'columns:t');
		state.toggle('voucher');
		expect(state.hidden).toEqual(['voucher']);
		state.toggle('voucher');
		expect(state.hidden).toEqual([]);
	});

	it('ignores broken or foreign saved values', () => {
		localStorage.setItem('columns:x', '{not json');
		const broken = createColumnVisibility(() => 'columns:x');
		broken.restore();
		expect(broken.hidden).toEqual([]);

		localStorage.setItem('columns:y', JSON.stringify(['ok', 3, null]));
		const mixed = createColumnVisibility(() => 'columns:y');
		mixed.restore();
		expect(mixed.hidden).toEqual(['ok']);
	});

	it('keeps the choice in memory when storage throws', () => {
		vi.spyOn(Storage.prototype, 'setItem').mockImplementation(() => {
			throw new Error('private mode');
		});
		const state = createColumnVisibility(() => 'columns:p');
		state.set(['tour']);
		expect(state.hidden).toEqual(['tour']);
	});
});
