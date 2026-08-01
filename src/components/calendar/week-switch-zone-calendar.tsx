import { ChevronLeft, ChevronRight } from "lucide-react";
import { IconButton } from "../button";
import {
  useCalendarConfigContext,
  useCalendarEdgeNavContext,
} from "./calendar.context";
import { zone, zoneIcon } from "./week-switch-zone-calendar.css";

/**
 * Visual hint while moving an event: zones at the calendar edges indicate
 * "move here to switch the week". The width matches the detection zone in
 * handleDragMove (EDGE_NAV_ZONE_WIDTH); the active zone is highlighted and
 * animates its chevron while the week-switch timer ticks.
 */
export function WeekSwitchZones() {
  const { isEventDragging, containerRef } = useCalendarConfigContext();
  const { edgeNavDirection, isScrolledToLeft, isScrolledToRight } =
    useCalendarEdgeNavContext();

  if (!isEventDragging || !containerRef.current) return null;

  // Runtime container coordinates are the single source of zone positions.
  const rect = containerRef.current.getBoundingClientRect();

  return (
    <>
      {isScrolledToLeft && (
        <div
          className={zone({
            side: "left",
            active: edgeNavDirection === "left",
          })}
          style={{
            left: rect.left,
            width: 40,
            top: rect.top,
            height: rect.height,
          }}
          aria-hidden
        >
          <IconButton
            className={zoneIcon({
              side: "left",
            })}
            color="secondary"
            variant="standard"
            aria-label="previous week"
          >
            <ChevronLeft size={20} />
          </IconButton>
        </div>
      )}
      {isScrolledToRight && (
        <div
          className={zone({
            side: "right",
            active: edgeNavDirection === "right",
          })}
          style={{
            left: rect.right - 40,
            width: 40,
            top: rect.top,
            height: rect.height,
          }}
          aria-hidden
        >
          <IconButton
            className={zoneIcon({
              side: "right",
            })}
            color="secondary"
            variant="standard"
            aria-label="next week"
          >
            <ChevronRight size={20} />
          </IconButton>
        </div>
      )}
    </>
  );
}
