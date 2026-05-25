import { useState, useEffect } from "react";
import { Sparkles, PanelRightClose, Check } from "lucide-react";
import { tools, type EnrichmentTool } from "@/data/tools";

type EnrichedField = { label: string; value: string };

const MOCK_ENRICHMENTS: Record<string, EnrichedField[]> = {
  "enrich-company": [
    { label: "Company", value: "NameBureau Inc." },
    { label: "Size", value: "50–200 employees" },
    { label: "Industry", value: "IT / Technology" },
  ],
};

function ProviderBadge({
  providers,
}: {
  providers: NonNullable<EnrichmentTool["providers"]>;
}) {
  return (
    <span className="inline-flex items-center gap-1 whitespace-nowrap rounded-full border border-slate-200 px-1.5 py-0.5 text-xs text-slate-600">
      <span
        className={`flex h-4 min-w-4 items-center justify-center rounded px-0.5 text-[9px] font-bold leading-none ${providers.badgeClass}`}
      >
        {providers.initial}
      </span>
      +{providers.more}
    </span>
  );
}

function ToolRow({
  tool,
  queued,
  selected,
  enrichedFields,
  onRun,
  onToggle,
}: {
  tool: EnrichmentTool;
  queued: boolean;
  selected: boolean;
  enrichedFields?: EnrichedField[];
  onRun: () => void;
  onToggle: () => void;
}) {
  const Icon = tool.icon;
  return (
    <div className="group w-full transition-colors hover:bg-slate-50">
      <div className="flex items-center gap-3 px-4 py-3">
        <input
          type="checkbox"
          checked={selected}
          onChange={onToggle}
          onClick={(e) => e.stopPropagation()}
          className="h-4 w-4 shrink-0 cursor-pointer rounded border-slate-300 accent-sky-600"
        />
        <Icon className={`h-5 w-5 shrink-0 ${tool.iconClass}`} />
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-medium text-slate-800">
            {tool.name}
          </p>
          <p className="truncate text-xs text-slate-400">{tool.description}</p>
        </div>
        <div className="flex shrink-0 items-center gap-2.5">
          {queued ? (
            <span className="inline-flex items-center gap-1 whitespace-nowrap text-xs font-medium text-emerald-600">
              <Check className="h-3.5 w-3.5" />
              Queued
            </span>
          ) : (
            <button
              onClick={onRun}
              className="text-xs font-semibold text-sky-600 hover:underline"
            >
              Enrich
            </button>
          )}
        </div>
      </div>

      {/* Enriched data result */}
      {enrichedFields && (
        <div className="mx-4 mb-3 rounded-lg border border-slate-100 bg-slate-50 px-3 py-2.5">
          <div className="flex flex-wrap gap-x-6 gap-y-1.5">
            {enrichedFields.map((f) => (
              <div key={f.label} className="flex items-center gap-1.5">
                <span className="text-[11px] font-medium text-slate-400 uppercase tracking-wide">
                  {f.label}
                </span>
                <span className="text-xs font-semibold text-slate-700">
                  {f.value}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export function ToolsPanel({
  open,
  contact,
  onClose,
}: {
  open: boolean;
  contact: { name: string; email?: string } | null;
  onClose: () => void;
}) {
  const [queued, setQueued] = useState<string[]>([]);
  const [selected, setSelected] = useState<string[]>([]);
  const [enriched, setEnriched] = useState<string[]>([]);

  const toggleSelected = (id: string) =>
    setSelected((s) => (s.includes(id) ? s.filter((x) => x !== id) : [...s, id]));

  const enqueue = (id: string) => {
    setQueued((q) => (q.includes(id) ? q : [...q, id]));
  };

  // Simulate enrichment completing after 1.5s for tools that have mock data
  useEffect(() => {
    const pending = queued.filter(
      (id) => !enriched.includes(id) && MOCK_ENRICHMENTS[id]
    );
    if (pending.length === 0) return;
    const timer = setTimeout(() => {
      setEnriched((e) => [...e, ...pending.filter((id) => !e.includes(id))]);
    }, 1500);
    return () => clearTimeout(timer);
  }, [queued, enriched]);

  const sources = tools.filter((t) => t.category === "Sources");

  if (!open || !contact) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/20" onClick={onClose} />

      {/* Drawer */}
      <aside className="relative flex h-full w-full max-w-[440px] flex-col bg-white shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4">
          <h2 className="text-lg font-semibold text-slate-900">Tools</h2>
          <button
            onClick={onClose}
            className="rounded-md border border-slate-200 p-1.5 text-slate-500 hover:bg-slate-100"
            aria-label="Close"
          >
            <PanelRightClose className="h-4 w-4" />
          </button>
        </div>

        {/* Contact context */}
        <div className="border-y border-slate-100 bg-slate-50/60 px-5 py-2.5">
          <p className="text-sm font-medium text-slate-800">{contact.name}</p>
          {contact.email && (
            <p className="truncate text-xs text-slate-400">{contact.email}</p>
          )}
        </div>

        {/* Enrich All + Apply Enrichment */}
        <div className="flex items-center justify-between px-5 pt-4">
          <button
            onClick={() => sources.forEach((t) => enqueue(t.id))}
            className="inline-flex items-center gap-1.5 rounded-md border border-sky-200 bg-sky-50 px-2.5 py-1.5 text-xs font-semibold text-sky-600 hover:bg-sky-100"
          >
            <Sparkles className="h-3.5 w-3.5" />
            Enrich All
          </button>
          <button className="inline-flex items-center gap-1.5 rounded-md border border-emerald-600 bg-sky-50 px-2.5 py-1.5 text-xs font-semibold text-emerald-700 hover:bg-sky-100">
            Apply Enrichment
          </button>
        </div>

        {/* List */}
        <div className="mt-2 flex-1 divide-y divide-slate-100 overflow-y-auto">
          {sources.map((tool) => (
            <ToolRow
              key={tool.id}
              tool={tool}
              queued={queued.includes(tool.id)}
              selected={selected.includes(tool.id)}
              enrichedFields={
                enriched.includes(tool.id)
                  ? MOCK_ENRICHMENTS[tool.id]
                  : undefined
              }
              onRun={() => enqueue(tool.id)}
              onToggle={() => toggleSelected(tool.id)}
            />
          ))}
        </div>
      </aside>
    </div>
  );
}
