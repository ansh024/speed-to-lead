import { createFileRoute } from "@tanstack/react-router";
import { useState, useRef } from "react";
import {
  MessageSquare,
  RotateCcw,
  Send,
  ChevronDown,
  MessageSquareMore,
  Bell,
  Copy,
} from "lucide-react";
import { AppSidebar } from "@/components/app-sidebar";

export const Route = createFileRoute("/reception/setup")({
  component: ReceptionSetupPage,
  head: () => ({
    meta: [{ title: "Reception Setup — Central Frontdesk" }],
  }),
});

const SETUP_TABS = [
  { id: "prompt",      label: "Prompt / Call Flow" },
  { id: "personalize", label: "Personalize Receptionist" },
  { id: "scheduling",  label: "Scheduling" },
  { id: "qualify",     label: "Qualify Leads" },
  { id: "transfer",    label: "Transfer Calls" },
  { id: "followup",    label: "Follow-up Text" },
  { id: "widget",      label: "Widget" },
];

const BIZ = {
  name: "Bright Smile Dental",
  bookingLink: "brightsmile.com/book",
  website: "brightsmile.com",
  location: "2455 Mission St, SF",
};

const DEFAULT_MSG =
  "Hi, thanks for calling {business_name} — sorry we missed you! Book here: {booking_link} or visit {website}. Reply to this text and we'll help you out.";

const TAGS = [
  { id: "business_name", label: "Business name",  value: BIZ.name },
  { id: "booking_link",  label: "Booking link",   value: BIZ.bookingLink },
  { id: "website",       label: "Website",        value: BIZ.website },
  { id: "location",      label: "Location",       value: BIZ.location },
];

function Toggle({
  on,
  onChange,
  large = false,
}: {
  on: boolean;
  onChange: (v: boolean) => void;
  large?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={() => onChange(!on)}
      aria-pressed={on}
      className={`relative flex-none rounded-full transition-colors duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 ${
        large ? "h-6 w-11" : "h-5 w-9"
      } ${on ? "bg-sky-500" : "bg-slate-200"}`}
    >
      <span
        className={`absolute top-0.5 block rounded-full bg-white shadow transition-transform duration-150 ${
          large ? "h-5 w-5" : "h-4 w-4"
        } ${on ? (large ? "translate-x-5" : "translate-x-4") : "translate-x-0.5"}`}
      />
    </button>
  );
}

function Card({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`rounded-xl border border-slate-200 bg-white p-5 shadow-sm ${className}`}>
      {children}
    </div>
  );
}

function Divider() {
  return <div className="my-4 border-t border-slate-100" />;
}

function Toast({ msg, bad, onDone }: { msg: string; bad?: boolean; onDone: () => void }) {
  return (
    <div
      className="fixed bottom-6 left-1/2 z-50 flex -translate-x-1/2 items-center gap-3 rounded-xl bg-slate-900 px-4 py-3 text-sm font-medium text-white shadow-xl"
    >
      <span
        className={`flex h-5 w-5 items-center justify-center rounded-full text-white text-[10px] font-bold ${
          bad ? "bg-rose-500" : "bg-emerald-500"
        }`}
      >
        {bad ? "!" : "✓"}
      </span>
      {msg}
      <button onClick={onDone} className="ml-2 text-slate-400 hover:text-white">✕</button>
    </div>
  );
}

function FollowUpTextPanel({ onToast }: { onToast: (t: { msg: string; bad?: boolean }) => void }) {
  const [enabled,      setEnabled]      = useState(true);
  const [trigHangup,   setTrigHangup]   = useState(true);
  const [hangupSecs,   setHangupSecs]   = useState(10);
  const [trigNoHuman,  setTrigNoHuman]  = useState(true);
  const [msg,          setMsg]          = useState(DEFAULT_MSG);
  const [timing,       setTiming]       = useState<"immediate" | "delay">("immediate");
  const [delaySecs,    setDelaySecs]    = useState(30);
  const [quietOn,      setQuietOn]      = useState(true);
  const [quietStart,   setQuietStart]   = useState("21:00");
  const [quietEnd,     setQuietEnd]     = useState("08:00");
  const [appendStop,   setAppendStop]   = useState(true);
  const [testNum,      setTestNum]      = useState("");

  const taRef = useRef<HTMLTextAreaElement>(null);

  const kb: Record<string, string> = {
    business_name: BIZ.name,
    booking_link:  BIZ.bookingLink,
    website:       BIZ.website,
    location:      BIZ.location,
  };

  function insertTag(id: string) {
    const token = `{${id}}`;
    const ta = taRef.current;
    if (ta) {
      const s = ta.selectionStart ?? msg.length;
      const e = ta.selectionEnd ?? msg.length;
      const next = msg.slice(0, s) + token + msg.slice(e);
      setMsg(next);
      requestAnimationFrame(() => {
        ta.focus();
        const p = s + token.length;
        ta.setSelectionRange(p, p);
      });
    } else {
      setMsg(msg + " " + token);
    }
  }

  const resolve = (t: string) =>
    t.replace(/\{(\w+)\}/g, (m, k) => (kb[k] ? kb[k] : m));

  const preview  = resolve(msg);
  const fullText = preview + (appendStop ? "\n\nReply STOP to opt out." : "");
  const smsCount = Math.max(1, Math.ceil(fullText.length / 160));

  function sendTest() {
    if (!testNum.trim()) {
      onToast({ msg: "Enter a phone number first", bad: true });
      return;
    }
    onToast({ msg: `Test text sent to ${testNum.trim()}` });
  }

  return (
    <div className="max-w-[860px] space-y-4">
      {/* Master toggle */}
      <Card>
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-2.5">
            <MessageSquare className="h-4 w-4 text-slate-400" />
            <span className="text-sm font-semibold text-slate-900">Instant text-back</span>
            <span className="rounded-full bg-slate-100 px-2 py-0.5 text-[11px] font-semibold text-slate-500">
              SMS
            </span>
          </div>
          <Toggle large on={enabled} onChange={setEnabled} />
        </div>
      </Card>

      <div
        className={`space-y-4 transition-opacity duration-150 ${
          enabled ? "opacity-100" : "pointer-events-none opacity-40"
        }`}
      >
        {/* Triggers */}
        <h2 className="text-sm font-semibold text-slate-700">When should we text back?</h2>

        <Card>
          {/* Trigger 1 */}
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-sm font-semibold text-slate-800">Caller hangs up early</p>
              {trigHangup && (
                <div className="mt-2 flex items-center gap-2 text-sm text-slate-500">
                  within
                  <input
                    type="number"
                    min={1}
                    max={120}
                    value={hangupSecs}
                    onChange={(e) => setHangupSecs(Number(e.target.value))}
                    className="h-8 w-16 rounded-lg border border-slate-200 bg-white px-2 text-center text-sm focus:border-sky-400 focus:outline-none focus:ring-2 focus:ring-sky-100"
                  />
                  seconds
                </div>
              )}
            </div>
            <Toggle on={trigHangup} onChange={setTrigHangup} />
          </div>


          <Divider />

          {/* Trigger 3 */}
          <div className="flex items-center justify-between gap-4">
            <p className="text-sm font-semibold text-slate-800">Asked for a human, none available</p>
            <Toggle on={trigNoHuman} onChange={setTrigNoHuman} />
          </div>
        </Card>

        {/* Message */}
        <Card>
          <div className="mb-2 flex items-center justify-between">
            <label className="text-sm font-semibold text-slate-800">Message</label>
            <button
              onClick={() => setMsg(DEFAULT_MSG)}
              className="flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-medium text-slate-600 hover:bg-slate-50"
            >
              <RotateCcw className="h-3.5 w-3.5" />
              Reset to default
            </button>
          </div>

          <textarea
            ref={taRef}
            value={msg}
            onChange={(e) => setMsg(e.target.value)}
            rows={4}
            className="w-full resize-y rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm leading-relaxed text-slate-700 placeholder:text-slate-400 focus:border-sky-400 focus:outline-none focus:ring-2 focus:ring-sky-100"
          />

          <div className="mt-2 flex items-center justify-between text-xs text-slate-400">
            <span>Detected from Knowledge Base — click to insert:</span>
            <span className="tabular-nums">
              {fullText.length} chars · ~{smsCount} SMS
            </span>
          </div>

          <div className="mt-3 flex flex-wrap gap-2">
            {TAGS.map((t) => {
              const has = !!t.value;
              return (
                <button
                  key={t.id}
                  type="button"
                  disabled={!has}
                  onClick={() => insertTag(t.id)}
                  title={has ? t.value : "Not found in Knowledge Base"}
                  className={`flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-semibold transition-colors ${
                    has
                      ? "border-dashed border-slate-300 bg-slate-50 text-slate-600 hover:border-sky-300 hover:bg-sky-50 hover:text-sky-700"
                      : "cursor-not-allowed border-dashed border-slate-200 bg-slate-50 text-slate-300 line-through"
                  }`}
                >
                  <span
                    className={`h-1.5 w-1.5 rounded-full ${has ? "bg-emerald-500" : "bg-slate-300"}`}
                  />
                  {t.label}
                </button>
              );
            })}
          </div>

          {/* Live preview */}
          <div className="mt-4 rounded-lg border border-slate-100 bg-slate-50 px-3 py-2.5">
            <p className="mb-1 text-[11px] font-semibold uppercase tracking-wide text-slate-400">
              Preview
            </p>
            <p className="whitespace-pre-wrap text-sm leading-relaxed text-slate-600">
              {fullText}
            </p>
          </div>
        </Card>

        {/* Send timing */}
        <Card>
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-sm font-semibold text-slate-800">Send timing</p>
              <p className="mt-0.5 text-xs text-slate-500">
                Faster is better — first to respond usually wins the lead.
              </p>
            </div>
            <div className="flex items-center overflow-hidden rounded-lg border border-slate-200 bg-slate-50 p-0.5">
              {(["immediate", "delay"] as const).map((opt) => (
                <button
                  key={opt}
                  onClick={() => setTiming(opt)}
                  className={`rounded-md px-3 py-1.5 text-xs font-medium transition-colors ${
                    timing === opt
                      ? "bg-white text-slate-800 shadow-sm"
                      : "text-slate-500 hover:text-slate-700"
                  }`}
                >
                  {opt === "immediate" ? "Immediately" : "Short delay"}
                </button>
              ))}
            </div>
          </div>
          {timing === "delay" && (
            <div className="mt-3 flex items-center gap-2 text-sm text-slate-500">
              Wait
              <input
                type="number"
                min={1}
                max={600}
                value={delaySecs}
                onChange={(e) => setDelaySecs(Number(e.target.value))}
                className="h-8 w-16 rounded-lg border border-slate-200 px-2 text-center text-sm focus:border-sky-400 focus:outline-none focus:ring-2 focus:ring-sky-100"
              />
              seconds before sending
            </div>
          )}
        </Card>

        {/* Quiet hours + opt-out */}
        <Card>
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-sm font-semibold text-slate-800">Quiet hours</p>
              <p className="mt-0.5 text-xs text-slate-500">
                Don't text overnight; queued texts go out when quiet hours end.
              </p>
              {quietOn && (
                <div className="mt-3 flex flex-wrap items-center gap-2 text-sm text-slate-500">
                  <span>From</span>
                  <input
                    type="time"
                    value={quietStart}
                    onChange={(e) => setQuietStart(e.target.value)}
                    className="h-8 rounded-lg border border-slate-200 px-2 text-sm focus:border-sky-400 focus:outline-none focus:ring-2 focus:ring-sky-100"
                  />
                  <span>to</span>
                  <input
                    type="time"
                    value={quietEnd}
                    onChange={(e) => setQuietEnd(e.target.value)}
                    className="h-8 rounded-lg border border-slate-200 px-2 text-sm focus:border-sky-400 focus:outline-none focus:ring-2 focus:ring-sky-100"
                  />
                </div>
              )}
            </div>
            <Toggle on={quietOn} onChange={setQuietOn} />
          </div>

          <Divider />

          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-sm font-semibold text-slate-800">Append opt-out line</p>
              <p className="mt-0.5 text-xs text-slate-500">
                Adds "Reply STOP to opt out." STOP requests are always honored automatically.
              </p>
            </div>
            <Toggle on={appendStop} onChange={setAppendStop} />
          </div>
        </Card>

        {/* Test send */}
        <Card>
          <p className="mb-3 text-sm font-semibold text-slate-800">Send a test</p>
          <div className="flex gap-2">
            <input
              type="tel"
              placeholder="+1 (555) 000-0000"
              value={testNum}
              onChange={(e) => setTestNum(e.target.value)}
              className="h-9 flex-1 rounded-lg border border-slate-200 px-3 text-sm text-slate-700 placeholder:text-slate-400 focus:border-sky-400 focus:outline-none focus:ring-2 focus:ring-sky-100"
            />
            <button
              onClick={sendTest}
              className="flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
            >
              <Send className="h-3.5 w-3.5" />
              Send test
            </button>
          </div>
          <p className="mt-2 text-xs text-slate-400">
            Sends the current message (with merge tags resolved) to the number above.
          </p>
        </Card>

        {/* Save bar */}
        <div className="flex items-center justify-end gap-3 pt-2">
          <button className="rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-50">
            Discard changes
          </button>
          <button
            onClick={() => onToast({ msg: "Follow-up text settings saved" })}
            className="rounded-lg bg-sky-500 px-4 py-2 text-sm font-semibold text-white hover:bg-sky-600"
          >
            Save changes
          </button>
        </div>
      </div>
    </div>
  );
}

function ReceptionSetupPage() {
  const [toast, setToast] = useState<{ msg: string; bad?: boolean } | null>(null);

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

        <div className="flex-1 overflow-auto">
          <div className="px-8 pt-6 pb-0 border-b border-slate-200 bg-white">
            {/* Page head */}
            <div className="flex items-start justify-between mb-5">
              <div>
                <h1 className="text-2xl font-bold tracking-tight text-slate-900">Setup</h1>
                <p className="mt-1 text-sm text-slate-500">
                  Control how your AI answers calls, books appointments, and captures new leads.
                </p>
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

            {/* Sub-tabs */}
            <div className="flex gap-0 overflow-x-auto">
              {SETUP_TABS.map((t) => (
                <button
                  key={t.id}
                  disabled={t.id !== "followup"}
                  className={`relative flex-none px-4 pb-3 text-sm font-medium transition-colors ${
                    t.id === "followup"
                      ? "text-sky-500 after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:rounded-t after:bg-sky-500"
                      : "cursor-default text-slate-400"
                  }`}
                >
                  {t.label}
                </button>
              ))}
            </div>
          </div>

          <div className="p-8">
            <FollowUpTextPanel onToast={setToast} />
          </div>
        </div>
      </main>

      {toast && (
        <Toast msg={toast.msg} bad={toast.bad} onDone={() => setToast(null)} />
      )}
    </div>
  );
}
