export type ContactStatus = "lead" | "qualified" | "pending";

export type SignalFields = {
  confidenceTier: string;
  signalType: string;
  channelOfOrigin: string;
  lastInbound: string;
  bookedBought: string;
  intentTags: string[];
  doNotContact: string;
};

export type Contact = {
  id: string;
  name: string;
  title?: string;
  initials: string;
  emails: string[];
  phones: string[];
  status: ContactStatus;
  tags: string[];
  description?: string;
  linkedin?: string;
  location?: string;
  source: string;
  createdDate: string;
  assignee?: string;
  activitySummary: string;
  signal?: SignalFields;
  handoffNote?: string;
  sequence?: {
    name: string;
    badgeClass: string;
    currentStep: string;
    nextAction: string;
  };
};

export const contacts: Contact[] = [
  {
    id: "elizabeth-flanagan",
    name: "Elizabeth Flanagan",
    title: "Director Of Marketing",
    initials: "EF",
    emails: ["elizabeth@namebureau.com", "e.flanagan@gmail.com"],
    phones: ["+447700900112"],
    status: "lead",
    tags: ["SHORTLIST", "VIP"],
    description: "Referred by existing client",
    source: "website",
    createdDate: "May 19, 2026",
    activitySummary:
      "Elizabeth Flanagan's contact record was created on May 19, 2026, and is currently marked as a lead. She reached out through the website enquiry form and is awaiting a first response.",
    signal: {
      confidenceTier: "Medium",
      signalType: "New enquiry",
      channelOfOrigin: "Website form",
      lastInbound: "Today 9:42 AM",
      bookedBought: "No",
      intentTags: ["pricing_question"],
      doNotContact: "No",
    },
    handoffNote:
      '"Submitted the website enquiry form asking about onboarding timelines for a small team. Wants a callback this week."',
    sequence: {
      name: "New Lead",
      badgeClass: "bg-violet-100 text-violet-700",
      currentStep: "Step 1 — Email",
      nextAction: "Tomorrow 10:00 AM",
    },
  },
  {
    id: "anshul",
    name: "Anshul",
    initials: "AN",
    emails: ["anshmittal187@gmail.com"],
    phones: [],
    status: "qualified",
    tags: [],
    source: "scheduler",
    createdDate: "May 18, 2026",
    assignee: "Unassigned",
    activitySummary:
      "Anshul's contact record was created on May 18, 2026, and is currently marked as qualified. There has been no activity in terms of sequences, calls, emails, or meetings since the record was established. The only recorded action was the creation of the contact via Scheduler.",
    signal: {
      confidenceTier: "High",
      signalType: "Interested, didn't book",
      channelOfOrigin: "Phone call",
      lastInbound: "Today 2:14 PM",
      bookedBought: "No",
      intentTags: ["pricing_question", "multi_location"],
      doNotContact: "No",
    },
    handoffNote:
      '"Caller expressed strong interest in the commercial package, asked about pricing for 12 users. Said they needed to check with their team before booking. Call lasted 2m 14s."',
    sequence: {
      name: "Hot Lead",
      badgeClass: "bg-emerald-100 text-emerald-700",
      currentStep: "Step 2 — SMS",
      nextAction: "Today 2:39 PM",
    },
  },
  {
    id: "anonymous-gecko",
    name: "Anonymous Gecko",
    initials: "AG",
    emails: [],
    phones: ["+919711438837"],
    status: "pending",
    tags: ["Issue", "Callback", "Billing", "Urgent", "Reception"],
    source: "inbound call",
    createdDate: "May 20, 2026",
    activitySummary:
      "Anonymous Gecko's contact record was created on May 20, 2026 from an inbound call and is currently pending. No email is on file yet — follow up to capture contact details.",
    handoffNote:
      '"Inbound caller reported an issue accessing their account and requested a callback. Did not leave an email."',
  },
  {
    id: "anonymous-woodpecker",
    name: "Anonymous Woodpecker",
    initials: "AW",
    emails: [],
    phones: ["+15028550431"],
    status: "pending",
    tags: ["Reception"],
    source: "inbound call",
    createdDate: "May 20, 2026",
    activitySummary:
      "Anonymous Woodpecker's contact record was created on May 20, 2026 from an inbound call and is currently pending. No email is on file yet — follow up to capture contact details.",
  },
];

export function getContact(id: string): Contact | undefined {
  return contacts.find((c) => c.id === id);
}

export const statusMeta: Record<
  ContactStatus,
  { label: string; dot: string; text: string }
> = {
  lead: { label: "Lead", dot: "bg-violet-500", text: "text-violet-600" },
  qualified: { label: "Qualified", dot: "bg-emerald-500", text: "text-emerald-600" },
  pending: { label: "Pending", dot: "bg-slate-300", text: "text-slate-400" },
};
