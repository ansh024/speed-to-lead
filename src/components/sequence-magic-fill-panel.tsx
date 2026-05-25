import { useState, useEffect } from "react";
import { Sparkles, PanelRightClose, Users, CheckCircle2, ArrowRight, AlertTriangle } from "lucide-react";
import { tools, type EnrichmentTool } from "@/data/tools";

type BulkResult = { enriched: number; noun: string };

const MOCK_BULK_RESULTS: Record<string, BulkResult> = {
  "enrich-company":   { enriched: 94, noun: "Companies" },
  "work-email":       { enriched: 87, noun: "Work Emails" },
  "find-location":    { enriched: 91, noun: "Locations" },
  "linkedin-profile": { enriched: 78, noun: "LinkedIn Profiles" },
  "company-funding":  { enriched: 63, noun: "Funding Records" },
  "website-traffic":  { enriched: 82, noun: "Traffic Records" },
};

function BulkToolRow({
  tool,
  queued,
  selected,
  result,
  total,
  onRun,
  onToggle,
}: {
  tool: EnrichmentTool;
  queued: boolean;
  selected: boolean;
  result?: BulkResult;
  total: number;
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
          <p className="truncate text-sm font-medium text-slate-800">{tool.name}</p>
          <p className="truncate text-xs text-slate-400">{tool.description}</p>
        </div>
        <div className="flex shrink-0 items-center gap-2.5">
          {queued ? (
            result ? (
              <span className="inline-flex items-center gap-1 whitespace-nowrap rounded-full bg-emerald-50 px-2 py-0.5 text-xs font-semibold text-emerald-700 ring-1 ring-emerald-200">
                {result.enriched} / {total} enriched
              </span>
            ) : (
              <span className="inline-flex items-center gap-1 whitespace-nowrap text-xs text-slate-400">
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-sky-400" />
                Running…
              </span>
            )
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

      {result && (
        <div className="mx-4 mb-3 flex items-center gap-2 rounded-lg border border-slate-100 bg-slate-50 px-3 py-2">
          <span className="text-xs text-slate-500">
            <span className="font-semibold text-slate-700">{result.enriched}</span>
            {" / "}
            {total} {result.noun} enriched
          </span>
          <span className="ml-auto text-xs text-slate-400">
            {total - result.enriched} not found
          </span>
        </div>
      )}
    </div>
  );
}

export function SequenceMagicFillPanel({
  open,
  sequenceName,
  recipientCount,
  onClose,
}: {
  open: boolean;
  sequenceName: string;
  recipientCount: number;
  onClose: () => void;
}) {
  const [queued, setQueued] = useState<string[]>([]);
  const [selected, setSelected] = useState<string[]>([]);
  const [done, setDone] = useState<string[]>([]);
  const [applied, setApplied] = useState(false);

  const toggleSelected = (id: string) =>
    setSelected((s) => (s.includes(id) ? s.filter((x) => x !== id) : [...s, id]));

  const enqueue = (id: string) =>
    setQueued((q) => (q.includes(id) ? q : [...q, id]));

  useEffect(() => {
    const pending = queued.filter((id) => !done.includes(id));
    if (pending.length === 0) return;
    const timer = setTimeout(() => {
      setDone((d) => [...d, ...pending.filter((id) => !d.includes(id))]);
    }, 1500);
    return () => clearTimeout(timer);
  }, [queued, done]);

  const sources = tools.filter((t) => t.category === "Sources");

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      <div className="absolute inset-0 bg-black/20" onClick={onClose} />

      <aside className="relative flex h-full w-full max-w-[440px] flex-col bg-white shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4">
          <h2 className="text-lg font-semibold text-slate-900">Magic Fill</h2>
          <button
            onClick={onClose}
            className="rounded-md border border-slate-200 p-1.5 text-slate-500 hover:bg-slate-100"
            aria-label="Close"
          >
            <PanelRightClose className="h-4 w-4" />
          </button>
        </div>

        {/* Bulk context */}
        <div className="border-y border-slate-100 bg-slate-50/60 px-5 py-2.5">
          <div className="flex items-center gap-2">
            <Users className="h-3.5 w-3.5 shrink-0 text-slate-400" />
            <p className="text-sm font-medium text-slate-800">
              {recipientCount} Recipients Found in This Sequence
            </p>
          </div>
          <p className="mt-0.5 text-xs text-slate-400">{sequenceName}</p>
        </div>

        {/* Actions */}
        <div className="flex items-center justify-between px-5 pt-4">
          <button
            onClick={() => sources.forEach((t) => enqueue(t.id))}
            className="inline-flex items-center gap-1.5 rounded-md border border-sky-200 bg-sky-50 px-2.5 py-1.5 text-xs font-semibold text-sky-600 hover:bg-sky-100"
          >
            <Sparkles className="h-3.5 w-3.5" />
            Enrich All
          </button>
          <button
            onClick={() => setApplied(true)}
            className="inline-flex items-center gap-1.5 rounded-md border border-emerald-600 bg-sky-50 px-2.5 py-1.5 text-xs font-semibold text-emerald-700 hover:bg-emerald-50"
          >
            Apply Enrichment
          </button>
        </div>

        {/* Tool list */}
        <div className="mt-2 flex-1 divide-y divide-slate-100 overflow-y-auto">
          {sources.map((tool) => (
            <BulkToolRow
              key={tool.id}
              tool={tool}
              queued={queued.includes(tool.id)}
              selected={selected.includes(tool.id)}
              result={done.includes(tool.id) ? MOCK_BULK_RESULTS[tool.id] : undefined}
              total={recipientCount}
              onRun={() => enqueue(tool.id)}
              onToggle={() => toggleSelected(tool.id)}
            />
          ))}
        </div>

        {/* Applied overlay */}
        {applied && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-white/95 px-8 text-center backdrop-blur-sm">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-emerald-50 ring-4 ring-emerald-100">
              <CheckCircle2 className="h-7 w-7 text-emerald-600" />
            </div>

            <h3 className="mt-5 text-lg font-semibold text-slate-900">
              Enrichments Applied
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-slate-500">
              Contact fields have been updated for{" "}
              <span className="font-medium text-slate-700">{recipientCount} recipients</span>.
            </p>

            <div className="mt-4 flex items-start gap-2 rounded-lg border border-amber-200 bg-amber-50 px-4 py-3 text-left">
              <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-amber-500" />
              <p className="text-xs leading-relaxed text-amber-800">
                These values are fetched from the web and may not be 100% accurate. Review each recipient's data before your sequence fires.
              </p>
            </div>

            <button
              onClick={onClose}
              className="mt-6 inline-flex items-center gap-2 rounded-lg bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white hover:bg-slate-700"
            >
              View Recipients
              <ArrowRight className="h-4 w-4" />
            </button>

            <button
              onClick={() => setApplied(false)}
              className="mt-3 text-xs text-slate-400 hover:text-slate-600 hover:underline"
            >
              Back to enrichments
            </button>
          </div>
        )}
      </aside>
    </div>
  );
}
