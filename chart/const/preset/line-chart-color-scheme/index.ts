export const LINE_CHART_COLOR_SCHEME = {
	default: [
		'var(--color-primary-500)',
		'var(--color-success-500)',
		'var(--color-error-500)',
		'var(--color-warning-500)',
		'var(--color-secondary-500)',
		'var(--color-danger-500)'
	],
	warm: [
		'var(--color-danger-400)',
		'var(--color-warning-500)',
		'var(--color-warning-400)',
		'var(--color-warning-300)',
		'var(--color-warning-200)'
	],
	cool: [
		'var(--color-primary-400)',
		'var(--color-success-400)',
		'var(--color-success-300)',
		'var(--color-info-400)',
		'var(--color-info-300)'
	],
	neutral: [
		'var(--color-text-tertiary)',
		'var(--color-text-secondary)',
		'var(--color-border-secondary)',
		'var(--color-border-primary)',
		'var(--color-background-tertiary)'
	]
} as const;
