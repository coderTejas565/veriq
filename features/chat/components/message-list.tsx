import type { ChatMessageDTO } from "../types";

import { MessageItem } from "./message-item";

interface Props {
  messages: ChatMessageDTO[];
}

export function MessageList({
  messages,
}: Props) {

  if (!messages.length) {
    return (
      <div className="text-center text-sm text-muted-foreground">
        Ask something about your notebook.
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {messages.map((message) => (
        <MessageItem
          key={message.id}
          message={message}
        />
      ))}
    </div>
  );
}