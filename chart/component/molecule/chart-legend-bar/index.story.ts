import ChartLegendBar from './index.svelte';
import type { RecipeChartLegendBar } from '$stylist/chart/interface/recipe/chart-legend-bar';
import type { ContractStory } from '$stylist/html/interface/contract/story';

/** SVG legend bar; the context supplies the 320x220 `<svg>` the coordinates are laid out in. */
export default {
	component: ChartLegendBar,
	title: 'ChartLegendBar',
	description: 'SVG legend bar with connector and label.',
	args: {
		text: 'Revenue',
		value: 72,
		valueLabel: '72%',
		color: '#2563eb',
		connectorVisible: true,
		connectorWidth: 2,
		x: 130,
		y: 48,
		width: 60,
		height: 106,
		connectorX: 160,
		connectorY1: 154,
		connectorY2: 172,
		connectorTargetX: 160,
		labelX: 104,
		labelY: 172,
		labelWidth: 112,
		labelHeight: 30,
		textX: 160,
		textY: 191
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
			'aria-label': 'Chart legend bar preview'
		},
		children: [{ kind: 'outlet' }]
	}
} satisfies ContractStory<RecipeChartLegendBar>;
