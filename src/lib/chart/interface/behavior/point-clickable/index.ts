export interface BehaviorPointClickable<TPoint, TContext = void> {
	onPointClick?: (item: TPoint, context?: TContext) => void;
}
