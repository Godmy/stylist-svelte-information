export class ManagerCriticalPathTimeline {
	private static parseDate(value: string): Date {
		const date = new Date(`${value}T00:00:00`);
		return Number.isNaN(date.getTime()) ? new Date('2026-01-01T00:00:00') : date;
	}

	private static formatTick(date: Date): string {
		return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
	}

	private static addDays(date: Date, days: number): Date {
		const nextDate = new Date(date);
		nextDate.setDate(nextDate.getDate() + days);
		return nextDate;
	}

	private static diffDays(start: Date, end: Date): number {
		return Math.round((end.getTime() - start.getTime()) / 86400000);
	}

	static createLayout(
		tasks: {
			id: string;
			text: string;
			start: string;
			end: string;
			group?: string;
			progress?: number;
			critical?: boolean;
			dependsOn?: string[];
		}[],
		options: {
			width?: number;
			rowHeight?: number;
			dayWidth?: number;
			timeLabelStep?: number;
		} = {}
	): {
		width: number;
		height: number;
		plotX: number;
		plotY: number;
		plotWidth: number;
		rowHeight: number;
		ticks: { id: string; x: number; label: string; showLabel: boolean }[];
		tasks: {
			id: string;
			text: string;
			group: string;
			x: number;
			y: number;
			width: number;
			height: number;
			progressWidth: number;
			critical: boolean;
			startLabel: string;
			endLabel: string;
		}[];
		links: {
			id: string;
			path: string;
			critical: boolean;
		}[];
		criticalPathLabel: string;
	} {
		const width = options.width ?? 1120;
		const rowHeight = options.rowHeight ?? 38;
		const plotX = 184;
		const plotY = 52;
		const taskHeight = 18;
		const dayWidth = options.dayWidth ?? 18;
		const timeLabelStep = Math.max(1, options.timeLabelStep ?? 7);
		const parsedTasks = tasks.map((task) => ({
			...task,
			startDate: ManagerCriticalPathTimeline.parseDate(task.start),
			endDate: ManagerCriticalPathTimeline.parseDate(task.end)
		}));
		const minDate = parsedTasks.reduce(
			(minimum, task) => (task.startDate < minimum ? task.startDate : minimum),
			parsedTasks[0]?.startDate ?? new Date('2026-01-01T00:00:00')
		);
		const maxDate = parsedTasks.reduce(
			(maximum, task) => (task.endDate > maximum ? task.endDate : maximum),
			parsedTasks[0]?.endDate ?? new Date('2026-01-01T00:00:00')
		);
		const totalDays = Math.max(1, ManagerCriticalPathTimeline.diffDays(minDate, maxDate) + 1);
		const plotWidth = Math.max(width - plotX - 32, totalDays * dayWidth);
		const scaleX = (date: Date) =>
			plotX + (ManagerCriticalPathTimeline.diffDays(minDate, date) / totalDays) * plotWidth;
		const layoutTasks = parsedTasks.map((task, index) => {
			const taskX = scaleX(task.startDate);
			const taskEndX = scaleX(ManagerCriticalPathTimeline.addDays(task.endDate, 1));
			return {
				id: task.id,
				text: task.text,
				group: task.group ?? 'Work',
				x: taskX,
				y: plotY + index * rowHeight + (rowHeight - taskHeight) / 2,
				width: Math.max(8, taskEndX - taskX),
				height: taskHeight,
				progressWidth: Math.max(0, Math.min(1, task.progress ?? 0)) * Math.max(8, taskEndX - taskX),
				critical: task.critical ?? false,
				startLabel: task.start,
				endLabel: task.end
			};
		});
		const taskById = new Map(layoutTasks.map((task) => [task.id, task]));
		const links = parsedTasks.flatMap((task) =>
			(task.dependsOn ?? []).flatMap((dependencyId) => {
				const fromTask = taskById.get(dependencyId);
				const toTask = taskById.get(task.id);
				if (!fromTask || !toTask) return [];
				const startX = fromTask.x + fromTask.width;
				const startY = fromTask.y + fromTask.height / 2;
				const endX = toTask.x;
				const endY = toTask.y + toTask.height / 2;
				const elbowX = Math.max(startX + 16, (startX + endX) / 2);
				return [
					{
						id: `${dependencyId}-${task.id}`,
						path: `M ${startX} ${startY} H ${elbowX} V ${endY} H ${endX}`,
						critical: Boolean(fromTask.critical && toTask.critical)
					}
				];
			})
		);
		const ticks = Array.from({ length: totalDays + 1 }, (_, index) => {
			const date = ManagerCriticalPathTimeline.addDays(minDate, index);
			return {
				id: `tick-${index}`,
				x: plotX + (plotWidth * index) / totalDays,
				label: ManagerCriticalPathTimeline.formatTick(date),
				showLabel: index % timeLabelStep === 0 || index === totalDays
			};
		});

		return {
			width,
			height: plotY + tasks.length * rowHeight + 46,
			plotX,
			plotY,
			plotWidth,
			rowHeight,
			ticks,
			tasks: layoutTasks,
			links,
			criticalPathLabel: layoutTasks
				.filter((task) => task.critical)
				.map((task) => task.text)
				.join(' -> ')
		};
	}
}
