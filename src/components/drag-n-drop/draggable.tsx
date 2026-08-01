/** biome-ignore-all lint/suspicious/noExplicitAny: <Revisit later> */
// TODO: investigate why this does not work without `as any`.
import { useDraggable } from "@dnd-kit/core";
import {
  Children,
  cloneElement,
  isValidElement,
  type PropsWithChildren,
} from "react";
import { mergeProps } from "react-aria";
import type { DndData } from "./types";

interface DraggableProps<T extends DndData = DndData>
  extends PropsWithChildren {
  id: string;
  data?: T;
  asChild?: boolean;
  disabled?: boolean;
}

export function Draggable<T extends DndData = DndData>({
  children,
  id,
  data,
  asChild = false,
  disabled = false,
}: DraggableProps<T>) {
  const { attributes, listeners, setNodeRef, isDragging } = useDraggable({
    id,
    data,
    disabled,
  });
  // const style = transform
  //   ? {
  //       transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
  //     }
  //   : undefined;

  // Delegate rendering to the child when asChild is true.
  if (asChild) {
    const child = Children.only(children);

    if (isValidElement<any>(child)) {
      const mergedProps = mergeProps(
        listeners as any,
        attributes as any,
        child.props,
        {
          ref: setNodeRef,
          isDragging,
        },
      );

      return cloneElement(child, mergedProps);
    }
  }

  return (
    <button ref={setNodeRef} {...listeners} {...attributes}>
      {children}
    </button>
  );
}
