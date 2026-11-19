import Catalog from '$stylist/tree/component/organism/catalog/index.svelte';
import type { RecipeCatalog } from '$stylist/tree/interface/recipe/catalog';
import type { ContractStory } from '$stylist/html/interface/contract/story';

/** Editable tree over flat rows linked by `parent_id`, with a field picker for row chips. */
export default {
	component: Catalog,
	title: 'Catalog',
	description: 'Expandable, searchable and editable tree built from flat catalog rows.',
	args: {
		title: 'Catalog',
		badgeKey: 'catalog_id',
		activeKey: 'is_visible',
		fields: [
			{ key: 'caption', header: 'Caption', required: true },
			{ key: 'name', header: 'Name', nullable: true },
			{ key: 'catalog_id', header: 'Type', kind: 'reference', nullable: true },
			{ key: 'parent_id', header: 'Parent', kind: 'reference', nullable: true },
			{ key: 'url', header: 'URL', nullable: true, visible: true },
			{ key: 'description', header: 'Description', kind: 'textarea' },
			{ key: 'is_visible', header: 'Visible', kind: 'boolean' },
			{ key: 'id', header: 'Id', editable: false }
		],
		rows: [
			{
				id: 'kind:project',
				name: 'project',
				parent_id: null,
				caption: 'Project',
				catalog_id: null,
				is_visible: 1
			},
			{
				id: 'hosting',
				name: 'hosting',
				parent_id: null,
				caption: 'Hosting',
				catalog_id: null,
				is_visible: 1
			},
			{
				id: 'cloudflare',
				name: 'hosting_cloudflare',
				parent_id: 'hosting',
				caption: 'Cloudflare',
				catalog_id: null,
				is_visible: 1
			},
			{
				id: 'site',
				name: 'site',
				parent_id: 'cloudflare',
				caption: 'example.com',
				catalog_id: 'kind:project',
				url: 'https://example.com',
				is_visible: 1
			},
			{ id: 'vps', name: 'vps', parent_id: null, caption: 'VPS', catalog_id: null, is_visible: 0 }
		]
	},
	controls: {
		title: { type: 'text' },
		readonly: { type: 'boolean' }
	}
} satisfies ContractStory<RecipeCatalog>;
