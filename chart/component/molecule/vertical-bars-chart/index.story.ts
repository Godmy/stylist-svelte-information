import VerticalBarsChart from './index.svelte';
import type { RecipeVerticalBarsChart } from '$stylist/chart/interface/recipe/vertical-bars-chart';
import type { ContractStory } from '$stylist/html/interface/contract/story';

/** Compact vertical bars; the legacy per-bar sliders became static items plus a preset. */
export default {
	component: VerticalBarsChart,
	title: 'VerticalBarsChart',
	description: 'Generic compact vertical bars renderer for domain-specific chart wrappers.',
	args: {
		text: 'Distribution',
		height: 128,
		barWidth: '1.75rem',
		gap: '0.75rem',
		color: '#3b82f6',
		items: [
			{ id: 'r1', label: 'R1', valueLabel: 100, heightPercent: 100 },
			{ id: 'r2', label: 'R2', valueLabel: 67, heightPercent: 67 },
			{ id: 'r3', label: 'R3', valueLabel: 42, heightPercent: 42 }
		]
	},
	controls: {
		text: { type: 'text' },
		height: { type: 'range', min: 72, max: 260, step: 4 },
		barWidth: { type: 'text' },
		gap: { type: 'text' },
		color: { type: 'color' }
	},
	presets: {
		'Low values': {
			items: [
				{ id: 'r1', label: 'R1', valueLabel: 12, heightPercent: 12 },
				{ id: 'r2', label: 'R2', valueLabel: 4, heightPercent: 4 },
				{ id: 'r3', label: 'R3', valueLabel: 25, heightPercent: 25 }
			]
		}
	}
} satisfies ContractStory<RecipeVerticalBarsChart>;
