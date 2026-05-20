import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ChevronDown,
  MessageSquareMore,
  Bell,
  Search,
  Sparkles,
  Plus,
  Download,
  ArrowUpDown,
  SlidersHorizontal,
  LayoutGrid,
  Mail,
  MoreVertical,
} from "lucide-react";
import { AppSidebar } from "@/components/app-sidebar";
import { contacts, statusMeta } from "@/data/contacts";

export const Route = createFileRoute("/")({
  component: ContactsList,
  head: () => ({
    meta: [
      { title: "Contacts — Central Frontdesk" },
      { name: "description", content: "Browse and manage your CRM contacts." },
    ],
  }),
});

const columns = [
  { label: "Contact Name", width: "w-[20%]" },
  { label: "Email Address", width: "w-[18%]" },
  { label: "Phone Numbers", width: "w-[14%]" },
  { label: "Status", width: "w-[12%]" },
  { label: "Tags", width: "w-[16%]" },
  { label: "Description", width: "w-[14%]" },
  { label: "Con", width: "w-[12%]" },
];

function ContactsList() {
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

        {/* Page */}
        <div className="flex-1 overflow-auto p-8">
          {/* Title row */}
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-semibold tracking-tight text-slate-900">
              Contacts
            </h1>
            <div className="flex items-center gap-3">
              <button className="flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50">
                <Sparkles className="h-4 w-4 text-amber-500" />
                Sync
              </button>
              <button className="flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50">
                <Download className="h-4 w-4" />
                Import/Export
                <ChevronDown className="h-4 w-4 text-slate-400" />
              </button>
              <button className="flex items-center gap-2 rounded-lg bg-sky-500 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-sky-600">
                <Plus className="h-4 w-4" />
                Add Contacts
              </button>
            </div>
          </div>

          {/* Toolbar */}
          <div className="mt-6 flex items-center justify-between">
            <div className="relative w-full max-w-md">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Search"
                className="w-full rounded-lg border border-slate-200 bg-white py-2.5 pl-10 pr-3 text-sm placeholder:text-slate-400 focus:border-sky-400 focus:outline-none focus:ring-2 focus:ring-sky-100"
              />
            </div>
            <div className="flex items-center gap-3">
              <button className="flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-600 hover:bg-slate-50">
                <LayoutGrid className="h-4 w-4 text-sky-500" />
                <ChevronDown className="h-4 w-4 text-slate-400" />
              </button>
              <button className="flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-600 hover:bg-slate-50">
                <ArrowUpDown className="h-4 w-4" />
                Sort
              </button>
              <button className="flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-600 hover:bg-slate-50">
                <SlidersHorizontal className="h-4 w-4" />
                Filter
              </button>
            </div>
          </div>

          {/* Table */}
          <div className="mt-6 overflow-x-auto rounded-xl border border-slate-200 bg-white">
            <table className="w-full min-w-[1040px] border-collapse text-sm [&_td]:whitespace-nowrap [&_th]:whitespace-nowrap">
              <thead>
                <tr className="border-b border-slate-200 text-slate-500">
                  <th className="w-12 px-4 py-3">
                    <input
                      type="checkbox"
                      className="h-4 w-4 rounded border-slate-300"
                    />
                  </th>
                  {columns.map((col) => (
                    <th
                      key={col.label}
                      className={`${col.width} px-4 py-3 text-left font-medium`}
                    >
                      <span className="inline-flex items-center gap-1">
                        {col.label}
                        {col.label === "Contact Name" && (
                          <ChevronDown className="h-3.5 w-3.5" />
                        )}
                      </span>
                    </th>
                  ))}
                  <th className="w-12 px-3 py-3 text-center">
                    <span className="inline-flex h-6 w-6 items-center justify-center rounded-full border border-slate-200 text-slate-400">
                      <Plus className="h-3.5 w-3.5" />
                    </span>
                  </th>
                </tr>
              </thead>
              <tbody>
                {contacts.map((contact) => {
                  const status = statusMeta[contact.status];
                  const [firstTag, ...restTags] = contact.tags;
                  return (
                    <tr
                      key={contact.id}
                      className="group border-b border-slate-100 last:border-0 hover:bg-slate-50/60"
                    >
                      <td className="px-4 py-3">
                        <input
                          type="checkbox"
                          className="h-4 w-4 rounded border-slate-300"
                        />
                      </td>
                      {/* Name */}
                      <td className="px-4 py-3">
                        <Link
                          to="/contacts/$contactId"
                          params={{ contactId: contact.id }}
                          className="flex items-center gap-2.5"
                        >
                          <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-sky-100 text-[11px] font-semibold text-sky-600">
                            {contact.initials}
                          </span>
                          <span className="truncate font-medium text-slate-800 group-hover:text-sky-600">
                            {contact.name}
                          </span>
                        </Link>
                      </td>
                      {/* Email */}
                      <td className="px-4 py-3">
                        {contact.emails.length > 0 ? (
                          <div className="flex items-center gap-1.5">
                            <span className="truncate rounded-md border border-slate-200 bg-slate-50 px-2 py-1 text-xs text-sky-600">
                              {contact.emails[0]}
                            </span>
                            {contact.emails.length > 1 && (
                              <span className="shrink-0 rounded-md bg-slate-100 px-1.5 py-1 text-xs text-slate-500">
                                +{contact.emails.length - 1}
                              </span>
                            )}
                          </div>
                        ) : (
                          <span className="text-slate-300">—</span>
                        )}
                      </td>
                      {/* Phone */}
                      <td className="px-4 py-3">
                        {contact.phones.length > 0 ? (
                          <span className="rounded-md border border-violet-100 bg-violet-50 px-2 py-1 text-xs text-violet-600">
                            {contact.phones[0]}
                          </span>
                        ) : (
                          <span className="text-slate-300">—</span>
                        )}
                      </td>
                      {/* Status */}
                      <td className="px-4 py-3">
                        {contact.status === "pending" ? (
                          <span className="text-slate-400">Pending</span>
                        ) : (
                          <span
                            className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-xs ${
                              contact.status === "qualified"
                                ? "border-emerald-200"
                                : "border-violet-200"
                            } ${status.text}`}
                          >
                            <span className={`h-1.5 w-1.5 rounded-full ${status.dot}`} />
                            {status.label}
                          </span>
                        )}
                      </td>
                      {/* Tags */}
                      <td className="px-4 py-3">
                        {contact.tags.length > 0 ? (
                          <div className="flex items-center gap-1.5">
                            <span className="truncate rounded-md border border-slate-200 bg-slate-50 px-2 py-1 text-xs text-slate-600">
                              {firstTag}
                            </span>
                            {restTags.length > 0 && (
                              <span className="shrink-0 rounded-md bg-slate-100 px-1.5 py-1 text-xs text-slate-500">
                                +{restTags.length}
                              </span>
                            )}
                            <ChevronDown className="h-3.5 w-3.5 shrink-0 text-slate-400" />
                          </div>
                        ) : (
                          <div className="flex items-center gap-1.5 text-slate-400">
                            -
                            <ChevronDown className="h-3.5 w-3.5" />
                          </div>
                        )}
                      </td>
                      {/* Description */}
                      <td className="px-4 py-3">
                        {contact.description ? (
                          <span className="truncate text-slate-600">
                            {contact.description}
                          </span>
                        ) : (
                          <span className="text-slate-300">—</span>
                        )}
                      </td>
                      {/* Con / Magic Fill */}
                      <td className="px-4 py-3">
                        <button className="flex items-center gap-1.5 rounded-lg border border-sky-200 px-2.5 py-1.5 text-xs font-medium text-sky-600 hover:bg-sky-50">
                          <Sparkles className="h-3.5 w-3.5" />
                          Magic Fill
                        </button>
                      </td>
                      {/* Row actions */}
                      <td className="px-3 py-3 text-center">
                        <button className="rounded-md p-1 text-slate-400 hover:bg-slate-100 hover:text-slate-600">
                          <MoreVertical className="h-4 w-4" />
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Magic Fill column header overlay icon */}
          <div className="mt-4 flex items-center gap-1.5 text-xs text-slate-400">
            <Mail className="h-3.5 w-3.5" />
            {contacts.length} contacts
          </div>
        </div>
      </main>
    </div>
  );
}
