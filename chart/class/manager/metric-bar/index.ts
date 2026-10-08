export class ManagerMetricBar {
	static clampPercentage(value: number): number {
		return Math.min(100, Math.max(0, value));
	}

	static resolvePercentage(props: {
		percentage?: number;
		value?: string | number;
		currentValue?: number;
		max?: number;
	}): number {
		if (typeof props.percentage === 'number') {
			return ManagerMetricBar.clampPercentage(props.percentage);
		}

		const rawValue =
			typeof props.currentValue === 'number'
				? props.currentValue
				: typeof props.value === 'number'
					? props.value
					: 0;

		const max = typeof props.max === 'number' && props.max > 0 ? props.max : 0;
		if (max === 0) return 0;

		return ManagerMetricBar.clampPercentage((rawValue / max) * 100);
	}

	static resolveValueLabel(props: {
		valueLabel?: string | number;
		value?: string | number;
		currentValue?: number;
	}): string | number {
		if (props.valueLabel !== undefined) return props.valueLabel;
		if (props.value !== undefined) return props.value;
		if (props.currentValue !== undefined) return props.currentValue;
		return 0;
	}
}
