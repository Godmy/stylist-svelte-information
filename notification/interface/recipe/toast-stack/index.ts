import type { SlotToast } from '$stylist/notification/interface/slot/toast';
import type { SlotClass } from '$stylist/theme/interface/slot/class';
import type { ComputeIntersectAll } from '$stylist/theme/type/compute/intersect-all';
import type { HTMLAttributes } from 'svelte/elements';

export interface RecipeToastStack extends ComputeIntersectAll<
	[
		{
			toasts?: SlotToast[];
			position?:
				'top-right' | 'top-left' | 'bottom-right' | 'bottom-left' | 'top-center' | 'bottom-center';
			maxToasts?: number;
			onDismissAll?: () => void;
			dismissAllLabel?: string;
			toastClass?: string;
		},
		SlotClass,
		HTMLAttributes<HTMLDivElement>
	]
> {}
