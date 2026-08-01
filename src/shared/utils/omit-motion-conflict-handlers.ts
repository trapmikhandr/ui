// react-aria's DOM handlers whose names collide with framer-motion's gesture
// callbacks — must be stripped before spreading props onto an m.div
type MotionConflictHandlers = {
  onAnimationStart?: unknown;
  onDrag?: unknown;
  onDragStart?: unknown;
  onDragEnd?: unknown;
};

export const omitMotionConflictHandlers = <T extends MotionConflictHandlers>({
  onAnimationStart: _onAnimationStart,
  onDrag: _onDrag,
  onDragStart: _onDragStart,
  onDragEnd: _onDragEnd,
  ...rest
}: T): Omit<T, keyof MotionConflictHandlers> => rest;
