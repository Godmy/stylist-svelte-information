import { ClassNamesManager } from '$stylist/layout/class/manager/class-names';
import { ManagerCriticalPathTimeline } from '$stylist/chart/class/manager/critical-path-timeline';
import { useFormat } from '$stylist/localization/function/hook/use-format';
import type { RecipeCriticalPathTimeline } from '$stylist/chart/interface/recipe/critical-path-timeline';

export default function createCriticalPathTimelineState(
	getProps: () => RecipeCriticalPathTimeline
) {
	const props = $derived(getProps());
	const format = useFormat();
	const className = $derived(ClassNamesManager.merge('critical-path-timeline', props.class));
	const layout = $derived.by(() =>
		ManagerCriticalPathTimeline.createLayout(props.tasks, {
			width: props.width,
			rowHeight: props.rowHeight,
			dayWidth: props.dayWidth,
			timeLabelStep: props.timeLabelStep,
			formatTick: (date) => format.date(date, { month: 'short', day: 'numeric' })
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
