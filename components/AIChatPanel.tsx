"use client";

import { Bot, SendHorizonal, Sparkles, User2 } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

const starterQuestions = [
  "What are the key requirements?",
  "Is this a good opportunity for a small contractor?",
  "What documents are required?",
  "What risks should I watch for?"
];

type ChatMessage = {
  role: "assistant" | "user";
  text: string;
};

function buildAssistantReply(message: string) {
  const lower = message.toLowerCase();
  if (lower.includes("document")) {
    return "Focus on the required proposal forms, pricing sheet, and any certifications or past performance materials referenced in the solicitation.";
  }
  if (lower.includes("risk")) {
    return "Watch for participation goals, mandatory meetings, bond requirements, and short turnaround between questions due and proposal due.";
  }
  if (lower.includes("small contractor")) {
    return "This looks strongest when your firm can meet the core NAICS and pair with certified subcontractors where participation goals or scale are a concern.";
  }
  return "The strongest path is to compare the solicitation requirements, deadlines, and risk flags against your current capacity, certifications, and recent public-sector wins.";
}

export function AIChatPanel({ compact = false }: { compact?: boolean }) {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: "assistant",
      text: "Ask about requirements, fit, documents, or risks. This MVP uses the available solicitation context to guide review."
    }
  ]);
  const [input, setInput] = useState("");

  const submit = (text: string) => {
    if (!text.trim()) return;
    const userMessage = { role: "user" as const, text };
    const assistantMessage = { role: "assistant" as const, text: buildAssistantReply(text) };
    setMessages((current) => [...current, userMessage, assistantMessage]);
    setInput("");
  };

  return (
    <Card className={compact ? "h-full" : "h-full lg:sticky lg:top-6"}>
      <CardHeader className="border-b border-border/70 pb-4">
        <div className="flex items-center gap-3">
          <div className="rounded-2xl bg-primary/10 p-2 text-primary">
            <Sparkles className="h-4 w-4" />
          </div>
          <div>
            <CardTitle>Opportunity Copilot</CardTitle>
            <p className="text-sm text-muted-foreground">Ask about requirements, risks, and bid strategy while you review.</p>
          </div>
        </div>
      </CardHeader>
      <CardContent className="flex h-[540px] flex-col gap-4 p-4">
        <div className="flex flex-wrap gap-2">
          {starterQuestions.map((question) => (
            <button
              key={question}
              className="rounded-full border border-border bg-background px-3 py-1.5 text-xs text-muted-foreground transition-colors hover:border-primary hover:text-foreground"
              onClick={() => submit(question)}
            >
              {question}
            </button>
          ))}
        </div>
        <div className="flex-1 space-y-3 overflow-y-auto rounded-2xl bg-secondary/40 p-3">
          {messages.map((message, index) => (
            <div
              key={`${message.role}-${index}`}
              className={`flex gap-3 ${message.role === "user" ? "justify-end" : "justify-start"}`}
            >
              {message.role === "assistant" && (
                <div className="rounded-full bg-primary/10 p-2 text-primary">
                  <Bot className="h-4 w-4" />
                </div>
              )}
              <div
                className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm ${
                  message.role === "user"
                    ? "bg-primary text-primary-foreground"
                    : "border border-border bg-background"
                }`}
              >
                {message.text}
              </div>
              {message.role === "user" && (
                <div className="rounded-full bg-secondary p-2 text-secondary-foreground">
                  <User2 className="h-4 w-4" />
                </div>
              )}
            </div>
          ))}
        </div>
        <form
          className="flex gap-2"
          onSubmit={(event) => {
            event.preventDefault();
            submit(input);
          }}
        >
          <Input
            value={input}
            onChange={(event) => setInput(event.target.value)}
            placeholder="Ask the assistant about this opportunity..."
          />
          <Button type="submit" size="icon">
            <SendHorizonal className="h-4 w-4" />
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
