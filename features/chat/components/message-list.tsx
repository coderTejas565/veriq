import type { ChatMessageDTO } from "../types";

import { MessageItem } from "./message-item";

interface Props {
  messages: ChatMessageDTO[];
}

export function MessageList({ messages }: Props) {
  if (!messages.length) {
    return (
      <div className="flex min-h-[360px] items-center justify-center px-6 text-center">
        <div className="max-w-sm space-y-3">
          <div className="bg-primary/10 text-primary mx-auto flex h-12 w-12 items-center justify-center rounded-full">
            💬
          </div>

          <p className="text-sm font-semibold">Start a conversation</p>

          <p className="text-muted-foreground text-sm leading-6">
            Ask questions about your notebook and get answers from your uploaded
            knowledge.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 scroll-smooth px-1 pb-4">
      {messages.map((message) => (
        <MessageItem key={message.id} message={message} />
      ))}
    </div>
  );
}
