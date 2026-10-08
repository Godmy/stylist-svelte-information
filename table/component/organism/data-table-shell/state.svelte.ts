import type { SlotDataTableShell } from '$stylist/table/interface/slot/data-table-shell';
import { ObjectManagerTableControls } from '$stylist/table/class/manager/table-controls';

type Row = Record<string, unknown>;

export function createDataTableShellState(props: SlotDataTableShell<Row>) {
	let searchTerm = $state('');
	let pageSize = $state(props.defaultPageSize ?? 10);
	let currentPage = $state(1);
	let sortKey = $state<string | null>(null);
	let sortDirection = $state<'asc' | 'desc'>('asc');
	let pillFilters = $state<Record<string, string[]>>({});
	let columnVisibility = $state<Record<string, boolean>>(
		Object.fromEntries(props.schema.map((col) => [String(col.key), !(col.hidden ?? false)]))
	);

	const sort = (columnKey: string) => {
		if (sortKey === columnKey) {
			sortDirection = sortDirection === 'asc' ? 'desc' : 'asc';
		} else {
			sortKey = columnKey;
			sortDirection = 'asc';
		}
		currentPage = 1;
	};

	const togglePill = (columnKey: string, value: string) => {
		const current = pillFilters[columnKey] ?? [];
		const next = current.includes(value) ? current.filter((v) => v !== value) : [...current, value];
		pillFilters = { ...pillFilters, [columnKey]: next };
		currentPage = 1;
	};

	const setSearch = (value: string) => {
		searchTerm = value;
		currentPage = 1;
	};
	const setPageSize = (value: number) => {
		pageSize = value;
		currentPage = 1;
	};
	const toggleColumn = (key: string) => {
		columnVisibility = { ...columnVisibility, [key]: !columnVisibility[key] };
	};
	const setColumnVisibility = (nextVisibility: Record<string, boolean>) => {
		columnVisibility = { ...columnVisibility, ...nextVisibility };
	};
	const goPrev = () => {
		if (currentPage > 1) currentPage -= 1;
	};
	const goNext = () => {
		if (currentPage < totalPages) currentPage += 1;
	};

	const visibleSchema = $derived(
		props.schema.filter((col) => columnVisibility[String(col.key)] !== false)
	);

	const pillFilterKeys = $derived(
		props.schema.filter((col) => col.filterable === 'pills').map((col) => String(col.key))
	);

	const pillOptions = $derived(
		Object.fromEntries(
			pillFilterKeys.map((key) => [
				key,
				[...new Set(props.data.map((row) => String(row[key] ?? '')))]
			])
		)
	);

	const filtered = $derived.by(() => {
		let result = props.data;
		if (searchTerm) {
			const q = searchTerm.toLowerCase();
			result = result.filter((row) =>
				Object.values(row).some((v) =>
					String(v ?? '')
						.toLowerCase()
						.includes(q)
				)
			);
		}
		for (const [key, values] of Object.entries(pillFilters)) {
			if (values.length > 0)
				result = result.filter((row) => values.includes(String(row[key] ?? '')));
		}
		return result;
	});

	const sorted = $derived(ObjectManagerTableControls.sortData(filtered, sortKey, sortDirection));
	const totalPages = $derived(Math.max(1, Math.ceil(sorted.length / pageSize)));
	const pageData = $derived(sorted.slice((currentPage - 1) * pageSize, currentPage * pageSize));

	return {
		get searchTerm() {
			return searchTerm;
		},
		get pageSize() {
			return pageSize;
		},
		get currentPage() {
			return currentPage;
		},
		get sortKey() {
			return sortKey;
		},
		get sortDirection() {
			return sortDirection;
		},
		get pillFilters() {
			return pillFilters;
		},
		get columnVisibility() {
			return columnVisibility;
		},
		get visibleSchema() {
			return visibleSchema;
		},
		get pillOptions() {
			return pillOptions;
		},
		get filtered() {
			return filtered;
		},
		get sorted() {
			return sorted;
		},
		get totalPages() {
			return totalPages;
		},
		get pageData() {
			return pageData;
		},
		sort,
		togglePill,
		setSearch,
		setPageSize,
		toggleColumn,
		setColumnVisibility,
		goPrev,
		goNext
	};
}
