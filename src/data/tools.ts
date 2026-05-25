import type { LucideIcon } from "lucide-react";
import {
  Sparkles,
  Building2,
  AtSign,
  MapPin,
  Linkedin,
  Banknote,
  Globe,
} from "lucide-react";

export type ToolCategory = "Sources" | "Enrichments" | "Signals" | "Exports";

export type ToolCost = {
  /** Credits per unit. Null means cost depends on the model used. */
  amount: number | null;
  unit: "row" | "model";
  /** Whether the amount is approximate (shows a ~ prefix). */
  approx?: boolean;
};

export type ToolProviders = {
  /** Initial shown in the lead provider badge (e.g. "S"). */
  initial: string;
  /** Tailwind classes for the lead badge. */
  badgeClass: string;
  /** How many additional providers are in the waterfall. */
  more: number;
};

export type EnrichmentTool = {
  id: string;
  name: string;
  description: string;
  icon: LucideIcon;
  iconClass: string;
  category: ToolCategory;
  cost: ToolCost;
  providers?: ToolProviders;
};

export const toolCategories: { label: ToolCategory; icon: LucideIcon }[] = [
  { label: "Sources", icon: AtSign },
  { label: "Enrichments", icon: Sparkles },
  { label: "Signals", icon: MapPin },
  { label: "Exports", icon: Building2 },
];

/**
 * Curated catalog — the high-value sources for an SMB CRM, not Clay's full
 * power-user list. Only the "Sources" tab is populated; other tabs are stubs.
 */
export const tools: EnrichmentTool[] = [
  {
    id: "enrich-company",
    name: "Enrich Company",
    description: "Companies, People, Jobs",
    icon: Building2,
    iconClass: "text-slate-600",
    category: "Sources",
    cost: { amount: 0.5, unit: "row" },
  },
  {
    id: "work-email",
    name: "Work Email",
    description: "Find a person's work email.",
    icon: AtSign,
    iconClass: "text-slate-600",
    category: "Sources",
    cost: { amount: 3, unit: "row", approx: true },
  },
  {
    id: "find-location",
    name: "Find Location",
    description: "Find a person's city, region and country.",
    icon: MapPin,
    iconClass: "text-rose-500",
    category: "Sources",
    cost: { amount: 1, unit: "row", approx: true },
    providers: { initial: "A", badgeClass: "bg-indigo-500 text-white", more: 2 },
  },
  {
    id: "linkedin-profile",
    name: "LinkedIn Profile",
    description: "Find a person's LinkedIn profile URL.",
    icon: Linkedin,
    iconClass: "text-sky-600",
    category: "Sources",
    cost: { amount: 2, unit: "row", approx: true },
    providers: { initial: "in", badgeClass: "bg-[#0A66C2] text-white", more: 2 },
  },
  {
    id: "company-funding",
    name: "Company Latest Funding",
    description: "Need to know a company's latest funding details?",
    icon: Banknote,
    iconClass: "text-emerald-600",
    category: "Sources",
    cost: { amount: 5.8, unit: "row", approx: true },
    providers: { initial: "C", badgeClass: "bg-amber-500 text-white", more: 4 },
  },
  {
    id: "website-traffic",
    name: "Website Traffic (Monthly)",
    description: "Get the monthly website traffic for a domain.",
    icon: Globe,
    iconClass: "text-cyan-600",
    category: "Sources",
    cost: { amount: 2.5, unit: "row", approx: true },
  },
];
