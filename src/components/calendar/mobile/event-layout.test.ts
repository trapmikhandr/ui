import { layoutDayEvents } from "./event-layout";
import type { DayEventInterval } from "./mobile.types";

function interval(
  id: string,
  startMin: number,
  endMin: number,
): DayEventInterval {
  return {
    event: {
      id,
      title: id,
      startDate: "",
      endDate: "",
    },
    startMin,
    endMin,
  };
}

function byId(result: ReturnType<typeof layoutDayEvents>, id: string) {
  const found = result.find((r) => r.event.id === id);
  if (!found) throw new Error(`event ${id} not in layout`);
  return found;
}

describe("layoutDayEvents", () => {
  it("an empty list produces an empty layout", () => {
    expect(layoutDayEvents([])).toEqual([]);
  });

  it("non-overlapping events use the full width", () => {
    const result = layoutDayEvents([
      interval("a", 540, 600),
      interval("b", 600, 660),
    ]);
    expect(byId(result, "a")).toMatchObject({ column: 0, columns: 1 });
    expect(byId(result, "b")).toMatchObject({ column: 0, columns: 1 });
  });

  it("two overlapping events split the day in half", () => {
    const result = layoutDayEvents([
      interval("a", 540, 630),
      interval("b", 600, 660),
    ]);
    expect(byId(result, "a")).toMatchObject({ column: 0, columns: 2 });
    expect(byId(result, "b")).toMatchObject({ column: 1, columns: 2 });
  });

  it("a chain of overlaps forms one cluster", () => {
    // a∩b, b∩c, but a∦c: all three are in one cluster, while c uses a's column.
    const result = layoutDayEvents([
      interval("a", 540, 600),
      interval("b", 570, 660),
      interval("c", 615, 675),
    ]);
    expect(byId(result, "a")).toMatchObject({ column: 0, columns: 2 });
    expect(byId(result, "b")).toMatchObject({ column: 1, columns: 2 });
    expect(byId(result, "c")).toMatchObject({ column: 0, columns: 2 });
  });

  it("three-way overlap produces three columns", () => {
    const result = layoutDayEvents([
      interval("a", 540, 660),
      interval("b", 560, 680),
      interval("c", 580, 700),
    ]);
    expect(byId(result, "a").columns).toBe(3);
    expect(new Set(result.map((r) => r.column))).toEqual(new Set([0, 1, 2]));
  });

  it("width becomes full again after the cluster ends", () => {
    const result = layoutDayEvents([
      interval("a", 540, 630),
      interval("b", 600, 660),
      interval("c", 720, 780),
    ]);
    expect(byId(result, "c")).toMatchObject({ column: 0, columns: 1 });
  });

  it("very short events count as 15 minutes when overlapping", () => {
    // A zero-length event at 10:00 and an event at 10:10 visually overlap.
    const result = layoutDayEvents([
      interval("a", 600, 600),
      interval("b", 610, 670),
    ]);
    expect(byId(result, "a").columns).toBe(2);
    expect(byId(result, "b").columns).toBe(2);
  });
});
