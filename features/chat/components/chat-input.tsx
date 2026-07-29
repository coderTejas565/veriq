"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

import { sendMessageAction } from "../actions/send-message";

interface Props {
  notebookId: string;
}

export function ChatInput({ notebookId }: Props) {
  const router = useRouter();

  const [question, setQuestion] = useState("");

  const [pending, startTransition] = useTransition();

  function handleSubmit() {
    if (!question.trim()) return;

    startTransition(async () => {
      try {
        await sendMessageAction({
          notebookId,
          question,
        });

        setQuestion("");

        router.refresh();
      } catch (error) {
        console.error(error);
      }
    });
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === "Enter" && (e.ctrlKey || e.metaKey)) {
      e.preventDefault();
      handleSubmit();
    }
  }

  return (
    <div className="space-y-3">
      <div className="bg-background focus-within:ring-primary/20 relative rounded-2xl border shadow-sm transition focus-within:ring-2">
        <Textarea
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Ask anything about your notebook..."
          rows={3}
          className="min-h-[110px] resize-none border-0 bg-transparent px-4 py-4 pr-20 text-sm leading-6 shadow-none focus-visible:ring-0"
        />

        <div className="text-muted-foreground absolute right-4 bottom-3 text-xs">
          {question.length}
        </div>
      </div>

      <div className="flex items-center justify-between gap-3">
        <p className="text-muted-foreground text-xs">
          Press Ctrl + Enter to send
        </p>

        <Button
          onClick={handleSubmit}
          disabled={pending || !question.trim()}
          className="h-11 rounded-xl px-8"
        >
          {pending ? "VeriQ is thinking..." : "Ask VeriQ"}
        </Button>
      </div>
    </div>
  );
}
