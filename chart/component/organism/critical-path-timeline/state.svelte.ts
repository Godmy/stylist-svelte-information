import { ClassNamesManager } from '$stylist/layout/class/manager/class-names';
import { ManagerCriticalPathTimeline } from '$stylist/chart/class/manager/critical-path-timeline';
import type { RecipeCriticalPathTimeline } from '$stylist/chart/interface/recipe/critical-path-timeline';

export default function createCriticalPathTimelineState(getProps: () => RecipeCriticalPathTimeline) {
	const props = $derived(getProps());
	const className = $derived(ClassNamesManager.merge('critical-path-timeline', props.class));
	const layout = $derived.by(() =>
		ManagerCriticalPathTimeline.createLayout(props.tasks, {
			width: props.width,
			rowHeight: props.rowHeight,
			dayWidth: props.dayWidth,
			timeLabelStep: props.timeLabelStep
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
