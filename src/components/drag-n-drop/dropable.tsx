import { useDroppable } from "@dnd-kit/core";
import type { CSSProperties, PropsWithChildren } from "react";
import type { DndData } from "./types";

interface DroppableProps<T extends DndData = DndData>
  extends PropsWithChildren {
  id: string;
  data?: T;
  /**
   * @description Uses the data-over attribute for styling.
   */
  className?: string;
  style?: CSSProperties;
}

export function Droppable<T extends DndData = DndData>({
  children,
  id,
  data,
  className,
  style,
}: DroppableProps<T>) {
  const { isOver, setNodeRef } = useDroppable({
    id,
    data,
  });

  return (
    <div
      ref={setNodeRef}
      data-over={isOver}
      className={className}
      style={style}
    >
      {children}
    </div>
  );
}
