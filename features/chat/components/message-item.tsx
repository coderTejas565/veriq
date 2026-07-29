import type { ChatMessageDTO } from "../types";

interface Props {
  message: ChatMessageDTO;
}

export function MessageItem({ message }: Props) {
  const isUser = message.role === "USER";

  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"}`}>
      <div
        className={`max-w-[80%] rounded-lg px-4 py-3 text-sm ${
          isUser ? "bg-primary text-primary-foreground" : "bg-muted"
        } `}
      >
        {message.content}
      </div>
    </div>
  );
}
