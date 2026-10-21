import MetricBar from './index.svelte';
import type { RecipeMetricBar } from '$stylist/chart/interface/recipe/metric-bar';
import type { ContractStory } from '$stylist/html/interface/contract/story';

/** Single labeled progress row for compact metrics. */
export default {
	component: MetricBar,
	title: 'MetricBar',
	description: 'Single labeled progress row for compact metrics.',
	args: {
		text: 'Completion',
		percentage: 68,
		valueLabel: '68%',
		color: '#2563eb',
		trackColor: '#e5e7eb'
	},
	controls: {
		text: { type: 'text' },
		percentage: { type: 'range', min: 0, max: 100, step: 1 },
		valueLabel: { type: 'text' },
		color: { type: 'color' },
		trackColor: { type: 'color' }
	},
	presets: {
		Design: { text: 'Design', percentage: 86, valueLabel: '86%', color: '#16a34a' },
		Development: { text: 'Development', percentage: 64, valueLabel: '64%', color: '#2563eb' },
		Review: { text: 'Review', percentage: 32, valueLabel: '32%', color: '#d97706' }
	}
} satisfies ContractStory<RecipeMetricBar>;
