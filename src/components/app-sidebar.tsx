import { Link, useRouterState } from "@tanstack/react-router";
import {
  Menu,
  Sparkles,
  ChevronDown,
  HelpCircle,
  Table2,
  Users,
  Send,
  ListChecks,
  Calendar,
} from "lucide-react";

function NavItem({
  icon: Icon,
  label,
  to,
  active,
  hasChevron,
  open,
}: {
  icon: any;
  label: string;
  to?: string;
  active?: boolean;
  hasChevron?: boolean;
  open?: boolean;
}) {
  const className = `flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors ${
    active
      ? "bg-sky-50 text-sky-600 font-medium"
      : "text-slate-600 hover:bg-slate-100"
  }`;
  const inner = (
    <>
      <Icon className="h-4 w-4" />
      <span className="flex-1 text-left">{label}</span>
      {hasChevron && (
        <ChevronDown
          className={`h-4 w-4 transition-transform ${open ? "" : "-rotate-90"}`}
        />
      )}
    </>
  );
  if (to) {
    return (
      <Link to={to} className={className}>
        {inner}
      </Link>
    );
  }
  return <button className={className}>{inner}</button>;
}

export function AppSidebar() {
  const pathname = useRouterState({
    select: (s) => s.location.pathname,
  });
  return (
    <aside className="flex w-64 flex-col border-r border-slate-200 bg-white">
      <div className="flex items-center gap-3 px-4 py-4">
        <button className="rounded-md p-1 text-slate-500 hover:bg-slate-100">
          <Menu className="h-5 w-5" />
        </button>
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-sky-400 to-cyan-500 text-white">
            <Sparkles className="h-4 w-4" />
          </div>
          <div className="flex items-center gap-1 font-semibold text-slate-800">
            Central Frontdesk
            <ChevronDown className="h-4 w-4 text-slate-400" />
          </div>
        </div>
      </div>

      <nav className="flex-1 space-y-1 overflow-y-auto px-3 py-2">
        <NavItem icon={Table2} label="CRM" hasChevron open />
        <div className="space-y-1 pl-3">
          <NavItem icon={Users} label="Contacts" to="/" active={pathname === "/"} />
          <NavItem icon={Calendar} label="Events" />
          <NavItem
            icon={ListChecks}
            label="Segments"
            to="/segments"
            active={pathname === "/segments"}
          />
          <NavItem
            icon={Send}
            label="Sequences"
            to="/sequences"
            active={pathname.startsWith("/sequences")}
          />
        </div>
      </nav>

      <div className="px-4 py-3">
        <button className="flex h-9 w-9 items-center justify-center rounded-full bg-sky-500 text-white shadow-sm hover:bg-sky-600">
          <HelpCircle className="h-5 w-5" />
        </button>
      </div>

      <div className="border-t border-slate-200 p-3">
        <button className="flex w-full items-center gap-2 rounded-lg border border-slate-200 px-3 py-2 text-sm hover:bg-slate-50">
          <div className="flex h-6 w-6 items-center justify-center rounded bg-violet-600 text-[11px] font-bold text-white">
            W
          </div>
          <span className="flex-1 text-left font-medium text-slate-700">Wing PROD</span>
          <ChevronDown className="h-4 w-4 text-slate-400" />
        </button>
      </div>
    </aside>
  );
}

export function AppTopbar() {
  return (
    <header className="flex items-center justify-end gap-3 border-b border-slate-200 bg-white px-6 py-3">
      <button className="flex items-center gap-2 rounded-md px-3 py-1.5 text-sm text-slate-600 hover:bg-slate-100">
        Feedback
      </button>
      <button className="flex items-center gap-2 rounded-full pl-1 pr-2 hover:bg-slate-100">
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-rose-500 text-sm font-semibold text-white">
          A
        </div>
        <ChevronDown className="h-4 w-4 text-slate-400" />
      </button>
    </header>
  );
}
