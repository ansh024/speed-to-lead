export type SequenceStatus = "draft" | "active" | "paused";

export type StepKind = "call" | "sms" | "email";

export type SequenceStep = {
  id: string;
  kind: StepKind;
  title: string;
  subtitle?: string;
  body?: string;
  /** Italic preview/quote shown inside the step card. */
  preview?: string;
  /** Connector label shown above this step (delay/condition from previous). */
  delayLabel: string;
};

export type StoppingCondition = {
  tone: "green" | "amber" | "red" | "gray";
  text: string;
};

export type ApprovalGate = {
  title: string;
  subtitle: string;
  body: string;
  delayLabel: string;
};

export type ApprovalReview = {
  initials: string;
  name: string;
  meta: string;
  status: string;
  handoffNote: string;
  keyQuotes: string;
  intentSignals: string[];
  channel: string;
  proposedMessage: string;
  note: string;
};

export type SequenceConfigRow = {
  label: string;
  value: string;
  tone?: "default" | "success" | "muted";
};

export type SequenceConfigSection = {
  title: string;
  rows?: SequenceConfigRow[];
  bullets?: string[];
  body?: string;
};

export type Sequence = {
  id: string;
  name: string;
  description?: string;
  status: SequenceStatus;
  audience: string;
  recipients: number;
  steps: number;
  runs: number;
  template?: boolean;
  tagline?: string;
  trigger?: {
    title: string;
    subtitle?: string;
    body?: string;
  };
  approval?: ApprovalGate;
  approvalReview?: ApprovalReview;
  configSections?: SequenceConfigSection[];
  emailSteps?: SequenceStep[];
  completion?: {
    title: string;
    subtitle?: string;
    delayLabel: string;
  };
  stoppingConditions?: StoppingCondition[];
};

export const sequences: Sequence[] = [
  {
    id: "hot-lead-speed-to-lead",
    name: "Hot Lead — Speed to Lead",
    description: "Reach hot leads within minutes of inbound signal",
    tagline: "Trigger: tag becomes hot_lead · Auto-enroll · No human approval",
    status: "draft",
    audience: "Contacts",
    recipients: 0,
    steps: 5,
    runs: 0,
    template: true,
    trigger: {
      title: "Trigger",
      subtitle: "Attribute change: tag = hot_lead · fires within 5 min",

    },
    emailSteps: [
      {
        id: "step-1",
        kind: "call",
        title: "Step 1 — AI Phone Call",
        subtitle: "Uses contact's phone · respects send window",
        body: "AI calls and references the handoff note from CRM.",
        preview:
          '"Hi {{first_name}}, this is [Business] following up — I think we got cut off earlier. You mentioned {{key_quote}}. Would now be a good time to chat?"',
        delayLabel: "Immediately",
      },
      {
        id: "step-2",
        kind: "sms",
        title: "Step 2 — SMS",
        subtitle: "Only sends if Step 1 had no answer",
        preview:
          '"Hi {{first_name}}, just tried calling — happy to connect when convenient. Here\'s a link to book a time: {{booking_link}}"',
        delayLabel: "No answer → 25 min",
      },
      {
        id: "step-3",
        kind: "email",
        title: "Step 3 — Email",
        subtitle: "Only if email available · references original inquiry",
        preview:
          'Subject: "Quick follow-up on your {{signal_type}}" · Body references the call summary and offers a single clear CTA.',
        delayLabel: "24 hours",
      },
      {
        id: "step-4",
        kind: "call",
        title: "Step 4 — AI Phone Call #2",
        subtitle: "Different time of day from Step 1",
        body: "Shorter script. Soft close — offer to answer any questions, no hard sell.",
        delayLabel: "72 hours",
      },
      {
        id: "step-5",
        kind: "sms",
        title: 'Step 5 — Final SMS "Closing the loop"',
        subtitle: "Last touch before sequence ends",
        preview:
          '"Hey {{first_name}} — should I keep your info on file in case timing works better later? No pressure either way."',
        delayLabel: "5 days",
      },
    ],
    completion: {
      title: "If no response — enroll in Stale Revival",
      subtitle: "After 30 days · tag changes to stale_lead",
      delayLabel: "On completion",
    },
    stoppingConditions: [
      { tone: "green", text: "Contact books an appointment → switch to reminder-only" },
      { tone: "green", text: "Contact replies to any touch → route to Responses inbox" },
      { tone: "amber", text: "Contact picks up phone call → AI handles live, logs outcome" },
      {
        tone: "gray",
        text: "Contact says stop / opt-out keyword → hard stop, tag = do_not_contact",
      },
    ],
  },
  {
    id: "warm-lead-speed-to-lead",
    name: "Warm Lead — Speed to Lead",
    description: "Nurture warm leads with human-approved, lower-pressure outreach",
    tagline: "Trigger: tag becomes warm_lead · 15-min delay · Human approval before Step 1 fires",
    status: "draft",
    audience: "Contacts",
    recipients: 0,
    steps: 4,
    runs: 0,
    template: true,
    trigger: {
      title: "Trigger",
      subtitle: "Attribute change: tag = warm_lead · 15-min delay before review request",
      body: "Magic Fill runs during the 15-min window — reviewer sees an enriched contact, not an anonymous one.",
    },
    approval: {
      title: "Human approval required",
      subtitle: "Reviewer sees lead card, proposed first message, approve or skip",
      body: "Appears as a review request in the Responses inbox. If no action is taken within 2 hours, the first message auto-approves.",
      delayLabel: "15 min delay",
    },
    approvalReview: {
      initials: "JM",
      name: "James Morley",
      meta: "Warm lead · via phone call · 14 min ago",
      status: "Awaiting approval",
      handoffNote:
        'Caller asked about pricing for the commercial package — engaged for 2 minutes, said they needed to "check with the team" before committing. Call dropped before booking.',
      keyQuotes: '"We\'ve got about 12 people who\'d need access" · "What does it run per month?"',
      intentSignals: ["pricing_question", "team_size_12", "decision_pending"],
      channel: "Will send to +1 (555) 248-1190",
      proposedMessage:
        '"Hi James, this is Central following up — I noticed you reached out earlier about pricing. Happy to answer any questions whenever works for you. {{booking_link}}"',
      note: "If no action is taken within 2 hours, this message will send automatically.",
    },
    emailSteps: [
      {
        id: "warm-step-1",
        kind: "sms",
        title: "Step 1 — SMS",
        subtitle: 'Softer opener — no "we got cut off" framing',
        preview:
          '"Hi {{first_name}}, this is [Business] — I noticed you reached out earlier. Happy to answer any questions whenever works for you. {{booking_link}}"',
        delayLabel: "After approval",
      },
      {
        id: "warm-step-2",
        kind: "email",
        title: "Step 2 — Email",
        subtitle: "Social proof + single CTA, references inquiry type",
        preview:
          'Subject: "A few things worth knowing about {{signal_type}}" · Lighter sell — one case study, one question, one link.',
        delayLabel: "3 days",
      },
      {
        id: "warm-step-3",
        kind: "call",
        title: "Step 3 — AI Phone Call",
        subtitle: "First call attempt — softer script than Hot Lead",
        body: "Short script. No urgency framing. Offer to answer questions or book a convenient time.",
        delayLabel: "7 days",
      },
      {
        id: "warm-step-4",
        kind: "sms",
        title: "Step 4 — Final SMS",
        subtitle: "Low-pressure close",
        preview:
          '"Hey {{first_name}} — no worries if the timing isn\'t right. Should I keep your info on file?"',
        delayLabel: "14 days",
      },
    ],
    completion: {
      title: "No response — enroll in Stale Revival",
      subtitle: "After 60 days · tag changes to stale_lead",
      delayLabel: "On completion",
    },
    stoppingConditions: [
      { tone: "green", text: "Books appointment → reminder-only mode" },
      { tone: "green", text: "Replies to any touch → Responses inbox" },
      { tone: "amber", text: "Picks up call → AI handles live" },
      {
        tone: "red",
        text: "Reviewer skips approval → sequence paused, contact tagged for manual review",
      },
      {
        tone: "gray",
        text: "Opt-out keyword → hard stop, tag = do_not_contact",
      },
    ],
  },
  {
    id: "stale-lead-revival",
    name: "Stale Lead — Revival",
    description: "Re-open stale conversations with low-pressure, personalized outreach",
    tagline: "Trigger: stale_lead tag added · 30–60 days after no response",
    status: "draft",
    audience: "Contacts",
    recipients: 0,
    steps: 4,
    runs: 0,
    template: true,
    trigger: {
      title: "Trigger",
      subtitle: "Attribute change: tag = stale_lead · 30–60 days after no response",
      body: "Magic Fill runs at step 1 if key personalization fields are missing, then the sequence re-opens the original conversation with low-pressure context.",
    },
    configSections: [
      {
        title: "Trigger config",
        rows: [
          { label: "CRM tag", value: "stale_lead" },
          { label: "Human approval", value: "Not required", tone: "muted" },
          { label: "Re-enrollment", value: "Once per 90 days" },
          { label: "On completion", value: "→ cold_archive tag" },
          { label: "Magic Fill", value: "Runs at step 1 if missing" },
          { label: "Tone guidance", value: "Unhurried · Curious · Zero pressure" },
        ],
      },
      {
        title: "Personalization required",
        bullets: [
          "Original job type from channel_of_origin",
          "Verbatim quote from key_quotes",
          "Date of original contact",
        ],
      },
      {
        title: "Calendar variant",
        body: "Date-based trigger for lease renewal, service due, or estimate expiry. Uses a shorter 3-step flow when a known future date is stored in CRM.",
      },
    ],
    emailSteps: [
      {
        id: "stale-step-1",
        kind: "email",
        title: 'Step 1 — Email "Checking back in"',
        subtitle: "Day 0 · Soft re-introduction referencing the original inquiry",
        body: 'No ask, just a check-in. Subject line echoes the original request, for example "Still thinking about that HVAC quote?"',
        delayLabel: "Day 0",
      },
      {
        id: "stale-step-2",
        kind: "sms",
        title: "Step 2 — SMS low-pressure nudge",
        subtitle: "Day 4 · One sentence, easy yes/no question",
        body: "Short SMS referencing the original job type and quoting their own words from the handoff note.",
        delayLabel: "Day 4",
      },
      {
        id: "stale-step-3",
        kind: "call",
        title: "Step 3 — AI call gentle follow-up",
        subtitle: "Day 10 · Unhurried, curious, no hard pitch",
        body: 'Opens with context like "you spoke with us a while back about..." and tries to learn whether the need is still active or already resolved.',
        delayLabel: "Day 10",
      },
      {
        id: "stale-step-4",
        kind: "email",
        title: 'Step 4 — Email "Last check-in"',
        subtitle: "Day 20 · Low-stakes final touchpoint",
        body: "Signals you will not bother them again, leaves the door open, includes a prominent opt-out link, and references the original job one last time.",
        delayLabel: "Day 20",
      },
    ],
    completion: {
      title: "No response → cold_archive",
      subtitle: "Re-enrollment blocked for 90 days",
      delayLabel: "On completion",
    },
    stoppingConditions: [
      { tone: "green", text: "Books appointment → reminder-only" },
      { tone: "green", text: "Replies → Responses inbox" },
      { tone: "green", text: "Picks up → AI handles live" },
      { tone: "red", text: "Opt-out keyword → do_not_contact" },
    ],
  },
  {
    id: "new-seq",
    name: "New seq",
    status: "draft",
    audience: "Contacts",
    recipients: 0,
    steps: 0,
    runs: 0,
  },
  {
    id: "webhooks",
    name: "webhooks",
    status: "draft",
    audience: "Contacts",
    recipients: 1,
    steps: 0,
    runs: 0,
  },
  {
    id: "warm-lead-demo",
    name: "Warm Lead to Demo Booking",
    description: "Guide new leads from signup to demo booking",
    tagline: "Build your outreach sequence",
    status: "draft",
    audience: "Contacts",
    recipients: 0,
    steps: 3,
    runs: 0,
  },
];

export function getSequence(id: string): Sequence | undefined {
  return sequences.find((s) => s.id === id);
}
