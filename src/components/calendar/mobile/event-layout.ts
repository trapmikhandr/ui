/**
 * event-layout.ts — side-by-side layout for overlapping daily events
 * (like Google Calendar): overlapping events form a cluster,
 * columns are assigned greedily, and the day width is divided equally.
 */

import { SNAP_MINUTES } from "./mobile.constants";
import type { DayEventInterval, PositionedDayEvent } from "./mobile.types";

/** Visual end: treat very short events as occupying at least 15 minutes,
 * so their cards do not overlap indistinguishably. */
function visualEnd(interval: DayEventInterval): number {
  return Math.max(interval.endMin, interval.startMin + SNAP_MINUTES);
}

export function layoutDayEvents(
  intervals: DayEventInterval[],
): PositionedDayEvent[] {
  if (intervals.length === 0) return [];

  // Earlier start comes first; when starts are equal, the longer event is leftmost.
  const sorted = [...intervals].sort(
    (a, b) => a.startMin - b.startMin || visualEnd(b) - visualEnd(a),
  );

  const result: PositionedDayEvent[] = [];

  // A cluster is a connected component based on interval overlap.
  let cluster: DayEventInterval[] = [];
  let clusterEnd = Number.NEGATIVE_INFINITY;

  const flushCluster = () => {
    if (cluster.length === 0) return;

    // Greedy column assignment: use the first column whose last event has ended.
    const columnEnds: number[] = [];
    const placed: { interval: DayEventInterval; column: number }[] = [];

    for (const interval of cluster) {
      let column = columnEnds.findIndex((end) => end <= interval.startMin);
      if (column === -1) {
        column = columnEnds.length;
        columnEnds.push(0);
      }
      columnEnds[column] = visualEnd(interval);
      placed.push({ interval, column });
    }

    for (const { interval, column } of placed) {
      result.push({ ...interval, column, columns: columnEnds.length });
    }

    cluster = [];
    clusterEnd = Number.NEGATIVE_INFINITY;
  };

  for (const interval of sorted) {
    if (interval.startMin >= clusterEnd) {
      flushCluster();
    }
    cluster.push(interval);
    clusterEnd = Math.max(clusterEnd, visualEnd(interval));
  }
  flushCluster();

  return result;
}
