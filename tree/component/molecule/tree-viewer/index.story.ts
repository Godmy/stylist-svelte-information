import TreeViewer from '$stylist/tree/component/molecule/tree-viewer/index.svelte';
import type { RecipeTreeViewer } from '$stylist/tree/interface/recipe/tree-viewer';
import type { ContractStory } from '$stylist/html/interface/contract/story';

/** Tree viewer over `TreeNodeItemNode` data (key/desc/child). */
export default {
	component: TreeViewer,
	title: 'TreeViewer',
	description: 'Interactive tree viewer with hierarchical data display.',
	args: {
		tree: [
			{
				key: 'root-1',
				desc: 'System Architecture',
				child: [
					{
						key: 'module-1',
						desc: 'Authentication Module',
						child: [
							{ key: 'auth-1', desc: 'Login Component', child: [] },
							{ key: 'auth-2', desc: 'Registration Component', child: [] }
						]
					},
					{
						key: 'module-2',
						desc: 'Data Management',
						child: [
							{ key: 'data-1', desc: 'Database Layer', child: [] },
							{ key: 'data-2', desc: 'API Services', child: [] }
						]
					},
					{
						key: 'module-3',
						desc: 'UI Components',
						child: [
							{ key: 'ui-1', desc: 'Layout Components', child: [] },
							{ key: 'ui-2', desc: 'Form Components', child: [] },
							{ key: 'ui-3', desc: 'Navigation Components', child: [] }
						]
					}
				]
			},
			{
				key: 'root-2',
				desc: 'Documentation',
				child: [
					{
						key: 'doc-1',
						desc: 'API Documentation',
						child: [
							{ key: 'api-1', desc: 'User API', child: [] },
							{ key: 'api-2', desc: 'Product API', child: [] }
						]
					},
					{
						key: 'doc-2',
						desc: 'User Guides',
						child: [
							{ key: 'guide-1', desc: 'Getting Started', child: [] },
							{ key: 'guide-2', desc: 'Advanced Usage', child: [] }
						]
					}
				]
			},
			{ key: 'root-3', desc: 'Configuration', child: [] }
		]
	}
} satisfies ContractStory<RecipeTreeViewer>;
