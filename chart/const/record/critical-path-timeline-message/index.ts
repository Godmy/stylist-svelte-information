/** Messages of CriticalPathTimeline; `critical` is content, overridden by labels.critical. */
export const CHART_CRITICAL_PATH_TIMELINE_MESSAGE = {
	en: {
		label: 'Critical path timeline',
		chart: 'Work schedule critical path',
		critical: 'Critical path',
		task: '{task}: {start} – {end}'
	},
	ru: {
		label: 'Критический путь',
		chart: 'Критический путь графика работ',
		critical: 'Критический путь',
		task: '{task}: {start} – {end}'
	}
} as const;
