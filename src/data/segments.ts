import {
  Users,
  Zap,
  Flame,
  Clock,
  TimerReset,
  FileText,
  UserX,
  type LucideIcon,
} from "lucide-react";

export type ConditionToken = {
  text: string;
  /** Visual treatment for the token. */
  kind: "field-new" | "field" | "op" | "value-new" | "value-warn" | "value";
};

export type Condition = {
  /** Connector word shown to the left of the row (Where / And / Or). */
  connector: "Where" | "And" | "Or";
  tokens: ConditionToken[];
};

export type Segment = {
  id: string;
  name: string;
  description: string;
  people: number;
  status: "active" | "inactive";
  icon: LucideIcon;
  iconBg: string;
  iconColor: string;
  custom?: boolean;
  createdAgo?: string;
  editedAgo?: string;
  conditions: Condition[];
};

export const segments: Segment[] = [
  {
    id: "hot",
    name: "Hot leads — unbooked",
    description:
      "Tag = hot_lead · appointment_booked = false · last_inbound within 24h · not in active sequence",
    people: 24,
    status: "inactive",
    icon: Zap,
    iconBg: "bg-rose-50",
    iconColor: "text-rose-500",
    conditions: [
      {
        connector: "Where",
        tokens: [
          { text: "Tags", kind: "field-new" },
          { text: "contains", kind: "op" },
          { text: "hot_lead", kind: "value-new" },
        ],
      },
      {
        connector: "And",
        tokens: [
          { text: "Appointment booked", kind: "field-new" },
          { text: "is", kind: "op" },
          { text: "false", kind: "value-new" },
        ],
      },
      {
        connector: "And",
        tokens: [
          { text: "Last inbound date", kind: "field-new" },
          { text: "is within", kind: "op" },
          { text: "24 hours", kind: "value-new" },
        ],
      },
      {
        connector: "And",
        tokens: [
          { text: "In active sequence", kind: "field-new" },
          { text: "is", kind: "op" },
          { text: "false", kind: "value-warn" },
        ],
      },
      {
        connector: "And",
        tokens: [
          { text: "Do not contact", kind: "field-new" },
          { text: "is", kind: "op" },
          { text: "false", kind: "value" },
        ],
      },
    ],
  },
  {
    id: "warm",
    name: "Warm leads — pending approval",
    description:
      "Tag = warm_lead · sequence approval status = pending · last signal within 48h",
    people: 41,
    status: "inactive",
    icon: Flame,
    iconBg: "bg-amber-50",
    iconColor: "text-amber-500",
    conditions: [],
  },
  {
    id: "stale30",
    name: "Stale leads — 30+ days",
    description:
      "Last inbound contact > 30 days · no active sequence · not do_not_contact",
    people: 187,
    status: "inactive",
    icon: Clock,
    iconBg: "bg-slate-100",
    iconColor: "text-slate-500",
    conditions: [],
  },
  {
    id: "stale90",
    name: "Stale leads — 90+ days",
    description:
      "Last inbound contact > 90 days · previously had hot_lead or warm_lead tag · not do_not_contact",
    people: 63,
    status: "inactive",
    icon: TimerReset,
    iconBg: "bg-violet-50",
    iconColor: "text-violet-500",
    conditions: [],
  },
  {
    id: "unsold",
    name: "Unsold estimates — 7+ days open",
    description:
      "signal_type = estimate_sent · estimate_status = open · created > 7 days ago",
    people: 12,
    status: "inactive",
    icon: FileText,
    iconBg: "bg-emerald-50",
    iconColor: "text-emerald-600",
    conditions: [],
  },
  {
    id: "lapsed",
    name: "Lapsed customers — 6+ months",
    description:
      "Last appointment > 180 days · status = past_customer · not do_not_contact",
    people: 38,
    status: "inactive",
    icon: UserX,
    iconBg: "bg-amber-50",
    iconColor: "text-amber-600",
    conditions: [],
  },
  {
    id: "1",
    name: "TEsting",
    description: "",
    people: 2511,
    status: "active",
    icon: Users,
    iconBg: "bg-sky-100",
    iconColor: "text-sky-600",
    custom: true,
    createdAgo: "about 2 hours ago",
    editedAgo: "28 minutes ago",
    conditions: [],
  },
  {
    id: "2",
    name: "Test",
    description: "",
    people: 2511,
    status: "active",
    icon: Users,
    iconBg: "bg-sky-100",
    iconColor: "text-sky-600",
    custom: true,
    createdAgo: "6 days ago",
    editedAgo: "28 minutes ago",
    conditions: [],
  },
];

export const EXISTING_FIELDS = [
  "Name",
  "Email",
  "Phone",
  "Status",
  "Source",
  "Tags",
  "Created at",
  "Job title",
  "Location",
  "Deal size",
  "LinkedIn URL",
];

export const NEW_SPEED_TO_LEAD_FIELDS = [
  "Confidence tier",
  "Signal type",
  "Channel of origin",
  "Last inbound date",
  "Appointment booked",
  "Intent tags",
  "Handoff note",
  "Do not contact",
  "Estimate status",
  "In active sequence",
];

export function getSegment(id: string): Segment | undefined {
  return segments.find((s) => s.id === id);
}
