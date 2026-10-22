import LegendBandDiagram from '$stylist/chart/component/organism/legend-band-diagram/index.svelte';
import type { RecipeLegendBandDiagram } from '$stylist/chart/interface/recipe/legend-band-diagram';
import type { ContractStory } from '$stylist/html/interface/contract/story';
import domainFilesManifest from '$stylist/domain/data/json/domain-files/index.json';

/** Library component composition by domain from the generated domain-files manifest. */
export default {
	component: LegendBandDiagram,
	title: 'LegendBandDiagram',
	description: 'Library component composition bands by domain.',
	args: {
		width: 1180,
		plotHeight: 230,
		labelAreaHeight: 170,
		color: '#2563eb',
		ariaLabel: 'Components by domain band chart',
		items: domainFilesManifest.domains.map((domain) => ({
			text: domain.name,
			...domain.components
		}))
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
				{ text: 'ai', atom: 0, molecule: 2, organism: 6, template: 0, page: 0 },
				{ text: 'animation', atom: 8, molecule: 1, organism: 0, template: 0, page: 0 },
				{ text: 'calendar', atom: 4, molecule: 9, organism: 5, template: 1, page: 0 },
				{ text: 'chart', atom: 14, molecule: 10, organism: 8, template: 0, page: 0 },
				{ text: 'control', atom: 18, molecule: 9, organism: 2, template: 0, page: 0 },
				{ text: 'domain', atom: 2, molecule: 7, organism: 12, template: 2, page: 1 },
				{ text: 'layout', atom: 9, molecule: 11, organism: 2, template: 0, page: 0 },
				{ text: 'navigation', atom: 12, molecule: 7, organism: 5, template: 1, page: 0 }
			]
		}
	}
} satisfies ContractStory<RecipeLegendBandDiagram>;
