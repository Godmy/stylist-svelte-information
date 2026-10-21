import ChartLegendBand from './index.svelte';
import type { RecipeChartLegendBand } from '$stylist/chart/interface/recipe/chart-legend-band';
import type { ContractStory } from '$stylist/html/interface/contract/story';

/** SVG legend band; the context supplies the 320x220 `<svg>` the coordinates are laid out in. */
export default {
	component: ChartLegendBand,
	title: 'ChartLegendBand',
	description: 'SVG legend band with stacked segments, connector, and label.',
	args: {
		text: 'Pipeline',
		value: 84,
		valueLabel: '84%',
		color: '#2563eb',
		connectorVisible: true,
		connectorWidth: 2,
		x: 122,
		y: 42,
		width: 76,
		height: 112,
		connectorX: 160,
		connectorY1: 154,
		connectorY2: 172,
		labelX: 104,
		labelY: 172,
		labelWidth: 112,
		labelHeight: 30,
		textX: 160,
		textY: 191,
		segments: [
			{
				id: 's1',
				text: 'Ready',
				value: 24,
				color: '#22c55e',
				x: 122,
				y: 42,
				width: 76,
				height: 28
			},
			{
				id: 's2',
				text: 'Active',
				value: 36,
				color: '#2563eb',
				x: 122,
				y: 70,
				width: 76,
				height: 42
			},
			{
				id: 's3',
				text: 'Blocked',
				value: 14,
				color: '#ef4444',
				x: 122,
				y: 112,
				width: 76,
				height: 18
			},
			{
				id: 's4',
				text: 'Review',
				value: 10,
				color: '#f59e0b',
				x: 122,
				y: 130,
				width: 76,
				height: 24
			}
		]
	},
	controls: {
		text: { type: 'text' },
		value: { type: 'number' },
		valueLabel: { type: 'text' },
		color: { type: 'color' },
		connectorVisible: { type: 'boolean' },
		connectorWidth: { type: 'range', min: 1, max: 6, step: 1 }
	},
	context: {
		kind: 'element',
		tag: 'svg',
		attrs: {
			width: 320,
			height: 220,
			viewBox: '0 0 320 220',
			role: 'img',
			'aria-label': 'Chart legend band preview'
		},
		children: [{ kind: 'outlet' }]
	}
} satisfies ContractStory<RecipeChartLegendBand>;
