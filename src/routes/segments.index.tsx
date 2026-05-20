import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Search,
  Download,
  Plus,
  Trash2,
  ChevronDown,
  MessageSquareMore,
  Bell,
} from "lucide-react";
import { AppSidebar } from "@/components/app-sidebar";
import { segments } from "@/data/segments";

export const Route = createFileRoute("/segments/")({
  component: SegmentsPage,
  head: () => ({
    meta: [
      { title: "Segments — Central Frontdesk" },
      { name: "description", content: "Browse and manage CRM segments." },
    ],
  }),
});


function SegmentsPage() {
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
          <button className="flex items-center gap-2 rounded-full pl-1 pr-2 hover:bg-slate-100">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-rose-500 text-sm font-semibold text-white">
              A
            </div>
            <ChevronDown className="h-4 w-4 text-slate-400" />
          </button>
        </header>

        {/* Page */}
        <div className="flex-1 overflow-auto p-8">
          <div className="mx-auto max-w-6xl">
            {/* Title row */}
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-semibold tracking-tight text-slate-900">
                  Segments
                </h1>
                <p className="mt-1 text-sm text-slate-500">
                  Group contacts by shared traits and activate them in sequences.
                </p>
              </div>
              <div className="flex items-center gap-3">
                <button className="flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 shadow-sm transition hover:bg-slate-50">
                  <Download className="h-4 w-4" />
                  Export
                </button>
                <button className="flex items-center gap-2 rounded-lg bg-gradient-to-b from-sky-500 to-sky-600 px-4 py-2 text-sm font-medium text-white shadow-sm shadow-sky-500/30 transition hover:from-sky-500 hover:to-sky-700">
                  <Plus className="h-4 w-4" />
                  Create Segment
                </button>
              </div>
            </div>

            {/* Stats row */}
            <div className="mt-6 grid grid-cols-3 gap-4">
              <StatCard label="Total segments" value="2" trend="+1 this week" />
              <StatCard label="People reached" value="5,022" trend="across 2 segments" />
              <StatCard label="Active runs" value="0" trend="No active syncs" />
            </div>

            {/* Filters */}
            <div className="mt-6 flex items-center gap-3 rounded-xl border border-slate-200 bg-white p-3 shadow-sm">
              <div className="relative flex-1">
                <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  placeholder="Find by name or ID"
                  className="w-full rounded-lg border border-slate-200 bg-slate-50 py-2 pl-10 pr-3 text-sm placeholder:text-slate-400 focus:border-sky-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-sky-100"
                />
              </div>
              <Dropdown label="All Status" />
              <Dropdown label="All Tags" />
            </div>

            {/* Table */}
            <div className="mt-4 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-slate-50 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                    <th className="w-12 px-4 py-3">
                      <input
                        type="checkbox"
                        className="h-4 w-4 rounded border-slate-300 text-sky-500 focus:ring-sky-400"
                      />
                    </th>
                    <th className="px-4 py-3">Name</th>
                    <th className="px-4 py-3">People</th>
                    <th className="px-4 py-3">Status</th>
                    <th className="w-16 px-4 py-3" />
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {segments.map((s) => {
                    const Icon = s.icon;
                    return (
                      <tr
                        key={s.id}
                        className="group transition-colors hover:bg-sky-50/40"
                      >
                        <td className="px-4 py-4">
                          <input
                            type="checkbox"
                            className="h-4 w-4 rounded border-slate-300 text-sky-500 focus:ring-sky-400"
                          />
                        </td>
                        <td className="px-4 py-4">
                          <div className="flex items-start gap-3">
                            <div
                              className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${s.iconBg} ${s.iconColor}`}
                            >
                              <Icon className="h-4 w-4" />
                            </div>
                            <div className="min-w-0">
                              <Link
                                to="/segments/$segmentId"
                                params={{ segmentId: s.id }}
                                className="font-semibold text-slate-800 hover:text-sky-600 hover:underline"
                              >
                                {s.name}
                              </Link>
                              <div className="mt-0.5 text-xs leading-relaxed text-slate-500">
                                {s.custom
                                  ? `Created ${s.createdAgo} · Last edited ${s.editedAgo}`
                                  : s.description}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-4 py-4 align-top">
                          <span className="rounded-md bg-slate-100 px-2.5 py-1 text-sm font-medium text-slate-700">
                            {s.people.toLocaleString()}
                          </span>
                        </td>
                        <td className="px-4 py-4 align-top">
                          {s.status === "active" ? (
                            <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-medium text-emerald-700">
                              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                              Active
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1.5 rounded-full bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-600">
                              <span className="h-1.5 w-1.5 rounded-full bg-slate-400" />
                              Inactive
                            </span>
                          )}
                        </td>
                        <td className="px-4 py-4 text-right align-top">
                          <button className="rounded-md p-2 text-slate-400 opacity-0 transition hover:bg-rose-50 hover:text-rose-500 group-hover:opacity-100">
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

function StatCard({
  label,
  value,
  trend,
}: {
  label: string;
  value: string;
  trend: string;
}) {
  return (
    <div className="flex items-center justify-between rounded-lg border border-slate-200 bg-white px-3 py-2 shadow-sm">
      <div className="min-w-0">
        <div className="text-[10px] font-medium uppercase tracking-wider text-slate-500">
          {label}
        </div>
        <div className="truncate text-[11px] text-slate-500">{trend}</div>
      </div>
      <div className="ml-3 text-lg font-semibold text-slate-900">{value}</div>
    </div>
  );
}

function Dropdown({ label }: { label: string }) {
  return (
    <button className="flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50">
      {label}
      <ChevronDown className="h-4 w-4 text-slate-400" />
    </button>
  );
}
