import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import {
  ChevronDown,
  MessageSquareMore,
  Bell,
  Search,
  Play,
  Archive,
  SlidersHorizontal,
  Settings,
  Copy,
  MessageSquare,
} from "lucide-react";
import { AppSidebar } from "@/components/app-sidebar";
import { callRecords, sentimentMeta } from "@/data/calls";

export const Route = createFileRoute("/calls/")({
  component: CallsPage,
  head: () => ({
    meta: [
      { title: "Calls — Central Frontdesk" },
      { name: "description", content: "Monitor and manage your AI receptionist calls." },
    ],
  }),
});

const tabs = [
  { label: "All", count: 26 },
  { label: "Sales inquiry", count: 1 },
  { label: "Pricing", count: 0 },
  { label: "Scheduling", count: 1 },
  { label: "Issue", count: 5 },
  { label: "Urgent", count: 0 },
];

function groupByDate<T extends { date: string }>(items: T[]) {
  const groups: Record<string, T[]> = {};
  for (const item of items) {
    if (!groups[item.date]) groups[item.date] = [];
    groups[item.date].push(item);
  }
  return Object.entries(groups);
}

function CallsPage() {
  const [activeTab, setActiveTab] = useState("All");
  const [search, setSearch] = useState("");

  const filtered = callRecords.filter((c) => {
    const matchesTab = activeTab === "All" || c.tag === activeTab;
    const matchesSearch =
      search === "" ||
      c.summary.toLowerCase().includes(search.toLowerCase()) ||
      c.phone.includes(search);
    return matchesTab && matchesSearch;
  });

  const grouped = groupByDate(filtered);

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

        <div className="flex-1 overflow-auto p-8">
          {/* Page header */}
          <div className="flex items-start justify-between">
            <div>
              <h1 className="text-3xl font-bold tracking-tight text-slate-900">Calls</h1>
              <p className="mt-1 text-sm text-slate-500">Monitor and manage your AI receptionist</p>
            </div>
            <div className="rounded-xl border border-slate-200 bg-white px-5 py-3 text-right shadow-sm">
              <div className="text-xs text-slate-500">Your AI Receptionist's Number</div>
              <div className="mt-1 flex items-center gap-2">
                <span className="text-lg font-bold tracking-tight text-slate-900">
                  +1 855 560 4540
                </span>
                <button className="text-slate-400 hover:text-slate-600">
                  <Copy className="h-4 w-4" />
                </button>
              </div>
              <button className="mt-0.5 text-xs font-medium text-sky-500 hover:text-sky-600">
                Manage your number
              </button>
            </div>
          </div>

          {/* Filter tabs */}
          <div className="mt-6 flex items-center gap-2">
            {tabs.map((tab) => (
              <button
                key={tab.label}
                onClick={() => setActiveTab(tab.label)}
                className={`flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-sm font-medium transition-colors ${
                  activeTab === tab.label
                    ? "bg-sky-500 text-white"
                    : "border border-slate-200 bg-white text-slate-600 hover:bg-slate-50"
                }`}
              >
                {tab.label}
                <span
                  className={`rounded-full px-1.5 py-0.5 text-[11px] font-semibold leading-none ${
                    activeTab === tab.label
                      ? "bg-white/25 text-white"
                      : "bg-slate-100 text-slate-500"
                  }`}
                >
                  {tab.count}
                </span>
              </button>
            ))}
            <button className="ml-1 rounded-full border border-slate-200 bg-white p-2 text-slate-500 hover:bg-slate-50">
              <Settings className="h-4 w-4" />
            </button>
          </div>

          {/* Search + actions */}
          <div className="mt-4 flex items-center gap-3">
            <div className="relative flex-1">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Search calls by name, number or keyword"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full rounded-lg border border-slate-200 bg-white py-2.5 pl-10 pr-3 text-sm placeholder:text-slate-400 focus:border-sky-400 focus:outline-none focus:ring-2 focus:ring-sky-100"
              />
            </div>
            <button className="flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-slate-600 hover:bg-slate-50">
              <Archive className="h-4 w-4" />
              Archived
            </button>
            <button className="flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-slate-600 hover:bg-slate-50">
              <SlidersHorizontal className="h-4 w-4" />
              Filters
              <ChevronDown className="h-4 w-4 text-slate-400" />
            </button>
          </div>

          {/* Call list */}
          <div className="mt-6 space-y-6">
            {grouped.length === 0 && (
              <p className="text-sm text-slate-400">No calls found.</p>
            )}
            {grouped.map(([date, dateCalls]) => (
              <div key={date}>
                <h2 className="mb-3 text-base font-bold text-slate-900">{date}</h2>
                <div className="overflow-hidden rounded-xl border border-slate-200 bg-white">
                  {dateCalls.map((call, idx) => {
                    const s = sentimentMeta[call.sentiment];
                    return (
                      <Link
                        key={call.id}
                        to="/calls/$callId"
                        params={{ callId: call.id }}
                        className={`flex items-center gap-4 px-5 py-4 hover:bg-slate-50/70 ${
                          idx < dateCalls.length - 1 ? "border-b border-slate-100" : ""
                        }`}
                      >
                        {/* Play button */}
                        <button
                          onClick={(e) => e.preventDefault()}
                          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-sky-100 text-sky-500 hover:bg-sky-200 transition-colors"
                        >
                          <Play className="h-4 w-4 translate-x-0.5 fill-sky-500" />
                        </button>

                        {/* Summary + meta */}
                        <div className="min-w-0 flex-1">
                          <p className="truncate text-sm text-slate-800">{call.summary}</p>
                          <div className="mt-1 flex items-center gap-2 text-xs text-slate-400">
                            <span>{call.duration}</span>
                            <span>•</span>
                            <span>{call.phone}</span>
                            {call.hotLead && (
                              <span className="rounded-md border border-rose-300 bg-rose-50 px-2 py-0.5 text-[11px] font-medium text-rose-700">
                                Hot lead. Recommend calling user.
                              </span>
                            )}
                          </div>
                        </div>

                        {/* Sentiment */}
                        <div
                          className={`flex shrink-0 items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium ${s.bg} ${s.text}`}
                        >
                          <span className={`h-1.5 w-1.5 rounded-full ${s.dot}`} />
                          {call.sentiment}
                        </div>

                        {/* Time */}
                        <span className="w-16 shrink-0 text-right text-sm text-slate-400">
                          {call.time}
                        </span>

                        {/* Chat icon */}
                        <button
                          onClick={(e) => e.preventDefault()}
                          className="shrink-0 rounded-md p-1 text-slate-400 hover:bg-slate-100 hover:text-slate-600"
                        >
                          <MessageSquare className="h-5 w-5" />
                        </button>
                      </Link>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
