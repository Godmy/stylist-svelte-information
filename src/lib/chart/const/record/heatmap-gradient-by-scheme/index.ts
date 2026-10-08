import type { TokenThemeScheme } from '$stylist/theme/type/alias/theme-scheme';

export const HEATMAP_GRADIENT_BY_SCHEME: Record<TokenThemeScheme, string> = {
	sunset: 'var(--gradient-sunset)',
	forest: 'var(--gradient-forest)',
	ocean: 'var(--gradient-ocean)',
	minimal: 'var(--gradient-info)',
	weoracle: 'var(--gradient-weoracle, var(--gradient-sunset))'
};
