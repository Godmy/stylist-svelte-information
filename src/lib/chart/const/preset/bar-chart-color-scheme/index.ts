import type { TokenThemeScheme } from '$stylist/theme/type/alias/theme-scheme';

export const BAR_CHART_COLOR_SCHEME = {
	minimal: [
		'var(--color-primary-500)',
		'var(--color-success-500)',
		'var(--color-error-500)',
		'var(--color-warning-500)',
		'var(--color-info-500)',
		'var(--color-secondary-500)'
	],
	ocean: [
		'var(--color-primary-400)',
		'var(--color-info-400)',
		'var(--color-secondary-400)',
		'var(--color-success-300)',
		'var(--color-info-300)'
	],
	forest: [
		'var(--color-success-600)',
		'var(--color-success-500)',
		'var(--color-success-400)',
		'var(--color-neutral-500)',
		'var(--color-neutral-400)'
	],
	sunset: [
		'var(--color-danger-400)',
		'var(--color-error-500)',
		'var(--color-warning-400)',
		'var(--color-warning-500)',
		'var(--color-warning-200)'
	],
	weoracle: [
		'var(--color-primary-500)',
		'var(--color-secondary-500)',
		'var(--color-info-500)',
		'var(--color-success-500)',
		'var(--color-warning-500)'
	]
} as const satisfies Record<TokenThemeScheme, readonly string[]>;
