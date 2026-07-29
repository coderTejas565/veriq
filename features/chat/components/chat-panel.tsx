import type { ChatMessageDTO } from "../types";

import { MessageList } from "./message-list";
import { ChatInput } from "./chat-input";

interface Props {
  notebookId: string;
  messages: ChatMessageDTO[];
}

export function ChatPanel({ notebookId, messages }: Props) {
  return (
    <section className="bg-card flex h-[720px] flex-col overflow-hidden rounded-3xl border shadow-sm">
      {/* Header */}
      <div className="bg-muted/30 border-b px-6 py-5">
        <div className="space-y-1">
          <h2 className="text-lg font-semibold tracking-tight">
            Chat with your notebook
          </h2>

          <p className="text-muted-foreground text-sm">
            Ask questions and get answers from your knowledge base.
          </p>
        </div>
      </div>

      {/* Messages */}
      <div className="bg-background/50 flex-1 overflow-y-auto px-5 py-6">
        <MessageList messages={messages} />
      </div>

      {/* Input */}
      <div className="bg-card border-t px-5 py-4">
        <ChatInput notebookId={notebookId} />
      </div>
    </section>
  );
}
