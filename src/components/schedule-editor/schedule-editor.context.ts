import { createContext, useContext } from "react";
import type {
  ScheduleEditorConfigContextValue,
  ScheduleEditorSelectionContextValue,
} from "./schedule-editor.types";

export const ScheduleEditorConfigContext =
  createContext<ScheduleEditorConfigContextValue | null>(null);

export const ScheduleEditorSelectionContext =
  createContext<ScheduleEditorSelectionContextValue | null>(null);

export function useScheduleEditorConfigContext(): ScheduleEditorConfigContextValue {
  const context = useContext(ScheduleEditorConfigContext);
  if (!context) {
    throw new Error(
      "ScheduleEditor components must be used within <ScheduleEditor>",
    );
  }
  return context;
}

export function useScheduleEditorSelectionContext(): ScheduleEditorSelectionContextValue {
  const context = useContext(ScheduleEditorSelectionContext);
  if (!context) {
    throw new Error(
      "ScheduleEditor components must be used within <ScheduleEditor>",
    );
  }
  return context;
}
