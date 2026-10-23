import { fireEvent, render, screen } from '@testing-library/svelte';
import { describe, expect, it } from 'vitest';
import ImageCaptionEditorCard from '$stylist/image/component/organism/image-caption-editor-card/index.svelte';

describe('image caption editor card', () => {
	it('previews the draft, counts characters and cancels back to the saved caption', async () => {
		const { container } = render(ImageCaptionEditorCard, {
			src: '/a.jpg',
			number: 2,
			caption: 'Sigiriya',
			maxLength: 40,
			fields: { src: '/images/a.jpg' },
			fieldLabel: 'Caption of photo 2'
		});
		const field = screen.getByLabelText('Caption of photo 2') as HTMLTextAreaElement;
		const save = screen.getByRole('button', { name: 'Save' }) as HTMLButtonElement;
		expect(save.disabled).toBe(true);
		expect(container.querySelector('input[type="hidden"][name="src"]')?.getAttribute('value')).toBe(
			'/images/a.jpg'
		);

		await fireEvent.input(field, { target: { value: 'Lion rock' } });
		expect(container.querySelector('figcaption')?.textContent).toBe('Lion rock');
		expect(screen.getByText('9/40')).toBeTruthy();
		expect(save.disabled).toBe(false);

		await fireEvent.click(screen.getByRole('button', { name: 'Cancel' }));
		expect(field.value).toBe('Sigiriya');
		expect(screen.queryByRole('button', { name: 'Cancel' })).toBeNull();
	});

	it('offers restore only for an edited caption and drops the draft after a save', async () => {
		const { rerender } = render(ImageCaptionEditorCard, {
			src: '/a.jpg',
			caption: 'Old',
			resetAction: '?/reset'
		});
		expect(screen.queryByRole('button', { name: 'Restore original' })).toBeNull();

		const field = screen.getByRole('textbox') as HTMLTextAreaElement;
		await fireEvent.input(field, { target: { value: 'New' } });
		await rerender({
			src: '/a.jpg',
			caption: 'New',
			resetAction: '?/reset',
			edited: true,
			message: { ok: 'Saved' }
		});
		expect(field.value).toBe('New');
		expect((screen.getByRole('button', { name: 'Save' }) as HTMLButtonElement).disabled).toBe(true);
		expect(
			screen.getByRole('button', { name: 'Restore original' }).getAttribute('formaction')
		).toBe('?/reset');
		expect(screen.getByRole('status').textContent?.trim()).toBe('Saved');
	});
});
