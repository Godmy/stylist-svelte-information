import LegendBarDiagram from '$stylist/chart/component/organism/legend-bar-diagram/index.svelte';
import type { RecipeLegendBarDiagram } from '$stylist/chart/interface/recipe/legend-bar-diagram';
import type { ContractStory } from '$stylist/html/interface/contract/story';
import domainFilesManifest from '$stylist/domain/data/json/domain-files/index.json';

/** Library file totals by domain from the generated domain-files manifest. */
export default {
	component: LegendBarDiagram,
	title: 'LegendBarDiagram',
	description: 'Library file totals by domain with displaced label cards.',
	args: {
		width: 1180,
		plotHeight: 230,
		labelAreaHeight: 170,
		color: '#2563eb',
		ariaLabel: 'Files by domain bar chart',
		items: domainFilesManifest.domains.map(
			(domain) => [domain.name, domain.fileCount] as [string, number]
		)
	},
	controls: {
		width: { type: 'number', min: 640, max: 1280, step: 20 },
		plotHeight: { type: 'number', min: 160, max: 320, step: 10 },
		labelAreaHeight: { type: 'number', min: 100, max: 240, step: 10 }
	},
	presets: {
		Sample: {
			width: 980,
			items: [
				['ai', 65],
				['animation', 48],
				['calendar', 118],
				['chart', 156],
				['control', 142],
				['domain', 97],
				['layout', 128],
				['marketing', 86],
				['navigation', 132],
				['table', 72]
			]
		}
	}
} satisfies ContractStory<RecipeLegendBarDiagram>;
