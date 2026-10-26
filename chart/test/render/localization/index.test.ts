import { afterEach, describe, expect, it } from 'vitest';
import { cleanup, render } from '@testing-library/svelte';
import CriticalPathTimeline from '$stylist/chart/component/organism/critical-path-timeline/index.svelte';
import LegendBandDiagram from '$stylist/chart/component/organism/legend-band-diagram/index.svelte';
import RiskImpactMap from '$stylist/chart/component/organism/risk-impact-map/index.svelte';
import { ManagerLocaleContext } from '$stylist/localization/class/manager/locale-context';
import { LOCALIZATION_LOCALE_CONTEXT } from '$stylist/localization/const/value/locale-context';

afterEach(cleanup);

const ru = () =>
	new Map([[LOCALIZATION_LOCALE_CONTEXT, { ...ManagerLocaleContext.DEFAULT, locale: 'ru' }]]);

const tasks = [
	{ id: 'a', text: 'Проект', start: '2026-10-01', end: '2026-10-03', critical: true },
	{
		id: 'b',
		text: 'Монтаж',
		start: '2026-10-04',
		end: '2026-10-06',
		critical: true,
		dependsOn: ['a']
	}
];

describe('chart localization', () => {
	it('labels the timeline and formats day ticks in the provider locale', () => {
		const en = render(CriticalPathTimeline, { props: { tasks } });
		expect(en.container.querySelector('section')?.getAttribute('aria-label')).toBe(
			'Critical path timeline'
		);
		expect(en.container.textContent).toContain('Oct 1');
		cleanup();

		const view = render(CriticalPathTimeline, { props: { tasks }, context: ru() });
		expect(view.container.querySelector('section')?.getAttribute('aria-label')).toBe(
			'Критический путь'
		);
		expect(view.container.textContent).toMatch(/1 окт/);
		expect(view.container.textContent).not.toContain('Oct');
	});

	it('lets labels override content defaults', () => {
		const view = render(CriticalPathTimeline, {
			props: { tasks, labels: { critical: 'Узкое место' } },
			context: ru()
		});
		expect(view.container.textContent).toContain('Узкое место');

		const risk = render(RiskImpactMap, {
			props: {
				risks: [{ id: 'r', text: 'Сроки', probability: 0.5, impact: 0.5, exposure: 0.25 }],
				labels: { impact: 'Ущерб' }
			},
			context: ru()
		});
		expect(risk.container.textContent).toContain('Вероятность');
		expect(risk.container.textContent).toContain('Ущерб');
	});

	it('names the component levels of the band diagram in the provider locale', () => {
		const view = render(LegendBandDiagram, {
			props: { items: [{ text: 'design-system', atom: 4, molecule: 2 }] },
			context: ru()
		});
		expect(view.container.textContent).toContain('Атом');
		expect(view.container.textContent).toContain('Молекула');
		expect(
			view.container.querySelector('.legend-band-diagram__composition-segment--light')
		).toBeTruthy();
	});
});
