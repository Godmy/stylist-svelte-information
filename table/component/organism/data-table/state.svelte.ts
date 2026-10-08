import type { RecipeDataTable } from '$stylist/table/interface/recipe/data-table';
import { ObjectManagerTableControls } from '$stylist/table/class/manager/table-controls';

type Row = Record<string, unknown>;

export function createDataTableState(getProps: () => RecipeDataTable<Row>) {
	const props = $derived(getProps());
	let sortKey = $state<string | null>(null);
	let sortDirection = $state<'asc' | 'desc'>('asc');

	const sort = (columnKey: string) => {
		if (sortKey === columnKey) {
			sortDirection = sortDirection === 'asc' ? 'desc' : 'asc';
			return;
		}
		sortKey = columnKey;
		sortDirection = 'asc';
	};

	const data = $derived(props.data ?? []);
	const schema = $derived(props.schema ?? []);
	const striped = $derived(props.striped ?? true);
	const hoverable = $derived(props.hoverable ?? true);
	const onRowClick = $derived(props.onRowClick);
	const className = $derived(props.class ?? '');
	const visibleSchema = $derived(schema.filter((col) => !col.hidden));
	const sortedData = $derived(ObjectManagerTableControls.sortData(data, sortKey, sortDirection));
	const rootClass = $derived(['c-data-table', className].filter(Boolean).join(' '));
	const containerStyle = $derived(
		props.maxHeight && props.maxHeight !== 'none' ? `max-height:${props.maxHeight}` : ''
	);
	const restProps = $derived.by(() => {
		const {
			data: _data,
			schema: _schema,
			striped: _striped,
			hoverable: _hoverable,
			maxHeight: _maxHeight,
			onRowClick: _onRowClick,
			class: _class,
			...rest
		} = props;
		return rest;
	});

	return {
		get data() {
			return data;
		},
		get striped() {
			return striped;
		},
		get hoverable() {
			return hoverable;
		},
		get onRowClick() {
			return onRowClick;
		},
		get className() {
			return className;
		},
		get restProps() {
			return restProps;
		},
		get sortKey() {
			return sortKey;
		},
		get sortDirection() {
			return sortDirection;
		},
		get sortedData() {
			return sortedData;
		},
		get visibleSchema() {
			return visibleSchema;
		},
		get rootClass() {
			return rootClass;
		},
		get containerStyle() {
			return containerStyle;
		},
		sort
	};
}
