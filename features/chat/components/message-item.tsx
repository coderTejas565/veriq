import { Bot, User } from "lucide-react";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

import type { ChatMessageDTO } from "../types";

interface Props {
  message: ChatMessageDTO;
}

export function MessageItem({ message }: Props) {
  const isUser = message.role === "USER";

  const [answer, sources] = message.content.split("Sources:");

  return (
    <div
      className={`flex items-start gap-3 ${
        isUser ? "justify-end" : "justify-start"
      } `}
    >
      {!isUser && (
        <div className="bg-primary/10 text-primary mt-1 flex h-9 w-9 shrink-0 items-center justify-center rounded-full border">
          <Bot className="h-4 w-4" />
        </div>
      )}

      <div
        className={`max-w-[80%] rounded-2xl px-5 py-4 text-sm leading-7 break-words shadow-sm ${
          isUser
            ? `bg-primary text-primary-foreground rounded-br-md`
            : `bg-card rounded-bl-md border`
        } `}
      >
        {isUser ? (
          <p className="whitespace-pre-wrap">{message.content}</p>
        ) : (
          <div className="space-y-5">
            {/* Answer */}

            <div className="prose prose-sm prose-headings:font-semibold prose-p:leading-7 prose-li:my-1 prose-code:bg-muted prose-code:px-1 prose-code:rounded dark:prose-invert max-w-none">
              <ReactMarkdown remarkPlugins={[remarkGfm]}>
                {answer.trim()}
              </ReactMarkdown>
            </div>

            {/* Sources */}

            {sources && (
              <div className="text-muted-foreground border-t pt-4 text-xs">
                <p className="text-foreground mb-2 font-medium">Sources</p>

                <div className="space-y-2">
                  {sources
                    .trim()
                    .split("\n")
                    .filter(Boolean)
                    .map((source, index) => (
                      <div
                        key={index}
                        className="bg-muted/50 flex items-center gap-2 rounded-lg px-3 py-2"
                      >
                        📄
                        <span>{source.replace("- ", "")}</span>
                      </div>
                    ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {isUser && (
        <div className="bg-muted mt-1 flex h-9 w-9 shrink-0 items-center justify-center rounded-full border">
          <User className="h-4 w-4" />
        </div>
      )}
    </div>
  );
}
