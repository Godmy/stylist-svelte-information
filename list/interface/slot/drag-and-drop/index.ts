import type { HTMLAttributes } from 'svelte/elements';
import type { TokenColorTone } from '$stylist/design-token/type/alias/color-tone';
import type { BehaviorDraggable } from '$stylist/layout/interface/behavior/draggable';
/**
 * SlotDragAndDrop — свойства перетаскивания элемента.
 *
 * LEGO-состав:
 *   BehaviorDraggable            (interaction) — dropEffect, onDrag*, onDrop
 *   HTMLAttributes<HTMLDivElement>
 */
export interface SlotDragAndDrop
	extends
		Omit<BehaviorDraggable, 'draggable' | 'dragCursor'>,
		Omit<HTMLAttributes<HTMLDivElement>, 'draggable'> {
	/** Разрешить перетаскивание */
	draggable?: boolean;
	/** Разрешить сброс элемента (drop zone) */
	dropzone?: boolean;
	/** Данные для передачи при перетаскивании */
	dragData?: any;
	/** Обработчик перетаскивания над зоной */
	onDragOver?: (event: DragEvent) => void;
	/** Блокировка перетаскивания */
	disabled?: boolean;
	/** Вариант отображения */
	variant?: TokenColorTone;
	/** Показывать индикатор перетаскивания */
	showDragHandle?: boolean;
	/** Рисовать при перетаскивании копию содержимого вместо системного снимка */
	dragPreview?: boolean;
	/** Курсор при перетаскивании */
	dragCursor?: 'grab' | 'grabbing' | 'move' | 'default';
}
