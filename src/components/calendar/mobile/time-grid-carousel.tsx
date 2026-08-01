import { useDrag } from "@use-gesture/react";
// LazyMotion + m instead of motion: only the domAnimation core enters the bundle.
import {
  animate,
  domAnimation,
  LazyMotion,
  m,
  useMotionValue,
} from "motion/react";
import {
  type RefObject,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import type {
  DateString,
  TimeString,
  WorkingHoursConfig,
} from "../calendar.types";
import { zonedNow } from "../calendar.utils";
import type { DayEventInterval, StripMode } from "./mobile.types";
import { VISIBLE_COLUMNS } from "./mobile.types";
import {
  addWallDays,
  diffWallDays,
  toDateString,
  wallMinutesOfDay,
} from "./mobile.utils";
import { resolveSnapShift, rubberband } from "./strip-physics";
import {
  MobileDayColumn,
  MobileHeaderDayCell,
  MobileTimeColumn,
} from "./time-grid";
import {
  bodyTrack,
  bodyViewport,
  gridRoot,
  headerCorner,
  headerRow,
  headerTrack,
  headerViewport,
  scrollContainer,
} from "./time-grid.css";
import { HOUR_HEIGHT_VAR_NAME, usePinchZoom } from "./use-pinch-zoom";

const EMPTY_INTERVALS: DayEventInterval[] = [];

const SNAP_SPRING = { stiffness: 400, damping: 40 } as const;

export interface TimeGridCarouselProps {
  mode: StripMode;
  /** Wall-clock date of the first visible column (start of day/week). */
  anchor: Date;
  timezone: string;
  eventsByDay: Map<DateString, DayEventInterval[]>;
  workingHours: WorkingHoursConfig | null;
  minDate?: DateString;
  defaultHourHeight: number;
  /** Current hour height, shared with the parent's dnd calculations. */
  hourHeightRef: { current: number };
  /** Scroll container and column viewport; refs belong to the parent because
   * dnd calculations use the same coordinate system. */
  scrollRef: RefObject<HTMLDivElement | null>;
  bodyViewportRef: RefObject<HTMLDivElement | null>;
  /** true — an event is being dragged and the carousel swipe is frozen. */
  isEventDragging: boolean;
  onShiftDays: (days: number) => void;
  onEventClick?: (eventId: string, target: HTMLElement) => void;
  onSlotClick?: (date: DateString, time: TimeString) => void;
}

/**
 * Virtualized infinite day carousel: three pages are rendered
 * (prev/current/next), the finger moves the transform without a re-render,
 * and after snapping the anchor shifts while the track instantly returns to buffer center.
 */
export function TimeGridCarousel({
  mode,
  anchor,
  timezone,
  eventsByDay,
  workingHours,
  minDate,
  defaultHourHeight,
  hourHeightRef,
  scrollRef,
  bodyViewportRef,
  isEventDragging,
  onShiftDays,
  onEventClick,
  onSlotClick,
}: TimeGridCarouselProps) {
  const cols = VISIBLE_COLUMNS[mode];
  const totalCols = cols * 3;
  const colWidthPct = 100 / totalCols;

  const dates = useMemo(() => {
    const stripStart = addWallDays(anchor, -cols);
    return Array.from({ length: totalCols }, (_, i) =>
      addWallDays(stripStart, i),
    );
  }, [anchor, cols, totalCols]);

  const rootRef = useRef<HTMLDivElement>(null);
  const [pageWidth, setPageWidth] = useState(0);

  useEffect(() => {
    const el = bodyViewportRef.current;
    if (!el) return;
    const observer = new ResizeObserver((entries) => {
      setPageWidth(entries[0].contentRect.width);
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, [bodyViewportRef]);

  // Translated into both track transforms (header + grid) without React.
  const x = useMotionValue(0);
  const animationRef = useRef<ReturnType<typeof animate> | null>(null);

  const isEventDraggingRef = useRef(isEventDragging);
  useEffect(() => {
    isEventDraggingRef.current = isEventDragging;
  }, [isEventDragging]);

  // Return the track to rest: after the shift commit (anchor change), content
  // already reflects the new date, so the jump happens before the frame is painted.
  const anchorKey = toDateString(anchor);
  // biome-ignore lint/correctness/useExhaustiveDependencies: anchorKey is intentional; the jump must happen when the anchor changes.
  useLayoutEffect(() => {
    animationRef.current?.stop();
    x.jump(-pageWidth);
  }, [anchorKey, pageWidth, x]);

  useDrag<number | undefined>(
    ({
      first,
      last,
      movement: [mx],
      velocity: [vx],
      direction: [dx],
      cancel,
      memo,
    }) => {
      if (pageWidth <= 0) return memo;
      if (isEventDraggingRef.current) {
        if (!last) cancel();
        return memo;
      }

      let base = memo;
      if (first || base === undefined) {
        animationRef.current?.stop();
        base = x.get();
      }

      if (!last) {
        // The finger moves the track 1:1; beyond buffer bounds, apply elastic resistance.
        x.set(rubberband(base + mx, -2 * pageWidth, 0));
        return base;
      }

      const movementFromRest = x.get() + pageWidth;
      const signedVelocity = vx * dx;

      let shift = resolveSnapShift({
        movementPx: movementFromRest,
        velocityPxMs: signedVelocity,
        pageWidth,
        mode,
      });

      // Do not navigate before minDate.
      if (minDate && shift < 0) {
        const [y, m, d] = minDate.split("-").map(Number);
        const minWall = new Date(y, m - 1, d);
        if (addWallDays(anchor, shift) < minWall) {
          shift = Math.min(0, diffWallDays(anchor, minWall));
        }
      }

      const target = -pageWidth - shift * (pageWidth / cols);
      animationRef.current = animate(x, target, {
        type: "spring",
        ...SNAP_SPRING,
        velocity: signedVelocity * 1000,
        onComplete: () => {
          if (shift !== 0) onShiftDays(shift);
        },
      });

      return base;
    },
    {
      target: rootRef,
      axis: "x",
      filterTaps: true,
      eventOptions: { passive: false },
    },
  );

  usePinchZoom({
    rootRef,
    scrollRef,
    hourHeightRef,
    enabled: !isEventDragging,
  });

  // Hour height is set imperatively (pinch writes it outside React), so
  // initialize the variable once instead of setting it through JSX style.
  useLayoutEffect(() => {
    hourHeightRef.current = hourHeightRef.current || defaultHourHeight;
    rootRef.current?.style.setProperty(
      HOUR_HEIGHT_VAR_NAME,
      `${hourHeightRef.current}px`,
    );
  }, [defaultHourHeight, hourHeightRef]);

  // Auto-scroll to the current time (roughly one third from the top of the viewport).
  // biome-ignore lint/correctness/useExhaustiveDependencies: scroll only when mode/time zone changes.
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    const now = zonedNow(timezone);
    const px = (wallMinutesOfDay(now) / 60) * hourHeightRef.current;
    el.scrollTop = Math.max(0, px - el.clientHeight / 3);
  }, [mode, timezone]);

  // The current-time line updates once per minute.
  const [nowWall, setNowWall] = useState(() => zonedNow(timezone));
  useEffect(() => {
    setNowWall(zonedNow(timezone));
    const id = setInterval(() => setNowWall(zonedNow(timezone)), 60_000);
    return () => clearInterval(id);
  }, [timezone]);

  const todayStr = toDateString(nowWall);
  const nowMinutes = wallMinutesOfDay(nowWall);

  return (
    <LazyMotion features={domAnimation} strict>
      <div ref={rootRef} className={gridRoot}>
        <div className={headerRow}>
          <div className={headerCorner} />
          <div className={headerViewport}>
            <m.div className={headerTrack} style={{ x, width: "300%" }}>
              {dates.map((date) => (
                <MobileHeaderDayCell
                  key={date.getTime()}
                  weekdayLabel={date.toLocaleDateString("ru-RU", {
                    weekday: "short",
                  })}
                  dayNumber={date.getDate()}
                  isToday={toDateString(date) === todayStr}
                  widthPct={colWidthPct}
                />
              ))}
            </m.div>
          </div>
        </div>

        <div ref={scrollRef} className={scrollContainer}>
          <MobileTimeColumn />
          <div ref={bodyViewportRef} className={bodyViewport}>
            <m.div className={bodyTrack} style={{ x, width: "300%" }}>
              {dates.map((date) => {
                const dateStr = toDateString(date);
                return (
                  <MobileDayColumn
                    key={dateStr}
                    date={dateStr}
                    intervals={eventsByDay.get(dateStr) ?? EMPTY_INTERVALS}
                    timezone={timezone}
                    workingHours={workingHours}
                    minDate={minDate}
                    widthPct={colWidthPct}
                    nowMinutes={dateStr === todayStr ? nowMinutes : null}
                    onEventClick={onEventClick}
                    onSlotClick={onSlotClick}
                  />
                );
              })}
            </m.div>
          </div>
        </div>
      </div>
    </LazyMotion>
  );
}
