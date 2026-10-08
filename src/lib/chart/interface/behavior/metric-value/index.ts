/** Атомарные значения метрики без UI-обвязки */
export interface BehaviorMetricValue {
	value?: string | number;
	currentValue?: number;
	targetValue?: number;
	max?: number;
	percentage?: number;
	unit?: string;
}
