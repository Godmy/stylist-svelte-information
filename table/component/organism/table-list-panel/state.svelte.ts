import { TABLE_TABLE_LIST_PANEL_MESSAGE } from '$stylist/table/const/record/table-list-panel-message';
import { useMessage } from '$stylist/localization/function/hook/use-message';
import type { RecipeTableListPanel } from '$stylist/table/interface/recipe/table-list-panel';
export function createTableListPanelState(getProps: () => RecipeTableListPanel) {
	const props = $derived(getProps());
	const t = useMessage('table-list-panel', TABLE_TABLE_LIST_PANEL_MESSAGE);
	let searchQuery = $state('');
	const filteredItems = $derived.by(() => {
		const query = searchQuery.trim().toLowerCase();
		return query
			? props.items.filter((item) => item.name.toLowerCase().includes(query))
			: props.items;
	});
	const sections = $derived.by(() => {
		if (!props.groups) return [{ label: '', items: filteredItems }];
		const groups = new Map<string, typeof props.items>();
		for (const label of Object.values(props.groups)) if (!groups.has(label)) groups.set(label, []);
		for (const item of filteredItems) {
			const label = props.groups[item.name] ?? t('ungrouped');
			if (!groups.has(label)) groups.set(label, []);
			groups.get(label)!.push(item);
		}
		return [...groups]
			.filter(([, items]) => items.length > 0)
			.map(([label, items]) => ({ label, items }));
	});
	function openWithKeyboard(event: KeyboardEvent, name: string) {
		if (event.key === 'Enter' && event.altKey) {
			event.preventDefault();
			props.onOpen?.(name);
		}
	}
	return {
		t,
		get sections() {
			return sections;
		},
		get filteredItems() {
			return filteredItems;
		},
		get searchQuery() {
			return searchQuery;
		},
		set searchQuery(value: string) {
			searchQuery = value;
		},
		openWithKeyboard
	};
}
export default createTableListPanelState;
