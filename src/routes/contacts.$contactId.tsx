import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useState } from "react";
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
  Phone,
  Plus,
  Crown,
  MessageSquare,
  PhoneCall,
  MessageCircle,
  X,
  Zap,
  Clock,
  CheckCircle2,
  Sparkles,
} from "lucide-react";
import { AppSidebar } from "@/components/app-sidebar";
import { getContact, statusMeta } from "@/data/contacts";

export const Route = createFileRoute("/contacts/$contactId")({
  component: ContactDetail,
  loader: ({ params }) => {
    const contact = getContact(params.contactId);
    if (!contact) throw notFound();
    return { contact };
  },
  head: ({ loaderData }) => ({
    meta: [
      {
        title: loaderData?.contact
          ? `Central Frontdesk — ${loaderData.contact.name}`
          : "Contact",
      },
      { name: "description", content: "Contact detail view in Central Frontdesk CRM." },
    ],
  }),
});

function ContactDetail() {
  const { contact } = Route.useLoaderData();
  const status = statusMeta[contact.status];
  const primaryEmail = contact.emails[0];
  const primaryPhone = contact.phones[0];
  const [dialerOpen, setDialerOpen] = useState(false);
  const [upsellOpen, setUpsellOpen] = useState(false);
  const [dialNumber, setDialNumber] = useState(primaryPhone ?? "");

  const handleDialerClose = () => {
    setDialerOpen(false);
    setUpsellOpen(true);
  };

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
                  <Link
                    to="/"
                    className="rounded-md p-1.5 text-slate-500 hover:bg-slate-100"
                  >
                    <ChevronLeft className="h-5 w-5" />
                  </Link>
                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-sky-100 text-sm font-semibold text-sky-600">
                    {contact.initials}
                  </div>
                  <h1 className="text-2xl font-semibold text-slate-800">
                    {contact.name}
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
                  {contact.activitySummary}
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
                        {contact.name}
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
              <div className="flex items-start justify-between gap-2">
                <div className="flex min-w-0 flex-1 items-center gap-3">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-sky-100 text-sm font-semibold text-sky-600">
                    {contact.initials}
                  </div>
                  <div className="min-w-0">
                    <div className="truncate font-semibold text-slate-800">
                      {contact.name}
                    </div>
                    {contact.title && (
                      <div className="truncate text-sm text-slate-500">
                        {contact.title}
                      </div>
                    )}
                  </div>
                </div>
                <div className="flex shrink-0 items-center gap-2">
                  <button className="flex items-center gap-1.5 rounded-md border border-slate-200 px-2.5 py-1.5 text-xs font-medium text-slate-600 hover:bg-slate-50">
                    <CalendarDays className="h-3.5 w-3.5" />
                    Schedule
                  </button>
                  <button
                    onClick={() => setDialerOpen(true)}
                    className="relative rounded-md bg-sky-500 p-2 text-white hover:bg-sky-600"
                  >
                    <Phone className="h-4 w-4" />
                    <Plus className="absolute -right-0.5 -top-0.5 h-3 w-3 rounded-full bg-white text-sky-600" />
                  </button>
                  <button className="rounded-md border border-slate-200 p-2 text-slate-500 hover:bg-slate-50">
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>

              {/* Quick channels */}
              <div className="mt-5 flex items-center gap-2.5">
                {[
                  {
                    bg: "bg-sky-500",
                    icon: <Phone className="h-5 w-5 text-white" />,
                    crown: true,
                  },
                  {
                    bg: "bg-[#8d6e63]",
                    icon: <Mail className="h-5 w-5 text-white" />,
                    crown: true,
                  },
                  {
                    bg: "border border-slate-200 bg-white",
                    icon: <MessageSquare className="h-5 w-5 fill-emerald-500 text-emerald-500" />,
                    crown: false,
                  },
                  {
                    bg: "bg-emerald-50",
                    icon: <WhatsAppIcon className="h-5 w-5 text-[#25D366]" />,
                    crown: false,
                  },
                ].map((c, i) => (
                  <button
                    key={i}
                    className={`relative flex h-11 w-11 items-center justify-center rounded-xl shadow-sm transition hover:opacity-90 ${c.bg}`}
                  >
                    {c.icon}
                    {c.crown && (
                      <Crown className="absolute -right-1 -top-1.5 h-3.5 w-3.5 rotate-12 fill-amber-400 text-amber-500" />
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

              {/* Contact card */}
              <div className="mt-4 rounded-xl border border-slate-200 p-3">
                <div className="text-[11px] font-semibold uppercase tracking-wider text-slate-500">
                  Contact
                </div>
                <dl className="mt-3 space-y-3 text-sm">
                  <Row label="Email">
                    {primaryEmail ? (
                      <div className="flex items-center gap-1.5">
                        <a className="text-sky-600 hover:underline" href="#">
                          {primaryEmail}
                        </a>
                        <Mail className="h-3.5 w-3.5 text-rose-500" />
                      </div>
                    ) : (
                      <span className="text-slate-400">Add email</span>
                    )}
                  </Row>
                  <Row label="Phone">
                    {primaryPhone ? (
                      <div className="flex items-center gap-1.5">
                        <span className="text-slate-700">{primaryPhone}</span>
                        <MessageCircle className="h-3.5 w-3.5 text-slate-400" />
                        <PhoneCall className="h-3.5 w-3.5 text-emerald-500" />
                      </div>
                    ) : (
                      <span className="text-slate-400">Add phone</span>
                    )}
                  </Row>
                  <Row label="LinkedIn">
                    {contact.linkedin ? (
                      <a className="text-sky-600 hover:underline" href={contact.linkedin}>
                        View profile
                      </a>
                    ) : (
                      <div className="flex items-center gap-1.5 text-slate-400">
                        Add LinkedIn URL
                        <Linkedin className="h-3.5 w-3.5 text-sky-600" />
                      </div>
                    )}
                  </Row>
                  <Row label="Location">
                    {contact.location ? (
                      <span className="text-slate-700">{contact.location}</span>
                    ) : (
                      <span className="text-slate-400">Add location</span>
                    )}
                  </Row>
                  <Row label="Status">
                    <button className={`flex items-center gap-1 ${status.text}`}>
                      <span className={`h-1.5 w-1.5 rounded-full ${status.dot}`} />
                      {status.label}
                      <ChevronDown className="h-3.5 w-3.5" />
                    </button>
                  </Row>
                  <Row label="Assignee">
                    <button className="flex items-center gap-1 text-slate-500">
                      {contact.assignee ?? "Unassigned"}
                      <ChevronDown className="h-3.5 w-3.5" />
                    </button>
                  </Row>
                  <Row label="Source">
                    <span className="text-slate-700">{contact.source}</span>
                  </Row>
                  <Row label="Description">
                    {contact.description ? (
                      <span className="text-slate-700">{contact.description}</span>
                    ) : (
                      <span className="text-slate-400">Add description</span>
                    )}
                  </Row>
                  <Row label="Tags">
                    {contact.tags.length > 0 ? (
                      <div className="flex flex-wrap items-center justify-end gap-1.5">
                        {contact.tags.map((tag) => (
                          <span
                            key={tag}
                            className="rounded-md border border-slate-200 bg-slate-50 px-2 py-0.5 text-xs text-slate-600"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    ) : (
                      <span className="text-slate-400">Add tags</span>
                    )}
                  </Row>
                </dl>
              </div>

              {/* Signal Fields */}
              {contact.signal && (
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
                      <span className="font-medium text-rose-500">
                        {contact.signal.confidenceTier}
                      </span>
                    </Row>
                    <Row label="Signal type">
                      <span className="text-slate-700">{contact.signal.signalType}</span>
                    </Row>
                    <Row label="Channel of origin">
                      <span className="text-slate-700">
                        {contact.signal.channelOfOrigin}
                      </span>
                    </Row>
                    <Row label="Last inbound">
                      <span className="text-slate-700">{contact.signal.lastInbound}</span>
                    </Row>
                    <Row label="Booked/Bought">
                      <span className="font-medium text-rose-500">
                        {contact.signal.bookedBought}
                      </span>
                    </Row>
                    <Row label="Intent tags">
                      <div className="flex flex-wrap items-center justify-end gap-1.5">
                        {contact.signal.intentTags.map((tag) => (
                          <span
                            key={tag}
                            className="rounded-md border border-slate-200 bg-slate-50 px-2 py-0.5 text-xs text-slate-600"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </Row>
                    <Row label="Do not contact">
                      <span className="font-medium text-emerald-600">
                        {contact.signal.doNotContact}
                      </span>
                    </Row>
                  </dl>
                </div>
              )}

              {/* Handoff Note */}
              {contact.handoffNote && (
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
                    {contact.handoffNote}
                  </blockquote>
                </div>
              )}

              {/* Sequence Status */}
              {contact.sequence && (
                <div className="mt-4 rounded-xl border border-slate-200 p-4">
                  <div className="text-[11px] font-semibold uppercase tracking-wider text-slate-700">
                    Sequence Status
                  </div>
                  <dl className="mt-3 space-y-2.5 text-sm">
                    <Row label="Active sequence">
                      <span
                        className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${contact.sequence.badgeClass}`}
                      >
                        {contact.sequence.name}
                      </span>
                    </Row>
                    <Row label="Current step">
                      <span className="text-slate-700">
                        {contact.sequence.currentStep}
                      </span>
                    </Row>
                    <Row label="Next action">
                      <span className="text-slate-700">
                        {contact.sequence.nextAction}
                      </span>
                    </Row>
                  </dl>
                </div>
              )}
            </aside>
          </div>
        </div>
      </main>

      {/* Dialer modal */}
      {dialerOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
          <div className="relative w-full max-w-[340px] rounded-3xl bg-white px-6 pb-6 pt-5 shadow-2xl">
            {/* Close */}
            <button
              onClick={handleDialerClose}
              className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full bg-slate-100 text-slate-500 hover:bg-slate-200"
            >
              <X className="h-4 w-4" />
            </button>

            <h2 className="text-center text-xl font-bold text-sky-500">Central Dialer</h2>
            <p className="mt-1 text-center text-sm text-slate-400">Max 60 mins per call</p>

            {/* Call From */}
            <div className="mt-5">
              <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                Call From
              </p>
              <button className="mt-1.5 flex w-full items-center justify-between rounded-xl border border-slate-200 px-4 py-3 hover:bg-slate-50">
                <div className="text-left">
                  <div className="font-bold text-slate-800">+18555604540</div>
                  <div className="text-xs text-slate-400">(855) 560-4540</div>
                </div>
                <ChevronDown className="h-4 w-4 text-slate-400" />
              </button>
            </div>

            {/* Number input */}
            <div className="mt-3 flex overflow-hidden rounded-xl border border-sky-400 focus-within:ring-2 focus-within:ring-sky-200">
              <button className="flex items-center gap-1 border-r border-slate-200 px-3 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50">
                <span>🇺🇸</span>
                <span className="ml-1">+1</span>
                <ChevronDown className="ml-0.5 h-3.5 w-3.5 text-slate-400" />
              </button>
              <input
                type="tel"
                value={dialNumber}
                onChange={(e) => setDialNumber(e.target.value)}
                className="flex-1 px-3 py-2.5 text-sm text-slate-700 outline-none"
              />
            </div>

            {/* Numpad */}
            <div className="mt-4 grid grid-cols-3 gap-2.5">
              {["1", "2", "3", "4", "5", "6", "7", "8", "9", "*", "0", "#"].map((k) => (
                <button
                  key={k}
                  onClick={() => setDialNumber((n) => n + k)}
                  className="flex h-14 items-center justify-center rounded-2xl bg-slate-50 text-xl font-medium text-slate-700 shadow-sm hover:bg-slate-100 active:scale-95"
                >
                  {k}
                </button>
              ))}
            </div>

            {/* Bottom row */}
            <div className="mt-3 flex items-center gap-3">
              <button
                onClick={() => setDialNumber((n) => n.slice(0, -1))}
                className="flex h-14 w-14 items-center justify-center rounded-2xl text-slate-400 hover:bg-slate-100"
              >
                <span className="text-xl">⌫</span>
              </button>
              <button className="flex flex-1 items-center justify-center gap-2 rounded-full bg-sky-500 py-4 text-base font-semibold text-white shadow-md hover:bg-sky-600 active:scale-95">
                <Phone className="h-5 w-5" />
                Call
              </button>
            </div>

            <p className="mt-4 text-center text-[11px] font-semibold uppercase tracking-widest text-slate-300">
              Powered by Central
            </p>
          </div>
        </div>
      )}

      {/* Upsell modal */}
      {upsellOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="relative flex w-full max-w-[680px] overflow-hidden rounded-2xl bg-white shadow-2xl">
            {/* Close */}
            <button
              onClick={() => setUpsellOpen(false)}
              className="absolute right-4 top-4 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-slate-100 text-slate-500 hover:bg-slate-200"
            >
              <X className="h-4 w-4" />
            </button>

            {/* Left: copy */}
            <div className="flex flex-1 flex-col justify-center px-9 py-10">
              <span className="inline-flex w-fit items-center gap-1.5 rounded-md bg-sky-100 px-2.5 py-1 text-xs font-semibold text-sky-700">
                Speed to Lead ⚡
              </span>

              <h2 className="mt-4 text-[1.6rem] font-bold leading-tight text-slate-900">
                You reached out to this lead 2 hours late!
              </h2>

              <p className="mt-2 text-sm leading-relaxed text-slate-500">
                AI Sales Rep reaches out in under 60 seconds — so the right
                lead gets the right response, every time.
              </p>

              <ul className="mt-5 space-y-3.5">
                {[
                  {
                    icon: <Zap className="h-4 w-4 text-slate-600" />,
                    text: "Respond in under 60s — before any competitor",
                  },
                  {
                    icon: <CheckCircle2 className="h-4 w-4 text-slate-600" />,
                    text: "Start from a template like Lead Follow-up or Missed Call",
                  },
                  {
                    icon: <Sparkles className="h-4 w-4 text-slate-600" />,
                    text: "Edit, test, and tweak any time",
                  },
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg border border-slate-200 bg-slate-50">
                      {item.icon}
                    </span>
                    <span className="text-sm text-slate-600">{item.text}</span>
                  </li>
                ))}
              </ul>

              <button className="mt-8 flex w-full items-center justify-center gap-2 rounded-xl py-3.5 text-sm font-semibold text-white shadow-sm" style={{ backgroundColor: "#2367BB" }}>
                Try AI Sales Rep
              </button>
              <button
                onClick={() => setUpsellOpen(false)}
                className="mt-3 text-center text-sm text-slate-400 hover:text-slate-600"
              >
                Maybe later
              </button>
            </div>

            {/* Right: product mockup panel */}
            <div className="flex w-[300px] shrink-0 flex-col bg-gradient-to-br from-sky-500 to-blue-700 p-5">
              {/* Fake browser chrome */}
              <div className="overflow-hidden rounded-xl bg-white shadow-lg">
                {/* Mini topbar */}
                <div className="flex items-center justify-between border-b border-slate-100 bg-slate-50 px-3 py-2">
                  <div className="flex items-center gap-1.5">
                    <div className="h-2 w-2 rounded-full bg-rose-400" />
                    <div className="h-2 w-2 rounded-full bg-amber-400" />
                    <div className="h-2 w-2 rounded-full bg-emerald-400" />
                  </div>
                  <div className="h-3 w-24 rounded bg-slate-200" />
                  <div className="h-3 w-6 rounded bg-slate-200" />
                </div>

                {/* Card header */}
                <div className="bg-white px-4 pt-3 pb-2">
                  <div className="text-[11px] font-semibold text-slate-700 uppercase tracking-wider">What happened today</div>
                </div>

                {/* WITHOUT AI */}
                <div className="px-4 pb-3">
                  <div className="mb-1.5 text-[9px] font-semibold uppercase tracking-wider text-rose-500">Without AI</div>
                  <div className="space-y-1.5 text-[11px]">
                    {[
                      { time: "2:14 PM", dot: "bg-amber-400", label: "Lead came in", style: "text-slate-700" },
                      { time: "2:17 PM", dot: "bg-rose-400", label: "Competitor reached out ⚡", style: "text-rose-500 font-semibold" },
                      { time: "4:31 PM", dot: "bg-slate-400", label: "You called", style: "text-slate-400 line-through" },
                    ].map((ev, i) => (
                      <div key={i} className="flex items-center gap-1.5">
                        <span className="w-10 shrink-0 text-slate-600">{ev.time}</span>
                        <span className={`h-1.5 w-1.5 shrink-0 rounded-full ${ev.dot}`} />
                        <span className={ev.style}>{ev.label}</span>
                      </div>
                    ))}
                  </div>
                  <div className="mt-2 flex items-center gap-1.5">
                    <div className="h-1 flex-1 rounded-full bg-rose-100">
                      <div className="h-full w-full rounded-full bg-rose-400" />
                    </div>
                    <span className="text-[10px] font-bold text-rose-500">2h 17m</span>
                  </div>
                </div>

                {/* VS */}
                <div className="mx-4 my-2 flex items-center gap-2">
                  <div className="h-px flex-1 bg-slate-200" />
                  <span className="text-[10px] font-bold text-slate-600">VS</span>
                  <div className="h-px flex-1 bg-slate-200" />
                </div>

                {/* WITH AI */}
                <div className="px-4 pb-4">
                  <div className="mb-1.5 text-[9px] font-semibold uppercase tracking-wider text-emerald-600">With AI Sales Rep</div>
                  <div className="space-y-1.5 text-[11px]">
                    {[
                      { time: "2:14 PM", dot: "bg-amber-400", label: "Lead came in", style: "text-slate-700" },
                      { time: "2:14:47", dot: "bg-sky-400", label: "⚡ AI reached out", style: "text-sky-600 font-semibold" },
                      { time: "2:16 PM", dot: "bg-slate-400", label: "Lead replied ✓", style: "text-slate-700" },
                      { time: "2:18 PM", dot: "bg-emerald-400", label: "Meeting booked 🎉", style: "text-emerald-600 font-semibold" },
                    ].map((ev, i) => (
                      <div key={i} className="flex items-center gap-1.5">
                        <span className="w-10 shrink-0 text-slate-600">{ev.time}</span>
                        <span className={`h-1.5 w-1.5 shrink-0 rounded-full ${ev.dot}`} />
                        <span className={ev.style}>{ev.label}</span>
                      </div>
                    ))}
                  </div>
                  <div className="mt-2 flex items-center gap-1.5">
                    <div className="h-1 flex-1 rounded-full bg-emerald-50">
                      <div className="h-full w-[4%] rounded-full bg-emerald-400" />
                    </div>
                    <span className="text-[10px] font-bold text-emerald-600">47 sec</span>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
    </svg>
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
