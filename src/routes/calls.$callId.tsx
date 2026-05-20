import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import {
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  MessageSquareMore,
  Bell,
  ExternalLink,
  FileText,
  Download,
  Play,
  Volume2,
  Maximize2,
  CheckCircle2,
  Flag,
  Copy,
} from "lucide-react";
import { AppSidebar } from "@/components/app-sidebar";
import { getCallRecord, sentimentMeta } from "@/data/calls";

export const Route = createFileRoute("/calls/$callId")({
  component: CallDetail,
  loader: ({ params }) => {
    const call = getCallRecord(params.callId);
    if (!call) throw notFound();
    return { call };
  },
  head: ({ loaderData }) => ({
    meta: [
      {
        title: loaderData?.call
          ? `Call with ${loaderData.call.callerName} — Central Frontdesk`
          : "Call Detail",
      },
    ],
  }),
});

function CallDetail() {
  const { call } = Route.useLoaderData();
  const s = sentimentMeta[call.sentiment];

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

        <div className="flex-1 overflow-auto">
          {/* Call header */}
          <div className="border-b border-slate-200 bg-white px-8 pb-0 pt-6">
            {/* Title row */}
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-bold text-slate-900">
                Call with{" "}
                <span className="text-sky-500">{call.callerName}</span>{" "}
                <span className="text-sky-500">({call.phone})</span>
              </h1>
              <button className="text-slate-400 hover:text-slate-600">
                <Copy className="h-4 w-4" />
              </button>
            </div>

            {/* Meta row */}
            <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-slate-500">
              <Link to="/calls" className="text-slate-400 hover:text-slate-600">
                <ChevronLeft className="h-4 w-4 inline -mt-0.5" />
              </Link>
              <span>{call.dateISO}</span>
              <span className="text-slate-300">•</span>
              <span>{call.duration}</span>
              <span className="text-slate-300">•</span>
              <span className="font-medium text-slate-700">Anonymous Gecko</span>
              <span className="text-slate-300">•</span>
              <span className={`inline-flex items-center gap-1 font-medium ${s.text}`}>
                <span className={`h-1.5 w-1.5 rounded-full ${s.dot}`} />
                {call.sentiment.toLowerCase()}
              </span>
              {call.callsDetected && (
                <>
                  <span className="text-slate-300">•</span>
                  <span className="text-slate-600">📞 {call.callsDetected} Calls Detected</span>
                </>
              )}
              {call.resolved && (
                <>
                  <span className="text-slate-300">•</span>
                  <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2.5 py-0.5 text-xs font-semibold text-emerald-700">
                    <CheckCircle2 className="h-3.5 w-3.5" />
                    Resolved
                  </span>
                </>
              )}
            </div>

            {/* Tags */}
            <div className="mt-2 flex items-center gap-2">
              {call.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-md border border-slate-200 bg-slate-50 px-2.5 py-0.5 text-xs font-medium text-slate-600"
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* Action buttons */}
            <div className="mt-4 flex items-center gap-2 pb-0">
              <Link
                to="/"
                className="flex items-center gap-1.5 rounded-t-lg border border-b-0 border-slate-200 bg-sky-500 px-4 py-2 text-sm font-medium text-white"
              >
                <ExternalLink className="h-4 w-4" />
                View in CRM
              </Link>
              <button className="flex items-center gap-1.5 rounded-t-lg border border-b-0 border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-50">
                <FileText className="h-4 w-4" />
                Transcript
              </button>
              <button className="flex items-center gap-1.5 rounded-t-lg border border-b-0 border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-50">
                <Download className="h-4 w-4" />
                Audio
              </button>
              <button className="ml-1 rounded-lg border border-slate-200 bg-white p-2 text-slate-500 hover:bg-slate-50">
                <ChevronLeft className="h-4 w-4" />
              </button>
              <button className="rounded-lg border border-slate-200 bg-white p-2 text-slate-500 hover:bg-slate-50">
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Two-column body */}
          <div className="flex h-[calc(100vh-232px)] gap-0">
            {/* Left: Summary */}
            <div className="flex-1 overflow-y-auto border-r border-slate-200 bg-white p-6">
              {/* Tab switcher */}
              <div className="flex items-center gap-1">
                <button className="rounded-lg bg-sky-500 px-4 py-2 text-sm font-semibold text-white">
                  Summary
                </button>
                <button className="rounded-lg px-4 py-2 text-sm font-medium text-slate-500 hover:bg-slate-100">
                  Activity
                </button>
              </div>

              {/* Summary text */}
              <div className="mt-5">
                <h3 className="text-base font-bold text-slate-900">Summary</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">
                  {call.summary}
                </p>
              </div>

              {/* Actions Taken */}
              <div className="mt-6">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5 text-emerald-500" />
                  <span className="font-bold text-slate-900">Actions Taken</span>
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-emerald-100 text-[11px] font-bold text-emerald-700">
                    {call.actions.length}
                  </span>
                </div>
                <ul className="mt-3 space-y-2.5">
                  {call.actions.map((action, i) => (
                    <li key={i} className="flex items-center gap-2.5 text-sm text-slate-600">
                      <span className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full border-2 border-slate-300" />
                      {action}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Tickets */}
              <div className="mt-6">
                <div className="flex items-center gap-2">
                  <Flag className="h-5 w-5 text-slate-400" />
                  <span className="font-bold text-slate-900">Tickets</span>
                </div>
                <p className="mt-2 text-sm text-slate-400">No tickets created for this call.</p>
              </div>
            </div>

            {/* Right: Player + Transcript */}
            <div className="w-[420px] shrink-0 overflow-y-auto bg-white p-6">
              {/* Audio player */}
              <div className="flex items-center gap-3 rounded-xl bg-slate-900 px-4 py-3">
                <button className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white text-slate-900 shadow hover:bg-slate-100">
                  <Play className="h-4 w-4 translate-x-0.5 fill-slate-900" />
                </button>
                <span className="text-xs font-semibold text-white">1x</span>
                <Volume2 className="h-4 w-4 shrink-0 text-slate-400" />
                <div className="flex flex-1 items-center gap-2">
                  <span className="h-1 w-2 rounded-full bg-white" />
                  <div className="h-1 flex-1 rounded-full bg-slate-600">
                    <div className="h-full w-0 rounded-full bg-white" />
                  </div>
                </div>
                <span className="shrink-0 text-xs text-slate-400">00:00 / {call.duration}</span>
                <button className="text-slate-400 hover:text-white">
                  <Maximize2 className="h-4 w-4" />
                </button>
              </div>

              {/* Transcript */}
              <div className="mt-5">
                <h3 className="text-base font-bold text-slate-900">Transcript</h3>
                <div className="mt-4 space-y-4">
                  {call.transcript.map((line, i) => (
                    <div key={i} className="flex items-start gap-3">
                      {/* Avatar */}
                      <div
                        className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-xs font-bold ${
                          line.speaker === "AI"
                            ? "bg-sky-100 text-sky-600"
                            : "bg-amber-100 text-amber-700"
                        }`}
                      >
                        {line.speaker === "AI" ? "AI" : line.name[0].toUpperCase()}
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-baseline gap-2">
                          <span className="text-sm font-semibold text-slate-800">
                            {line.name}
                          </span>
                          <span className="text-xs text-sky-500">{line.time}</span>
                        </div>
                        <p className="mt-0.5 text-sm leading-relaxed text-slate-600">
                          {line.text}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
