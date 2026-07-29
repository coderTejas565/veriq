import type { ChatMessageDTO } from "../types";

import { MessageList } from "./message-list";
import { ChatInput } from "./chat-input";

interface Props {
  notebookId: string;
  messages: ChatMessageDTO[];
}

export function ChatPanel({ notebookId, messages }: Props) {
  return (
    <section className="space-y-6 rounded-lg border p-6">
      <div>
        <h2 className="font-semibold">Chat</h2>

        <p className="text-muted-foreground text-sm">
          Ask questions about your knowledge base.
        </p>
      </div>

      <MessageList messages={messages} />

      <ChatInput notebookId={notebookId} />
    </section>
  );
}
