import { describe, expect, test } from "bun:test";

import { getSequence } from "../src/data/sequences";

type ApprovalGate = {
  approval?: {
    title: string;
    subtitle: string;
    body: string;
    delayLabel: string;
  };
};

describe("sequences data", () => {
  test("includes the warm lead speed-to-lead sequence", () => {
    const sequence = getSequence("warm-lead-speed-to-lead");

    expect(sequence).toBeDefined();
    expect(sequence?.name).toBe("Warm Lead — Speed to Lead");
    expect(sequence?.description).toBe(
      "Nurture warm leads with human-approved, lower-pressure outreach",
    );
    expect(sequence?.emailSteps?.map((step) => step.title)).toEqual([
      "Step 1 — SMS",
      "Step 2 — Email",
      "Step 3 — AI Phone Call",
      "Step 4 — Final SMS",
    ]);
    expect(sequence?.completion?.subtitle).toContain("After 60 days");
    expect((sequence as ApprovalGate | undefined)?.approval?.title).toBe("Human approval required");
  });

  test("includes the stale lead revival sequence", () => {
    const sequence = getSequence("stale-lead-revival");

    expect(sequence).toBeDefined();
    expect(sequence?.name).toBe("Stale Lead — Revival");
    expect(sequence?.description).toBe(
      "Re-open stale conversations with low-pressure, personalized outreach",
    );
    expect(sequence?.emailSteps?.map((step) => step.title)).toEqual([
      'Step 1 — Email "Checking back in"',
      "Step 2 — SMS low-pressure nudge",
      "Step 3 — AI call gentle follow-up",
      'Step 4 — Email "Last check-in"',
    ]);
    expect(sequence?.completion?.title).toContain("cold_archive");
    expect(sequence?.stoppingConditions?.map((condition) => condition.text)).toContain(
      "Opt-out keyword → do_not_contact",
    );
  });
});
