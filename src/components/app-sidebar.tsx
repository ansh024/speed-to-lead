import { Link, useRouterState } from "@tanstack/react-router";
import { useState } from "react";
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
  Phone,
  PhoneCall,
  Settings2,
  MessageSquare,
} from "lucide-react";

function NavItem({
  icon: Icon,
  label,
  to,
  active,
  hasChevron,
  open,
  collapsed,
  onClick,
}: {
  icon: any;
  label: string;
  to?: string;
  active?: boolean;
  hasChevron?: boolean;
  open?: boolean;
  collapsed?: boolean;
  onClick?: () => void;
}) {
  const className = `flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors ${
    collapsed ? "justify-center" : ""
  } ${
    active
      ? "bg-sky-50 text-sky-600 font-medium"
      : "text-slate-600 hover:bg-slate-100"
  }`;
  const inner = (
    <>
      <Icon className="h-4 w-4 shrink-0" />
      {!collapsed && (
        <>
          <span className="flex-1 text-left">{label}</span>
          {hasChevron && (
            <ChevronDown
              className={`h-4 w-4 transition-transform ${open ? "" : "-rotate-90"}`}
            />
          )}
        </>
      )}
    </>
  );
  if (to) {
    return (
      <Link to={to} className={className} title={collapsed ? label : undefined}>
        {inner}
      </Link>
    );
  }
  return (
    <button className={className} title={collapsed ? label : undefined} onClick={onClick}>
      {inner}
    </button>
  );
}

function SectionLabel({ label, collapsed }: { label: string; collapsed: boolean }) {
  if (collapsed) return null;
  return (
    <p className="mb-1 mt-3 px-3 text-[10px] font-semibold uppercase tracking-widest text-slate-400">
      {label}
    </p>
  );
}

export function AppSidebar() {
  const pathname = useRouterState({
    select: (s) => s.location.pathname,
  });
  const [collapsed, setCollapsed] = useState(false);
  const [receptionOpen, setReceptionOpen] = useState(true);
  return (
    <aside
      className={`flex flex-col border-r border-slate-200 bg-white transition-[width] duration-200 ${
        collapsed ? "w-16" : "w-64"
      }`}
    >
      <div
        className={`flex items-center gap-3 px-4 py-4 ${
          collapsed ? "justify-center px-0" : ""
        }`}
      >
        <button
          onClick={() => setCollapsed((c) => !c)}
          className="rounded-md p-1 text-slate-500 hover:bg-slate-100"
          aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          <Menu className="h-5 w-5" />
        </button>
        {!collapsed && (
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-sky-400 to-cyan-500 text-white">
              <Sparkles className="h-4 w-4" />
            </div>
            <div className="flex items-center gap-1 font-semibold text-slate-800">
              Central Frontdesk
              <ChevronDown className="h-4 w-4 text-slate-400" />
            </div>
          </div>
        )}
      </div>

      <nav className="flex-1 space-y-0.5 overflow-y-auto px-3 py-2">
        <SectionLabel label="Your CRM" collapsed={collapsed} />
        <NavItem icon={Table2} label="CRM" hasChevron open collapsed={collapsed} />
        <div className={`space-y-0.5 ${collapsed ? "" : "pl-3"}`}>
          <NavItem
            icon={Users}
            label="Contacts"
            to="/"
            active={pathname === "/" || pathname.startsWith("/contacts")}
            collapsed={collapsed}
          />
          <NavItem icon={Calendar} label="Events" collapsed={collapsed} />
          <NavItem
            icon={Phone}
            label="Calls"
            to="/calls"
            active={pathname.startsWith("/calls")}
            collapsed={collapsed}
          />
          <NavItem
            icon={ListChecks}
            label="Segments"
            to="/segments"
            active={pathname.startsWith("/segments")}
            collapsed={collapsed}
          />
          <NavItem
            icon={Send}
            label="Sequences"
            to="/sequences"
            active={pathname.startsWith("/sequences")}
            collapsed={collapsed}
          />
        </div>

        <SectionLabel label="Your Frontdesk" collapsed={collapsed} />
        <NavItem
          icon={PhoneCall}
          label="Reception"
          hasChevron
          open={receptionOpen}
          collapsed={collapsed}
          onClick={() => setReceptionOpen((o) => !o)}
        />
        {(receptionOpen || collapsed) && (
          <div className={`space-y-0.5 ${collapsed ? "" : "pl-3"}`}>
            <NavItem
              icon={Phone}
              label="Calls"
              to="/calls"
              active={false}
              collapsed={collapsed}
            />
            <NavItem
              icon={Settings2}
              label="Setup"
              to="/reception/setup"
              active={pathname.startsWith("/reception/setup")}
              collapsed={collapsed}
            />
            <NavItem
              icon={MessageSquare}
              label="Follow-up Text"
              to="/reception/setup"
              active={false}
              collapsed={collapsed}
            />
          </div>
        )}
      </nav>

      <div className={`px-4 py-3 ${collapsed ? "flex justify-center px-0" : ""}`}>
        <button className="flex h-9 w-9 items-center justify-center rounded-full bg-sky-500 text-white shadow-sm hover:bg-sky-600">
          <HelpCircle className="h-5 w-5" />
        </button>
      </div>

      <div className="border-t border-slate-200 p-3">
        <button
          className={`flex w-full items-center gap-2 rounded-lg border border-slate-200 px-3 py-2 text-sm hover:bg-slate-50 ${
            collapsed ? "justify-center px-0" : ""
          }`}
          title={collapsed ? "Wing PROD" : undefined}
        >
          <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded bg-violet-600 text-[11px] font-bold text-white">
            W
          </div>
          {!collapsed && (
            <>
              <span className="flex-1 text-left font-medium text-slate-700">
                Wing PROD
              </span>
              <ChevronDown className="h-4 w-4 text-slate-400" />
            </>
          )}
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
