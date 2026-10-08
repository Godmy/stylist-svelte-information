import { ClassNamesManager } from '$stylist/layout/class/manager/class-names';
import type { RecipeAlert } from '$stylist/notification/interface/recipe/alert';

export function createAlertState(getProps: () => RecipeAlert) {
	const props = $derived(getProps());
	const iconMap = {
		info: 'info',
		success: 'check-circle',
		warning: 'alert-triangle',
		error: 'x-circle',
		danger: 'x-circle',
		primary: 'info',
		secondary: 'info'
	} as const;

	const variant = $derived(props.variant ?? 'info');
	const IconComponent = $derived(iconMap[variant as keyof typeof iconMap] ?? 'info');
	const XIcon = 'x';

	const alertClasses = $derived(
		ClassNamesManager.join('alert-container', `variant-${variant}`, props.class ?? '')
	);
	const iconContainerClasses = $derived('alert-icon-wrap');
	const iconClasses = $derived(ClassNamesManager.join('alert-icon', `variant-${variant}`));
	const textContainerClasses = $derived('alert-text');
	const titleClasses = $derived('alert-title');
	const contentContainerClasses = $derived('alert-description');
	const mainContainerClasses = $derived('alert-content');
	const closeButtonContainerClasses = $derived('alert-close');
	const closeButtonClasses = $derived(
		ClassNamesManager.join('alert-close-button', `variant-${variant}`)
	);

	let open = $state(true);

	function handleClose() {
		open = false;
	}

	return {
		get IconComponent() {
			return IconComponent;
		},
		get XIcon() {
			return XIcon;
		},
		get alertClasses() {
			return alertClasses;
		},
		get iconContainerClasses() {
			return iconContainerClasses;
		},
		get iconClasses() {
			return iconClasses;
		},
		get textContainerClasses() {
			return textContainerClasses;
		},
		get titleClasses() {
			return titleClasses;
		},
		get contentContainerClasses() {
			return contentContainerClasses;
		},
		get mainContainerClasses() {
			return mainContainerClasses;
		},
		get closeButtonContainerClasses() {
			return closeButtonContainerClasses;
		},
		get closeButtonClasses() {
			return closeButtonClasses;
		},
		get open() {
			return open;
		},
		handleClose
	};
}
