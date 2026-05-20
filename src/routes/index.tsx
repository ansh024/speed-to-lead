import { createFileRoute } from "@tanstack/react-router";
import {
  ChevronDown,
  ChevronLeft,
  MessageSquareMore,
  Bell,
  Send,
  ArrowLeftRight,
  Trash2,
  FileText as FileIcon,
  Search,
  Mail,
  Linkedin,
  CalendarDays,
  UserPlus,
  PhoneCall,
  MessageCircle,
} from "lucide-react";
import { AppSidebar } from "@/components/app-sidebar";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: "Central Frontdesk — Priyen Logeswaran" },
      { name: "description", content: "Contact detail view in Central Frontdesk CRM." },
    ],
  }),
});

function Index() {
  return (
    <div className="flex h-screen w-full bg-slate-50 text-slate-900 font-sans">
      <AppSidebar />

      {/* Main area */}
      <main className="flex flex-1 flex-col overflow-hidden">
        {/* Topbar */}
        <header className="flex items-center justify-end gap-3 border-b border-slate-200 bg-white px-6 py-3">
          <button className="flex items-center gap-2 rounded-md px-3 py-1.5 text-sm text-slate-600 hover:bg-slate-100">
            <MessageSquareMore className="h-4 w-4" />
            Feedback
          </button>
          <button className="relative rounded-md p-2 text-slate-500 hover:bg-slate-100">
            <Bell className="h-5 w-5" />
            <span className="absolute -right-0.5 -top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-rose-500 text-[10px] font-bold text-white">
              2
            </span>
          </button>
          <button className="rounded-md p-2 hover:bg-slate-100">
            <span className="text-xl">👋</span>
          </button>
          <button className="flex items-center gap-2 rounded-full pl-1 pr-2 hover:bg-slate-100">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-rose-500 text-sm font-semibold text-white">
              A
            </div>
            <ChevronDown className="h-4 w-4 text-slate-400" />
          </button>
        </header>

        {/* Content card */}
        <div className="flex-1 overflow-auto p-6">
          <div className="flex h-full gap-6 rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
            {/* Center column */}
            <section className="flex min-w-0 flex-1 flex-col">
              {/* Header row */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <button className="rounded-md p-1.5 text-slate-500 hover:bg-slate-100">
                    <ChevronLeft className="h-5 w-5" />
                  </button>
                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-sky-100 text-sm font-semibold text-sky-600">
                    PL
                  </div>
                  <h1 className="text-2xl font-semibold text-slate-800">
                    Priyen Logeswaran
                  </h1>
                </div>
                <div className="flex items-center gap-2">
                  <button className="flex items-center gap-2 rounded-lg border border-slate-200 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50">
                    <Send className="h-4 w-4" />
                    Enroll in sequence
                  </button>
                  <button className="rounded-lg border border-slate-200 p-2 text-slate-600 hover:bg-slate-50">
                    <ArrowLeftRight className="h-4 w-4" />
                  </button>
                  <button className="rounded-lg border border-slate-200 p-2 text-slate-600 hover:bg-slate-50">
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>

              {/* Tabs */}
              <div className="mt-6 flex items-center gap-8 border-b border-slate-200">
                {["Activity", "Notes", "Tasks", "Company", "Documents"].map((t, i) => (
                  <button
                    key={t}
                    className={`-mb-px border-b-2 px-1 pb-3 text-sm font-medium transition-colors ${
                      i === 0
                        ? "border-sky-500 text-sky-600"
                        : "border-transparent text-slate-500 hover:text-slate-700"
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>

              {/* Activity summary card */}
              <div className="mt-6 rounded-xl border border-slate-200 bg-slate-50/50 p-4">
                <div className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-wider text-slate-500">
                  <FileIcon className="h-3.5 w-3.5" />
                  Activity Summary
                </div>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">
                  Priyen Logeswaran's contact record was created on May 18, 2026, and is
                  currently marked as qualified. There has been no activity in terms of
                  sequences, calls, emails, or meetings since the record was established.
                  The only recorded action was the creation of the contact via Scheduler.
                </p>
              </div>

              {/* Search + filters */}
              <div className="mt-6 flex items-center gap-4">
                <div className="relative flex-1">
                  <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                  <input
                    type="text"
                    placeholder="Search activities..."
                    className="w-full rounded-lg border border-slate-200 bg-white py-2.5 pl-10 pr-3 text-sm placeholder:text-slate-400 focus:border-sky-400 focus:outline-none focus:ring-2 focus:ring-sky-100"
                  />
                </div>
                <div className="flex items-center gap-5 text-sm">
                  {[
                    { label: "All", active: true },
                    { label: "Calls" },
                    { label: "Chat" },
                    { label: "Emails" },
                    { label: "LinkedIn" },
                    { label: "SMS" },
                  ].map((f) => (
                    <button
                      key={f.label}
                      className={`font-medium transition-colors ${
                        f.active
                          ? "text-sky-600"
                          : "text-slate-500 hover:text-slate-700"
                      }`}
                    >
                      {f.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Today section */}
              <div className="mt-6">
                <button className="flex w-full items-center justify-between">
                  <span className="text-base font-semibold text-slate-800">Today</span>
                  <ChevronDown className="h-5 w-5 text-slate-400" />
                </button>

                <div className="mt-4 flex items-center justify-between rounded-lg px-2 py-3 hover:bg-slate-50">
                  <div className="flex items-center gap-3">
                    <div className="flex h-7 w-7 items-center justify-center rounded-full bg-sky-100 text-[11px] font-semibold text-sky-600">
                      SC
                    </div>
                    <div className="text-sm">
                      <span className="font-semibold text-slate-800">Scheduler</span>
                      <span className="ml-2 text-slate-500">created</span>
                      <span className="ml-2 rounded-md bg-sky-50 px-2 py-0.5 text-sky-600">
                        Priyen Logeswaran
                      </span>
                    </div>
                  </div>
                  <span className="text-xs text-slate-400">01:26</span>
                </div>
              </div>
            </section>

            {/* Right column */}
            <aside className="w-[340px] shrink-0 overflow-y-auto border-l border-slate-200 pl-6">
              {/* Header */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-sky-100 text-sm font-semibold text-sky-600">
                    PL
                  </div>
                  <div className="font-semibold text-slate-800">Priyen Logeswaran</div>
                </div>
              </div>

              <div className="mt-4 flex items-center justify-end gap-2">
                <button className="flex items-center gap-1.5 rounded-md border border-slate-200 px-2.5 py-1.5 text-xs font-medium text-slate-600 hover:bg-slate-50">
                  <CalendarDays className="h-3.5 w-3.5" />
                  Schedule
                </button>
                <button className="rounded-md bg-sky-500 p-1.5 text-white hover:bg-sky-600">
                  <UserPlus className="h-4 w-4" />
                </button>
                <button className="rounded-md border border-slate-200 p-1.5 text-slate-500 hover:bg-slate-50">
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>

              {/* Quick channels */}
              <div className="mt-4 flex items-center gap-2">
                {[
                  { bg: "bg-sky-50", icon: <PhoneCall className="h-4 w-4 text-sky-600" /> },
                  { bg: "bg-rose-50", icon: <Mail className="h-4 w-4 text-rose-500" /> },
                  {
                    bg: "bg-emerald-50",
                    icon: <MessageCircle className="h-4 w-4 text-emerald-500" />,
                  },
                  {
                    bg: "bg-emerald-50",
                    icon: <MessageCircle className="h-4 w-4 text-emerald-600" />,
                  },
                ].map((c, i) => (
                  <button
                    key={i}
                    className={`relative flex h-9 w-9 items-center justify-center rounded-lg ${c.bg} hover:opacity-80`}
                  >
                    {c.icon}
                    {i < 2 && (
                      <span className="absolute -right-0.5 -top-0.5 h-2 w-2 rounded-full bg-amber-400 ring-2 ring-white" />
                    )}
                  </button>
                ))}
              </div>

              {/* Sub tabs */}
              <div className="mt-5 flex items-center gap-6 border-b border-slate-200 text-sm">
                {["Info", "Activity", "Tasks", "Notes"].map((t, i) => (
                  <button
                    key={t}
                    className={`-mb-px border-b-2 pb-2 font-medium transition-colors ${
                      i === 0
                        ? "border-sky-500 text-sky-600"
                        : "border-transparent text-slate-500 hover:text-slate-700"
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>

              {/* Activity summary */}
              <div className="mt-4 rounded-xl border border-slate-200 bg-slate-50/50 p-3">
                <div className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-wider text-slate-500">
                  <FileIcon className="h-3.5 w-3.5" />
                  Activity Summary
                </div>
                <p className="mt-2 text-xs leading-relaxed text-slate-600">
                  Priyen Logeswaran's contact record was created on May 18, 2026, and is
                  currently marked as qualified. There have been no activities recorded in
                  sequences, calls, emails, or meetings, and the CRM feed volume index is
                  low, indicating minimal engagement.
                </p>
              </div>

              {/* Contact card */}
              <div className="mt-4 rounded-xl border border-slate-200 p-3">
                <div className="text-[11px] font-semibold uppercase tracking-wider text-slate-500">
                  Contact
                </div>
                <dl className="mt-3 space-y-3 text-sm">
                  <Row label="Email">
                    <div className="flex items-center gap-1.5">
                      <a className="text-sky-600 hover:underline" href="#">
                        priyen@conciergemedical.co.uk
                      </a>
                      <Mail className="h-3.5 w-3.5 text-rose-500" />
                    </div>
                  </Row>
                  <Row label="Phone">
                    <div className="flex items-center gap-1.5">
                      <span className="text-slate-700">+447801994831</span>
                      <MessageCircle className="h-3.5 w-3.5 text-slate-400" />
                      <PhoneCall className="h-3.5 w-3.5 text-emerald-500" />
                    </div>
                  </Row>
                  <Row label="LinkedIn">
                    <div className="flex items-center gap-1.5 text-slate-400">
                      Add LinkedIn URL
                      <Linkedin className="h-3.5 w-3.5 text-sky-600" />
                    </div>
                  </Row>
                  <Row label="Location">
                    <span className="text-slate-400">Add location</span>
                  </Row>
                  <Row label="Status">
                    <button className="flex items-center gap-1 text-emerald-600">
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                      Qualified
                      <ChevronDown className="h-3.5 w-3.5" />
                    </button>
                  </Row>
                  <Row label="Assignee">
                    <button className="flex items-center gap-1 text-slate-500">
                      Unassigned
                      <ChevronDown className="h-3.5 w-3.5" />
                    </button>
                  </Row>
                  <Row label="Source">
                    <span className="text-slate-700">scheduler</span>
                  </Row>
                  <Row label="Description">
                    <span className="text-slate-400">Add description</span>
                  </Row>
                  <Row label="Tags">
                    <span className="text-slate-400">Add tags</span>
                  </Row>
                </dl>
              </div>

              {/* Signal Fields */}
              <div className="mt-6 rounded-xl border border-slate-200 p-4">
                <div className="flex items-center gap-2">
                  <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-700">
                    Signal Fields
                  </span>
                  <span className="rounded-full bg-violet-100 px-2 py-0.5 text-[10px] font-semibold text-violet-700">
                    NEW
                  </span>
                </div>
                <dl className="mt-3 space-y-2.5 text-sm">
                  <Row label="Confidence tier">
                    <span className="font-medium text-rose-500">High</span>
                  </Row>
                  <Row label="Signal type">
                    <span className="text-slate-700">Interested, didn't book</span>
                  </Row>
                  <Row label="Channel of origin">
                    <span className="text-slate-700">Phone call</span>
                  </Row>
                  <Row label="Last inbound">
                    <span className="text-slate-700">Today 2:14 PM</span>
                  </Row>
                  <Row label="Booked/Bought">
                    <span className="font-medium text-rose-500">No</span>
                  </Row>
                  <Row label="Intent tags">
                    <div className="flex items-center gap-1.5">
                      <span className="rounded-md border border-slate-200 bg-slate-50 px-2 py-0.5 text-xs text-slate-600">
                        pricing_question
                      </span>
                      <span className="rounded-md border border-slate-200 bg-slate-50 px-2 py-0.5 text-xs text-slate-600">
                        multi_location
                      </span>
                    </div>
                  </Row>
                  <Row label="Do not contact">
                    <span className="font-medium text-emerald-600">No</span>
                  </Row>
                </dl>
              </div>

              {/* Handoff Note */}
              <div className="mt-4 rounded-xl border border-slate-200 p-4">
                <div className="flex items-center gap-2">
                  <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-700">
                    Handoff Note
                  </span>
                  <span className="rounded-full bg-violet-100 px-2 py-0.5 text-[10px] font-semibold text-violet-700">
                    NEW
                  </span>
                </div>
                <blockquote className="mt-3 rounded-md border-l-4 border-amber-400 bg-slate-50 p-3 text-sm italic leading-relaxed text-slate-700">
                  "Caller expressed strong interest in the commercial package, asked
                  about pricing for 12 users. Said they needed to check with their team
                  before booking. Call lasted 2m 14s."
                </blockquote>
              </div>

              {/* Key Quotes */}
              <div className="mt-4 rounded-xl border border-slate-200 p-4">
                <div className="flex items-center gap-2">
                  <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-700">
                    Key Quotes
                  </span>
                  <span className="rounded-full bg-violet-100 px-2 py-0.5 text-[10px] font-semibold text-violet-700">
                    NEW
                  </span>
                </div>
                <p className="mt-3 text-sm italic leading-relaxed text-slate-700">
                  "We've got about 12 people who'd need access" · "What does it run per
                  month?"
                </p>
              </div>

              {/* Sequence Status */}
              <div className="mt-4 rounded-xl border border-slate-200 p-4">
                <div className="text-[11px] font-semibold uppercase tracking-wider text-slate-700">
                  Sequence Status
                </div>
                <dl className="mt-3 space-y-2.5 text-sm">
                  <Row label="Active sequence">
                    <span className="rounded-full bg-emerald-100 px-2.5 py-0.5 text-xs font-medium text-emerald-700">
                      Hot Lead
                    </span>
                  </Row>
                  <Row label="Current step">
                    <span className="text-slate-700">Step 2 — SMS</span>
                  </Row>
                  <Row label="Next action">
                    <span className="text-slate-700">Today 2:39 PM</span>
                  </Row>
                </dl>
              </div>
            </aside>
          </div>
        </div>
      </main>
    </div>
  );
}

function Row({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex items-center justify-between">
      <dt className="text-slate-500">{label}</dt>
      <dd>{children}</dd>
    </div>
  );
}
