import { ManagerChartLegendBand } from '$stylist/chart/class/manager/chart-legend-band';
import { ClassNamesManager } from '$stylist/layout/class/manager/class-names';
import { CHART_LEGEND_BAND_DIAGRAM_MESSAGE } from '$stylist/chart/const/record/legend-band-diagram-message';
import { useMessage } from '$stylist/localization/function/hook/use-message';
import type { RecipeLegendBandDiagram } from '$stylist/chart/interface/recipe/legend-band-diagram';

export default function createLegendBandDiagramState(getProps: () => RecipeLegendBandDiagram) {
	const props = $derived(getProps());
	const t = useMessage('legend-band-diagram', CHART_LEGEND_BAND_DIAGRAM_MESSAGE);
	const className = $derived(ClassNamesManager.merge('legend-band-diagram', props.class));
	const layout = $derived.by(() =>
		ManagerChartLegendBand.createLayout(props.items, {
			// Component levels are content: the catalog gives defaults, `labels` overrides them.
			sectionLabels: {
				atom: props.labels?.atom ?? t('atom'),
				molecule: props.labels?.molecule ?? t('molecule'),
				organism: props.labels?.organism ?? t('organism'),
				template: props.labels?.template ?? t('template'),
				page: props.labels?.page ?? t('page')
			},
			width: props.width,
			height: props.height,
			plotHeight: props.plotHeight,
			labelAreaHeight: props.labelAreaHeight,
			bandWidth: props.bandWidth,
			minValue: props.minValue,
			maxValue: props.maxValue,
			tickCount: props.tickCount,
			color: props.color
		})
	);

	return {
		get className() {
			return className;
		},
		get layout() {
			return layout;
		}
	};
}
