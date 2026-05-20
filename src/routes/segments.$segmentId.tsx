import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import {
  ChevronLeft,
  ChevronDown,
  Download,
  Plus,
  X,
  MessageSquareMore,
  Bell,
} from "lucide-react";
import { AppSidebar } from "@/components/app-sidebar";
import {
  getSegment,
  type Condition,
  type ConditionToken,
} from "@/data/segments";

export const Route = createFileRoute("/segments/$segmentId")({
  component: SegmentDetailPage,
  loader: ({ params }) => {
    const segment = getSegment(params.segmentId);
    if (!segment) throw notFound();
    return { segment };
  },
  head: ({ loaderData }) => ({
    meta: [
      {
        title: loaderData?.segment
          ? `${loaderData.segment.name} — Segments`
          : "Segment",
      },
    ],
  }),
});

function SegmentDetailPage() {
  const { segment } = Route.useLoaderData();
  const hasConditions = segment.conditions.length > 0;

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

        <div className="flex-1 overflow-auto p-8">
          <div className="mx-auto max-w-5xl">
            {/* Back link */}
            <Link
              to="/segments"
              className="inline-flex items-center gap-1 text-sm text-slate-500 hover:text-slate-700"
            >
              <ChevronLeft className="h-4 w-4" />
              Segments
            </Link>

            {/* Title row */}
            <div className="mt-2 flex flex-wrap items-center justify-between gap-3">
              <h1 className="text-3xl font-semibold tracking-tight text-slate-900">
                {segment.name}
              </h1>
              <div className="flex items-center gap-4">
                <div className="hidden items-center gap-1.5 text-xs text-slate-500 sm:flex">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                  Auto-updating
                  <span className="ml-2 text-slate-400">
                    Last updated 35 minutes ago
                  </span>
                </div>
                <button className="flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 shadow-sm hover:bg-slate-50">
                  <Download className="h-4 w-4" />
                  Export
                </button>
                <button className="rounded-lg bg-gradient-to-b from-sky-500 to-sky-600 px-4 py-2 text-sm font-medium text-white shadow-sm shadow-sky-500/30 hover:from-sky-500 hover:to-sky-700">
                  Save Segment
                </button>
              </div>
            </div>

            {/* Tabs */}
            <div className="mt-5 flex items-center gap-8 border-b border-slate-200 text-sm">
              <button className="-mb-px border-b-2 border-sky-500 pb-3 font-medium text-sky-600">
                Overview
              </button>
              <button className="-mb-px flex items-center gap-2 border-b-2 border-transparent pb-3 font-medium text-slate-500 hover:text-slate-700">
                People
                <span className="rounded-md bg-slate-100 px-2 py-0.5 text-xs text-slate-600">
                  {segment.people.toLocaleString()}
                </span>
              </button>
            </div>


            {/* Builder */}
            <section className="mt-6 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">

              <div className="space-y-3 px-5 py-5">
                {hasConditions ? (
                  segment.conditions.map((c: Condition, i: number) => (
                    <ConditionRow key={i} condition={c} />
                  ))
                ) : (
                  <EmptyConditionRow />
                )}

                <button className="flex items-center gap-1.5 pt-2 text-sm font-medium text-sky-600 hover:text-sky-700">
                  <Plus className="h-4 w-4" />
                  Add condition
                </button>
              </div>

              <div className="flex items-center justify-between border-t border-slate-200 bg-slate-50 px-5 py-3">
                <div className="text-sm">
                  <div className="font-semibold text-slate-800">
                    {segment.people.toLocaleString()} contacts match
                  </div>
                  <div className="text-xs text-slate-500">
                    Auto-updates as contacts are tagged by receptionist
                  </div>
                </div>
                <button className="rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 shadow-sm hover:bg-slate-50">
                  Save segment
                </button>
              </div>

            </section>
          </div>
        </div>
      </main>
    </div>
  );
}


function ConditionRow({ condition }: { condition: Condition }) {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <span className="w-12 shrink-0 text-sm text-slate-500">
        {condition.connector}
      </span>
      {condition.tokens.map((t, i) => (
        <Token key={i} token={t} />
      ))}
    </div>
  );
}

function Token({ token }: { token: ConditionToken }) {
  const base =
    "rounded-md px-2.5 py-1 text-sm border transition-colors cursor-pointer";
  const styles: Record<ConditionToken["kind"], string> = {
    "field-new":
      "border-violet-300 bg-violet-50 text-violet-700 hover:bg-violet-100",
    field: "border-slate-200 bg-slate-50 text-slate-700 hover:bg-slate-100",
    op: "border-slate-200 bg-white text-slate-500 hover:bg-slate-50",
    "value-new":
      "border-violet-300 bg-violet-50 text-violet-700 hover:bg-violet-100",
    "value-warn":
      "border-amber-300 bg-amber-50 text-amber-700 hover:bg-amber-100",
    value: "border-slate-200 bg-slate-50 text-slate-700 hover:bg-slate-100",
  };
  return <span className={`${base} ${styles[token.kind]}`}>{token.text}</span>;
}

function EmptyConditionRow() {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <BuilderDropdown label="Person" />
      <BuilderDropdown label="Select field" />
      <BuilderDropdown label="Is" />
      <input
        type="text"
        placeholder="Value"
        className="flex-1 min-w-[160px] rounded-lg border border-slate-200 px-3 py-2 text-sm placeholder:text-slate-400 focus:border-sky-400 focus:outline-none focus:ring-2 focus:ring-sky-100"
      />
      <button className="rounded-md p-1.5 text-slate-400 hover:bg-slate-100">
        <X className="h-4 w-4" />
      </button>
    </div>
  );
}

function BuilderDropdown({ label }: { label: string }) {
  return (
    <button className="flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50">
      {label}
      <ChevronDown className="h-4 w-4 text-slate-400" />
    </button>
  );
}
