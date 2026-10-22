import CriticalPathTimeline from '$stylist/chart/component/organism/critical-path-timeline/index.svelte';
import type { RecipeCriticalPathTimeline } from '$stylist/chart/interface/recipe/critical-path-timeline';
import type { ContractStory } from '$stylist/html/interface/contract/story';

/** Gantt-style work schedule with dependency chains and critical path. */
export default {
	component: CriticalPathTimeline,
	title: 'CriticalPathTimeline',
	description: 'Gantt-style work schedule with dependency chains and critical path.',
	args: {
		text: 'Work schedule estimate',
		description: 'Task chains, calendar duration, dependency links, and critical path.',
		width: 1040,
		rowHeight: 38,
		timeLabelStep: 7,
		tasks: [
			{
				id: 'survey',
				text: 'Site survey',
				start: '2026-03-02',
				end: '2026-03-06',
				progress: 1,
				critical: true
			},
			{
				id: 'design',
				text: 'Engineering package',
				start: '2026-03-09',
				end: '2026-03-20',
				progress: 0.8,
				critical: true,
				dependsOn: ['survey']
			},
			{
				id: 'permits',
				text: 'Permits',
				start: '2026-03-09',
				end: '2026-03-27',
				progress: 0.55,
				dependsOn: ['survey']
			},
			{
				id: 'procurement',
				text: 'Material procurement',
				start: '2026-03-23',
				end: '2026-04-10',
				progress: 0.42,
				critical: true,
				dependsOn: ['design']
			},
			{
				id: 'crew',
				text: 'Crew booking',
				start: '2026-03-30',
				end: '2026-04-03',
				progress: 0.6,
				dependsOn: ['permits']
			},
			{
				id: 'mobilize',
				text: 'Mobilization',
				start: '2026-04-13',
				end: '2026-04-17',
				progress: 0.2,
				critical: true,
				dependsOn: ['procurement', 'crew']
			},
			{
				id: 'install',
				text: 'Installation',
				start: '2026-04-20',
				end: '2026-05-08',
				progress: 0.05,
				critical: true,
				dependsOn: ['mobilize']
			},
			{
				id: 'qa',
				text: 'QA and handover',
				start: '2026-05-11',
				end: '2026-05-15',
				progress: 0,
				critical: true,
				dependsOn: ['install']
			}
		]
	},
	controls: {
		width: { type: 'number', min: 760, max: 1320, step: 20 },
		rowHeight: { type: 'number', min: 30, max: 56, step: 2 },
		timeLabelStep: { type: 'number', min: 1, max: 14, step: 1 }
	}
} satisfies ContractStory<RecipeCriticalPathTimeline>;
