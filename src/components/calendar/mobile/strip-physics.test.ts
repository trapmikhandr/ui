import { resolveSnapShift, rubberband } from "./strip-physics";

const PAGE = 360;

describe("resolveSnapShift", () => {
  describe("day view", () => {
    it("a micro-swipe returns to its starting position", () => {
      expect(
        resolveSnapShift({
          movementPx: -PAGE * 0.15,
          velocityPxMs: 0.1,
          pageWidth: PAGE,
          mode: "day",
        }),
      ).toBe(0);
    });

    it("a long swipe (>50%) advances one day", () => {
      expect(
        resolveSnapShift({
          movementPx: -PAGE * 0.6,
          velocityPxMs: 0.1,
          pageWidth: PAGE,
          mode: "day",
        }),
      ).toBe(1);
    });

    it("a flick advances one day regardless of distance", () => {
      expect(
        resolveSnapShift({
          movementPx: -PAGE * 0.05,
          velocityPxMs: -1.2,
          pageWidth: PAGE,
          mode: "day",
        }),
      ).toBe(1);
    });

    it("a backward flick moves back one day", () => {
      expect(
        resolveSnapShift({
          movementPx: PAGE * 0.05,
          velocityPxMs: 1.2,
          pageWidth: PAGE,
          mode: "day",
        }),
      ).toBe(-1);
    });
  });

  describe("3day view", () => {
    it("a short swipe snaps to the nearest day", () => {
      // 40% of the page = 1.2 column widths, so the nearest day is 1.
      expect(
        resolveSnapShift({
          movementPx: -PAGE * 0.4,
          velocityPxMs: 0.1,
          pageWidth: PAGE,
          mode: "3day",
        }),
      ).toBe(1);
    });

    it("a very short swipe returns (0 days)", () => {
      // 10% of the page = 0.3 column widths, which rounds to 0.
      expect(
        resolveSnapShift({
          movementPx: -PAGE * 0.1,
          velocityPxMs: 0.1,
          pageWidth: PAGE,
          mode: "3day",
        }),
      ).toBe(0);
    });

    it("a long swipe (>50%) advances a three-day page", () => {
      expect(
        resolveSnapShift({
          movementPx: -PAGE * 0.55,
          velocityPxMs: 0.1,
          pageWidth: PAGE,
          mode: "3day",
        }),
      ).toBe(3);
    });

    it("a flick advances a three-day page", () => {
      expect(
        resolveSnapShift({
          movementPx: -PAGE * 0.1,
          velocityPxMs: -0.9,
          pageWidth: PAGE,
          mode: "3day",
        }),
      ).toBe(3);
    });
  });

  describe("week view (hard snapping)", () => {
    it("a half-page swipe elastically returns", () => {
      expect(
        resolveSnapShift({
          movementPx: -PAGE * 0.45,
          velocityPxMs: 0.1,
          pageWidth: PAGE,
          mode: "week",
        }),
      ).toBe(0);
    });

    it("a swipe past halfway advances the full week", () => {
      expect(
        resolveSnapShift({
          movementPx: -PAGE * 0.55,
          velocityPxMs: 0.1,
          pageWidth: PAGE,
          mode: "week",
        }),
      ).toBe(7);
    });

    it("a flick advances the full week", () => {
      expect(
        resolveSnapShift({
          movementPx: -PAGE * 0.1,
          velocityPxMs: -0.8,
          pageWidth: PAGE,
          mode: "week",
        }),
      ).toBe(7);
    });

    it("never advances by part of a week", () => {
      for (const fraction of [0.1, 0.3, 0.49, 0.51, 0.9]) {
        const shift = resolveSnapShift({
          movementPx: -PAGE * fraction,
          velocityPxMs: 0,
          pageWidth: PAGE,
          mode: "week",
        });
        expect([0, 7]).toContain(shift);
      }
    });
  });

  it("zero page width does not break the calculation", () => {
    expect(
      resolveSnapShift({
        movementPx: -100,
        velocityPxMs: -1,
        pageWidth: 0,
        mode: "day",
      }),
    ).toBe(0);
  });
});

describe("rubberband", () => {
  it("returns the value unchanged inside the bounds", () => {
    expect(rubberband(50, 0, 100)).toBe(50);
  });

  it("damps movement outside the bounds", () => {
    const over = rubberband(150, 0, 100);
    expect(over).toBeGreaterThan(100);
    expect(over).toBeLessThan(150);
  });

  it("behaves symmetrically at the lower bound", () => {
    const under = rubberband(-50, 0, 100);
    expect(under).toBeLessThan(0);
    expect(under).toBeGreaterThan(-50);
  });
});
