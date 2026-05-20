export type Sentiment = "Positive" | "Neutral" | "Negative";

export type TranscriptLine = {
  speaker: "AI" | "Caller";
  name: string;
  time: string;
  text: string;
};

export type CallRecord = {
  id: string;
  callerName: string;
  phone: string;
  duration: string;
  sentiment: Sentiment;
  time: string;
  date: string;
  dateISO: string;
  tag?: string;
  hotLead?: boolean;
  tags: string[];
  callsDetected?: number;
  resolved?: boolean;
  summary: string;
  actions: string[];
  transcript: TranscriptLine[];
};

export const callRecords: CallRecord[] = [
  {
    id: "1",
    callerName: "Anshul",
    phone: "+91 97114 38837",
    duration: "3m 11s",
    sentiment: "Positive",
    time: "12:16 AM",
    date: "Thursday, May 14",
    dateISO: "May 14, 2026, 12:16 AM",
    tag: "Sales inquiry",
    hotLead: true,
    tags: ["Scheduling", "Sales inquiry"],
    callsDetected: 20,
    resolved: true,
    summary:
      "The caller, Anshul, inquired about martial arts classes for his 12-year-old brother. The assistant described class options and teaching styles, then proceeded to book a trial session, offering schedule options for Brazilian Jiu Jitsu/MMA and Kung Fu classes.",
    actions: [
      "Inquiry about martial arts classes",
      "Information provided about class types and teaching style",
      "Trial session booking initiated",
    ],
    transcript: [
      { speaker: "AI", name: "AI Assistant", time: "00:16:21", text: "Hi, I'm Sarah from Anshul's Wordspace, how can I help you?" },
      { speaker: "Caller", name: "Anshul", time: "00:16:38", text: "Yeah. Actually, I wanted to know about your classes, martial arts classes." },
      { speaker: "AI", name: "AI Assistant", time: "00:16:40", text: "By the way, what's your name?" },
      { speaker: "Caller", name: "Anshul", time: "00:16:47", text: "हां जी." },
      { speaker: "AI", name: "AI Assistant", time: "00:16:48", text: "Could you please tell me your name?" },
      { speaker: "Caller", name: "Anshul", time: "00:16:53", text: "Anshul." },
      { speaker: "AI", name: "AI Assistant", time: "00:16:55", text: "Awesome, Anshul. Are you looking for classes for a specific age group or student? What age group are you thinking about?" },
      { speaker: "Caller", name: "Anshul", time: "00:17:08", text: "My brother. He's 12 years old." },
      { speaker: "AI", name: "AI Assistant", time: "00:17:12", text: "Great! For a 12-year-old, we offer Brazilian Jiu Jitsu, MMA, and Kung Fu. Would you like me to book a free trial session?" },
      { speaker: "Caller", name: "Anshul", time: "00:17:30", text: "Yes, that sounds good. When are the slots available?" },
      { speaker: "AI", name: "AI Assistant", time: "00:17:33", text: "We have slots on Saturday at 10 AM and Sunday at 11 AM. Which works better for you?" },
      { speaker: "Caller", name: "Anshul", time: "00:17:50", text: "Saturday at 10 works." },
      { speaker: "AI", name: "AI Assistant", time: "00:17:53", text: "Perfect! I've booked a trial session for Saturday at 10 AM. You'll receive a confirmation shortly. Is there anything else I can help you with?" },
      { speaker: "Caller", name: "Anshul", time: "00:18:10", text: "No, that's all. Thank you." },
      { speaker: "AI", name: "AI Assistant", time: "00:18:12", text: "You're welcome, Anshul! We look forward to seeing your brother. Have a great day!" },
    ],
  },
  {
    id: "2",
    callerName: "Anonymous Gecko",
    phone: "+91 97114 38837",
    duration: "32s",
    sentiment: "Neutral",
    time: "12:14 AM",
    date: "Thursday, May 14",
    dateISO: "May 14, 2026, 12:14 AM",
    tag: "Issue",
    tags: ["Issue"],
    resolved: false,
    summary: "The caller reported an issue with their Try Time account and was transferred to the VIP Line for further assistance.",
    actions: ["Issue reported with Try Time account", "Call transferred to VIP Line"],
    transcript: [
      { speaker: "AI", name: "AI Assistant", time: "00:12:14", text: "Hi, how can I help you today?" },
      { speaker: "Caller", name: "Caller", time: "00:12:18", text: "I'm having trouble accessing my Try Time account." },
      { speaker: "AI", name: "AI Assistant", time: "00:12:22", text: "I'm sorry to hear that. Let me transfer you to our VIP support line right away." },
    ],
  },
  {
    id: "3",
    callerName: "Anonymous",
    phone: "+91 97114 38837",
    duration: "22s",
    sentiment: "Neutral",
    time: "8:19 PM",
    date: "Wednesday, May 13",
    dateISO: "May 13, 2026, 8:19 PM",
    tag: "Issue",
    tags: ["Issue"],
    resolved: false,
    summary: "The caller reported an issue with the product and was transferred to the VIP Line for assistance.",
    actions: ["Issue reported", "Call transferred to VIP Line"],
    transcript: [
      { speaker: "AI", name: "AI Assistant", time: "00:08:19", text: "Hello! How can I assist you today?" },
      { speaker: "Caller", name: "Caller", time: "00:08:23", text: "I have a problem with the product." },
      { speaker: "AI", name: "AI Assistant", time: "00:08:27", text: "I'll connect you with our support team now." },
    ],
  },
  {
    id: "4",
    callerName: "Anonymous",
    phone: "+91 97114 38837",
    duration: "55s",
    sentiment: "Neutral",
    time: "8:15 PM",
    date: "Wednesday, May 13",
    dateISO: "May 13, 2026, 8:15 PM",
    tag: "Issue",
    tags: ["Issue"],
    resolved: false,
    summary: "The caller reported an issue with the product 'Five Central' and confirmed that they had already tried restarting the device before calling.",
    actions: ["Issue reported with Five Central", "Troubleshooting steps confirmed", "Escalated to support"],
    transcript: [
      { speaker: "AI", name: "AI Assistant", time: "00:08:15", text: "Hi there! What can I help you with?" },
      { speaker: "Caller", name: "Caller", time: "00:08:20", text: "I'm having an issue with Five Central. I already tried restarting." },
      { speaker: "AI", name: "AI Assistant", time: "00:08:35", text: "Thank you for trying that. I'll escalate this to our technical team." },
    ],
  },
  {
    id: "5",
    callerName: "Anonymous",
    phone: "+91 97114 38837",
    duration: "28s",
    sentiment: "Neutral",
    time: "5:11 PM",
    date: "Tuesday, May 12",
    dateISO: "May 12, 2026, 5:11 PM",
    tag: "Issue",
    tags: ["Issue"],
    resolved: false,
    summary: "The caller reported an issue with their Transcentral commercial account, and the AI receptionist transferred the call to the support team.",
    actions: ["Commercial account issue reported", "Transferred to support team"],
    transcript: [
      { speaker: "AI", name: "AI Assistant", time: "00:05:11", text: "Hello, how can I help you?" },
      { speaker: "Caller", name: "Caller", time: "00:05:16", text: "I have an issue with my Transcentral commercial account." },
      { speaker: "AI", name: "AI Assistant", time: "00:05:22", text: "Let me transfer you to a specialist right away." },
    ],
  },
  {
    id: "6",
    callerName: "Anonymous",
    phone: "+91 97114 38837",
    duration: "1m 44s",
    sentiment: "Positive",
    time: "3:20 PM",
    date: "Tuesday, May 12",
    dateISO: "May 12, 2026, 3:20 PM",
    tag: "Scheduling",
    tags: ["Scheduling"],
    resolved: true,
    summary: "The caller asked about scheduling a consultation for next week and was given available time slots.",
    actions: ["Consultation scheduling request", "Available slots provided", "Appointment booked"],
    transcript: [
      { speaker: "AI", name: "AI Assistant", time: "00:03:20", text: "Hi! How can I assist you today?" },
      { speaker: "Caller", name: "Caller", time: "00:03:25", text: "I'd like to schedule a consultation for next week." },
      { speaker: "AI", name: "AI Assistant", time: "00:03:30", text: "Of course! We have Tuesday at 2 PM and Thursday at 10 AM available." },
      { speaker: "Caller", name: "Caller", time: "00:03:45", text: "Thursday at 10 AM works for me." },
      { speaker: "AI", name: "AI Assistant", time: "00:03:50", text: "Great! Your consultation is booked for Thursday at 10 AM. You'll receive a confirmation shortly." },
    ],
  },
  {
    id: "7",
    callerName: "Anonymous",
    phone: "+91 97114 38837",
    duration: "48s",
    sentiment: "Neutral",
    time: "11:05 AM",
    date: "Monday, May 11",
    dateISO: "May 11, 2026, 11:05 AM",
    tag: "Pricing",
    tags: ["Pricing"],
    resolved: false,
    summary: "The caller inquired about pricing for the premium plan and requested a callback from the sales team.",
    actions: ["Pricing inquiry for premium plan", "Callback request logged"],
    transcript: [
      { speaker: "AI", name: "AI Assistant", time: "00:11:05", text: "Hello! How can I help you today?" },
      { speaker: "Caller", name: "Caller", time: "00:11:10", text: "What's the pricing for the premium plan?" },
      { speaker: "AI", name: "AI Assistant", time: "00:11:18", text: "I'd be happy to have our sales team reach out with detailed pricing. Can I take your contact info for a callback?" },
    ],
  },
];

export function getCallRecord(id: string): CallRecord | undefined {
  return callRecords.find((c) => c.id === id);
}

export const sentimentMeta: Record<Sentiment, { dot: string; text: string; bg: string }> = {
  Positive: { dot: "bg-emerald-500", text: "text-emerald-700", bg: "bg-emerald-50" },
  Neutral: { dot: "bg-slate-400", text: "text-slate-500", bg: "bg-transparent" },
  Negative: { dot: "bg-rose-500", text: "text-rose-600", bg: "bg-rose-50" },
};
