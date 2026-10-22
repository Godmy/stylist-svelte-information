import FilterPills from '$stylist/table/component/molecule/filter-pills/index.svelte';
import type { RecipeFilterPills } from '$stylist/table/interface/recipe/filter-pills';
import type { ContractStory } from '$stylist/html/interface/contract/story';

/** Pill group filter; index.story.svelte keeps the active pills the component reports. */
export default {
	component: FilterPills,
	title: 'FilterPills',
	description: 'Pill group filter for enum/category columns.',
	args: {
		columnKey: 'role',
		label: 'Role',
		options: ['Admin', 'Editor', 'Viewer', 'Guest'],
		active: []
	},
	controls: { columnKey: { type: 'text' }, label: { type: 'text' } },
	presets: { 'Editors active': { active: ['Editor'] } }
} satisfies ContractStory<RecipeFilterPills>;
