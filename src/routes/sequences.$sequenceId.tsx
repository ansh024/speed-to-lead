import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import {
  ChevronLeft,
  ChevronDown,
  Save,
  Send,
  Mail,
  Phone,
  MessageSquare,
  ArrowUpRight,
  Zap,
  Plus,
  Trash2,
  Clock,
  GripVertical,
  MessageSquareMore,
  Bell,
  BarChart3,
  Users,
  Settings,
  ListChecks,
  PauseCircle,
  UserCheck,
  Check,
  Info,
  type LucideIcon,
} from "lucide-react";
import { AppSidebar } from "@/components/app-sidebar";
import {
  getSequence,
  type ApprovalGate,
  type ApprovalReview,
  type SequenceConfigSection,
  type SequenceStep,
  type StoppingCondition,
} from "@/data/sequences";

export const Route = createFileRoute("/sequences/$sequenceId")({
  component: SequenceDetailPage,
  loader: ({ params }) => {
    const sequence = getSequence(params.sequenceId);
    if (!sequence) throw notFound();
    return { sequence };
  },
  head: ({ loaderData }) => ({
    meta: [
      {
        title: loaderData?.sequence ? `${loaderData.sequence.name} — Sequences` : "Sequence",
      },
    ],
  }),
  notFoundComponent: SequenceNotFoundComponent,
  errorComponent: ({ error }) => (
    <div className="flex h-screen items-center justify-center text-slate-600">
      Something went wrong: {error.message}
    </div>
  ),
});

function SequenceNotFoundComponent() {
  const { sequenceId } = Route.useParams();
  return (
    <div className="flex h-screen items-center justify-center text-slate-600">
      Sequence "{sequenceId}" not found.{" "}
      <Link to="/sequences" className="ml-1 text-sky-600 hover:underline">
        Back to sequences
      </Link>
    </div>
  );
}

const WEEKDAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"] as const;
const DEFAULT_ACTIVE_DAYS = new Set(["Mon", "Tue", "Wed", "Thu", "Fri"]);

function SequenceDetailPage() {
  const { sequence } = Route.useLoaderData();
  const steps: SequenceStep[] = sequence.emailSteps ?? [];

  return (
    <div className="flex h-screen w-full bg-slate-50 text-slate-900 font-sans">
      <AppSidebar />

      <main className="flex flex-1 flex-col overflow-hidden">
        {/* Topbar */}
        <header className="flex items-center justify-end gap-3 border-b border-slate-200 bg-white px-6 py-3">
          <button className="flex items-center gap-2 rounded-md px-3 py-1.5 text-sm text-slate-600 hover:bg-slate-100">
            <MessageSquareMore className="h-4 w-4" />
            Feedback
          </button>
          <button className="relative rounded-md p-2 text-slate-500 hover:bg-slate-100">
            <Bell className="h-5 w-5" />
          </button>
          <button className="flex items-center gap-2 rounded-full pl-1 pr-2 hover:bg-slate-100">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-rose-500 text-sm font-semibold text-white">
              A
            </div>
            <ChevronDown className="h-4 w-4 text-slate-400" />
          </button>
        </header>

        <div className="flex-1 overflow-auto">
          <div className="mx-auto max-w-7xl px-8 py-6">
            {/* Title row */}
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div className="flex items-start gap-3">
                <Link
                  to="/sequences"
                  className="mt-1 rounded-md p-1.5 text-slate-500 hover:bg-slate-100 hover:text-slate-700"
                  aria-label="Back to sequences"
                >
                  <ChevronLeft className="h-5 w-5" />
                </Link>
                <div>
                  <div className="flex items-center gap-2">
                    <h1 className="text-2xl font-semibold tracking-tight text-slate-900">
                      {sequence.name}
                    </h1>
                    {sequence.template && (
                      <span className="inline-flex items-center rounded-full border border-violet-200 bg-violet-50 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-violet-700">
                        Template
                      </span>
                    )}
                  </div>
                  <p className="mt-1 text-sm text-slate-500">
                    {sequence.tagline ?? "Build your outreach sequence"}
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-2">
                <QuotaChip icon={Send} label="seq" used="8" total="∞" />
                <QuotaChip icon={Mail} label="emails" used="0" total="∞" />
                <QuotaChip icon={Phone} label="min" used="0" total="5,000" />
                <button className="ml-1 flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 shadow-sm hover:bg-slate-50">
                  <Save className="h-4 w-4" />
                  Save
                </button>
                <button className="flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm font-medium text-slate-500 shadow-sm hover:bg-slate-50">
                  <span className="relative inline-flex h-5 w-9 items-center rounded-full bg-slate-200">
                    <span className="absolute left-0.5 h-4 w-4 rounded-full bg-white shadow" />
                  </span>
                  Activate
                </button>
              </div>
            </div>

            {/* Tabs */}
            <div className="mt-5 flex items-center gap-6 border-b border-slate-200 text-sm">
              <TabButton active icon={ListChecks} label="Steps" />
              <TabButton icon={Users} label="Recipients" badge={sequence.recipients} />
              <TabButton icon={Settings} label="Settings" />
              <TabButton icon={BarChart3} label="Metrics" />
            </div>

            <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-[1fr_320px]">
              {/* Canvas */}
              <div className="flex flex-col items-center">
                {/* Trigger card */}
                <div className="w-full max-w-2xl rounded-2xl border-2 border-sky-300 bg-sky-50/40 p-4 shadow-sm">
                  <div className="flex items-start gap-3">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-sky-100 text-sky-600">
                      <Zap className="h-4 w-4" />
                    </div>
                    <div className="min-w-0">
                      <div className="text-sm font-semibold text-sky-700">
                        {sequence.trigger?.title ?? "Trigger"}
                      </div>
                      <div className="mt-0.5 text-xs text-slate-500">
                        {sequence.trigger?.subtitle ??
                          "Recipients are enrolled manually when you choose contacts or import a list."}
                      </div>
                      {sequence.trigger?.body && (
                        <div className="mt-3 text-sm text-slate-600">{sequence.trigger.body}</div>
                      )}
                    </div>
                  </div>
                </div>

                {sequence.approval && (
                  <div className="flex w-full flex-col items-center">
                    <ConnectorWithLabel label={sequence.approval.delayLabel} />
                    <ApprovalGateCard approval={sequence.approval} />
                  </div>
                )}

                {/* Steps with connectors */}
                {steps.map((step) => (
                  <div key={step.id} className="flex w-full flex-col items-center">
                    <ConnectorWithLabel label={step.delayLabel} />
                    <StepCard step={step} />
                  </div>
                ))}

                {/* Completion node */}
                {sequence.completion && (
                  <div className="flex w-full flex-col items-center">
                    <ConnectorWithLabel label={sequence.completion.delayLabel} />
                    <div className="w-full max-w-2xl rounded-2xl border-2 border-dashed border-slate-300 bg-slate-50 p-4">
                      <div className="flex items-start gap-3">
                        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-slate-200 text-slate-500">
                          <PauseCircle className="h-4 w-4" />
                        </div>
                        <div className="min-w-0">
                          <div className="text-sm font-semibold text-slate-600">
                            {sequence.completion.title}
                          </div>
                          {sequence.completion.subtitle && (
                            <div className="mt-0.5 text-xs text-slate-500">
                              {sequence.completion.subtitle}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Stopping conditions */}
                {sequence.stoppingConditions && sequence.stoppingConditions.length > 0 && (
                  <div className="mt-6 w-full max-w-2xl rounded-xl border border-slate-200 bg-slate-50 px-4 py-3">
                    <div className="text-xs font-semibold text-slate-700">
                      Stopping conditions — sequence exits immediately if:
                    </div>
                    <div className="mt-2 space-y-1.5">
                      {sequence.stoppingConditions.map((c: StoppingCondition, i: number) => (
                        <div key={i} className="flex items-center gap-2 text-xs text-slate-600">
                          <span
                            className={
                              "h-1.5 w-1.5 shrink-0 rounded-full " +
                              (c.tone === "green"
                                ? "bg-emerald-500"
                                : c.tone === "amber"
                                  ? "bg-amber-500"
                                  : c.tone === "red"
                                    ? "bg-rose-500"
                                    : "bg-slate-400")
                            }
                          />
                          {c.text}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <div className="mt-6">
                  <button className="flex items-center gap-2 rounded-lg border border-dashed border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-600 hover:border-sky-300 hover:text-sky-600">
                    <Plus className="h-4 w-4" />
                    Add step
                  </button>
                </div>
              </div>

              {/* Right sidebar */}
              <aside className="space-y-5">
                <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
                  <h3 className="text-base font-semibold text-slate-900">
                    Time zone &amp; Send window
                  </h3>

                  <div className="mt-4">
                    <label className="text-sm font-medium text-slate-700">Time Zone</label>
                    <button className="mt-1.5 flex w-full items-center justify-between rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700 shadow-sm hover:bg-slate-50">
                      <span className="truncate">(GMT+8:00) Beijing, Chongqing, Hong…</span>
                      <ChevronDown className="h-4 w-4 text-slate-400" />
                    </button>
                  </div>

                  <div className="mt-4">
                    <label className="text-sm font-medium text-slate-700">
                      Default Calendar for Bookings
                    </label>
                    <p className="text-xs text-slate-500">
                      Calendar used for booking appointments during calls
                    </p>
                    <button className="mt-1.5 flex w-full items-center justify-between rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700 shadow-sm hover:bg-slate-50">
                      <span className="flex items-center gap-2">
                        <span className="inline-flex h-5 w-5 items-center justify-center rounded bg-white text-[10px] font-bold text-sky-600 ring-1 ring-slate-200">
                          31
                        </span>
                        Google Calendar
                      </span>
                      <ChevronDown className="h-4 w-4 text-slate-400" />
                    </button>
                  </div>

                  <div className="mt-4">
                    <div className="text-sm font-medium text-slate-700">
                      Send messages on these days
                    </div>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {WEEKDAYS.map((day) => {
                        const active = DEFAULT_ACTIVE_DAYS.has(day);
                        return (
                          <button
                            key={day}
                            className={
                              "rounded-md px-3 py-1.5 text-xs font-semibold transition " +
                              (active
                                ? "bg-sky-100 text-sky-700 ring-1 ring-sky-200"
                                : "bg-slate-100 text-slate-500 hover:bg-slate-200")
                            }
                          >
                            {day}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  <div className="mt-4">
                    <div className="text-sm font-medium text-slate-700">
                      Send messages at this time
                    </div>
                    <div className="mt-2 flex items-center gap-2">
                      <TimeInput value="09:00 AM" />
                      <span className="text-slate-400">–</span>
                      <TimeInput value="05:00 PM" />
                    </div>
                  </div>
                </div>
                {sequence.configSections?.map((section) => (
                  <SequenceConfigCard key={section.title} section={section} />
                ))}
                {sequence.approvalReview && <ApprovalReviewCard review={sequence.approvalReview} />}
              </aside>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

function SequenceConfigCard({ section }: { section: SequenceConfigSection }) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
      <div className="text-[11px] font-semibold uppercase tracking-wider text-slate-500">
        {section.title}
      </div>

      {section.rows && (
        <div className="mt-3 divide-y divide-slate-100">
          {section.rows.map((row) => (
            <div key={row.label} className="flex justify-between gap-3 py-2 text-xs">
              <span className="text-slate-500">{row.label}</span>
              <span
                className={
                  "text-right font-medium " +
                  (row.tone === "success"
                    ? "text-emerald-600"
                    : row.tone === "muted"
                      ? "text-slate-500"
                      : "text-slate-800")
                }
              >
                {row.value}
              </span>
            </div>
          ))}
        </div>
      )}

      {section.bullets && (
        <div className="mt-3 space-y-2">
          {section.bullets.map((bullet) => (
            <div key={bullet} className="flex items-start gap-2 text-xs text-slate-600">
              <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-emerald-600" />
              <span>{bullet}</span>
            </div>
          ))}
        </div>
      )}

      {section.body && (
        <p className="mt-3 text-xs leading-relaxed text-slate-600">{section.body}</p>
      )}
    </div>
  );
}

function ApprovalGateCard({ approval }: { approval: ApprovalGate }) {
  return (
    <div className="w-full max-w-2xl rounded-2xl border-2 border-amber-300 bg-amber-50 p-4 shadow-sm">
      <div className="flex items-start gap-3">
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-amber-100 text-amber-600">
          <UserCheck className="h-4 w-4" />
        </div>
        <div className="min-w-0">
          <div className="text-sm font-semibold text-amber-700">{approval.title}</div>
          <div className="mt-0.5 text-xs text-slate-500">{approval.subtitle}</div>
          <div className="mt-3 text-sm text-slate-600">{approval.body}</div>
        </div>
      </div>
    </div>
  );
}

function ApprovalReviewCard({ review }: { review: ApprovalReview }) {
  return (
    <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
      <div className="flex items-center justify-between border-b border-slate-100 px-4 py-3">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-amber-100 text-sm font-semibold text-amber-700">
            {review.initials}
          </div>
          <div>
            <div className="text-sm font-semibold text-slate-900">{review.name}</div>
            <div className="text-xs text-slate-500">{review.meta}</div>
          </div>
        </div>
        <span className="rounded-full bg-amber-100 px-2.5 py-1 text-[10px] font-semibold text-amber-700">
          {review.status}
        </span>
      </div>

      <div className="space-y-4 p-4">
        <ReviewSection label="Handoff note from receptionist">
          <div className="rounded-md border-l-2 border-amber-400 bg-slate-50 px-3 py-2 text-xs leading-relaxed text-slate-700">
            {review.handoffNote}
          </div>
        </ReviewSection>

        <ReviewSection label="Key quotes">
          <div className="text-xs italic leading-relaxed text-slate-500">{review.keyQuotes}</div>
        </ReviewSection>

        <ReviewSection label="Intent signals">
          <div className="flex flex-wrap gap-1.5">
            {review.intentSignals.map((signal) => (
              <span
                key={signal}
                className="rounded-md border border-slate-200 bg-slate-50 px-2 py-0.5 text-[10px] text-slate-600"
              >
                {signal}
              </span>
            ))}
          </div>
        </ReviewSection>

        <ReviewSection label="Proposed first message — SMS">
          <div className="mb-2 flex items-center gap-1.5 text-xs text-slate-500">
            <MessageSquare className="h-3.5 w-3.5 text-violet-600" />
            {review.channel}
          </div>
          <div className="rounded-md border-l-2 border-violet-400 bg-violet-50 px-3 py-2 text-xs italic leading-relaxed text-violet-950">
            {review.proposedMessage}
          </div>
          <div className="mt-2 flex items-start gap-1.5 rounded-md bg-slate-50 px-3 py-2 text-[11px] leading-relaxed text-slate-500">
            <Info className="mt-0.5 h-3.5 w-3.5 shrink-0" />
            {review.note}
          </div>
        </ReviewSection>

        <div className="flex gap-2">
          <button className="flex flex-1 items-center justify-center gap-1.5 rounded-lg bg-sky-600 px-3 py-2 text-xs font-semibold text-white hover:bg-sky-700">
            <Check className="h-3.5 w-3.5" />
            Approve &amp; send
          </button>
          <button className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-xs font-medium text-slate-700 hover:bg-slate-100">
            Edit
          </button>
          <button className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs font-medium text-slate-500 hover:bg-slate-50">
            Skip
          </button>
        </div>
      </div>
    </div>
  );
}

function ReviewSection({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <div className="mb-1.5 text-[11px] font-semibold text-slate-500">{label}</div>
      {children}
    </div>
  );
}

function TabButton({
  active,
  icon: Icon,
  label,
  badge,
}: {
  active?: boolean;
  icon: LucideIcon;
  label: string;
  badge?: number;
}) {
  return (
    <button
      className={
        "-mb-px flex items-center gap-2 border-b-2 pb-3 text-sm font-medium transition " +
        (active
          ? "border-sky-500 text-sky-600"
          : "border-transparent text-slate-500 hover:text-slate-700")
      }
    >
      <Icon className="h-4 w-4" />
      {label}
      {typeof badge === "number" && (
        <span className="rounded-md bg-slate-100 px-1.5 py-0.5 text-[11px] font-semibold text-slate-600">
          {badge}
        </span>
      )}
    </button>
  );
}

function ConnectorWithLabel({ label }: { label: string }) {
  return (
    <div className="relative flex h-12 w-px flex-col items-center justify-center bg-slate-300">
      <span className="absolute whitespace-nowrap rounded-full border border-slate-200 bg-white px-2.5 py-0.5 text-[10px] font-medium text-slate-500 shadow-sm">
        {label}
      </span>
    </div>
  );
}

const STEP_STYLES: Record<
  SequenceStep["kind"],
  { icon: LucideIcon; bg: string; color: string; label: string }
> = {
  call: { icon: Phone, bg: "bg-emerald-50", color: "text-emerald-600", label: "Call" },
  sms: { icon: MessageSquare, bg: "bg-violet-50", color: "text-violet-600", label: "SMS" },
  email: { icon: Mail, bg: "bg-amber-50", color: "text-amber-600", label: "Email" },
};

function StepCard({ step }: { step: SequenceStep }) {
  const style = STEP_STYLES[step.kind];
  const Icon = style.icon;
  return (
    <div className="w-full max-w-2xl overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
      <div className="flex items-center justify-between px-4 py-3">
        <div className="flex items-center gap-2">
          <GripVertical className="h-4 w-4 text-slate-300" />
          <div
            className={`flex h-8 w-8 items-center justify-center rounded-lg ${style.bg} ${style.color}`}
          >
            <Icon className="h-4 w-4" />
          </div>
          <div className="min-w-0">
            <div className="text-sm font-semibold text-slate-800">{step.title}</div>
            {step.subtitle && <div className="text-xs text-slate-500">{step.subtitle}</div>}
          </div>
        </div>
        <div className="flex items-center gap-1">
          <button className="rounded-md border border-slate-200 px-2.5 py-1 text-xs font-medium text-slate-700 hover:bg-slate-50">
            Test
          </button>
          <button className="rounded-md p-1.5 text-slate-400 hover:bg-slate-100">
            <ChevronDown className="h-4 w-4" />
          </button>
          <button className="rounded-md p-1.5 text-slate-400 hover:bg-rose-50 hover:text-rose-500">
            <Trash2 className="h-4 w-4" />
          </button>
        </div>
      </div>

      {(step.body || step.preview) && (
        <div className="space-y-2 border-t border-slate-100 px-5 py-3 pl-14">
          {step.body && <div className="text-sm text-slate-600">{step.body}</div>}
          {step.preview && (
            <div className="rounded-md border-l-2 border-slate-300 bg-slate-50 px-3 py-2 text-sm italic leading-relaxed text-slate-700">
              {step.preview}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

function TimeInput({ value }: { value: string }) {
  return (
    <div className="flex flex-1 items-center justify-between rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700 shadow-sm">
      <span>{value}</span>
      <Clock className="h-4 w-4 text-slate-400" />
    </div>
  );
}

function QuotaChip({
  icon: Icon,
  label,
  used,
  total,
}: {
  icon: LucideIcon;
  label: string;
  used: string;
  total: string;
}) {
  return (
    <div className="inline-flex items-center gap-1.5 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1.5 text-xs font-medium text-emerald-700">
      <Icon className="h-3.5 w-3.5" />
      <span>
        {used}/{total} {label}
      </span>
      <ArrowUpRight className="h-3 w-3 opacity-70" />
    </div>
  );
}
