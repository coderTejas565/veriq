import { notFound } from "next/navigation";

import { requireUser } from "@/features/auth/session";

import { getNotebookById } from "@/features/notebooks/repositories/notebook.repository";

import { getNotebookSources } from "@/features/sources/repositories/source.repository";

import { SourceList } from "@/features/sources/components/source-list";

import { AddSourceDialog } from "@/features/sources/components/add-source-dialog";

import { getNotebookMessages } from "@/features/chat/repositories/message.repository";

import { ChatPanel } from "@/features/chat/components/chat-panel";

interface Props {
  params: Promise<{
    notebookId: string;
  }>;
}

export default async function NotebookPage({ params }: Props) {
  const { notebookId } = await params;

  const user = await requireUser();

  const notebook = await getNotebookById(notebookId, user.id);

  if (!notebook) {
    notFound();
  }

  const sources = await getNotebookSources(notebook.id);

  const messages = await getNotebookMessages(notebook.id);

  return (
    <main className="space-y-5">
      {/* Header */}

      <section className="bg-card rounded-2xl border px-6 py-5 shadow-sm">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
          <div className="space-y-2">
            <div className="text-muted-foreground text-xs font-medium tracking-wide uppercase">
              AI Knowledge Workspace
            </div>

            <div>
              <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
                {notebook.title}
              </h1>

              <p className="text-muted-foreground mt-1 text-sm">
                {notebook.description ?? "Chat with your knowledge using AI."}
              </p>
            </div>

            <div className="flex items-center gap-4 text-sm">
              <span className="text-muted-foreground">
                Sources:
                <span className="text-foreground ml-1 font-medium">
                  {sources.length}
                </span>
              </span>

              <span className="text-muted-foreground">
                Status:
                <span className="ml-1 font-medium text-green-600">Ready</span>
              </span>

              <span className="text-muted-foreground">
                Mode:
                <span className="text-foreground ml-1 font-medium">RAG</span>
              </span>
            </div>
          </div>

          <div className="shrink-0">
            <AddSourceDialog notebookId={notebook.id} />
          </div>
        </div>
      </section>

      {/* Workspace */}

      <section className="grid items-start gap-6 xl:grid-cols-[360px_minmax(0,1fr)]">
        {/* Sources */}

        <aside className="bg-card rounded-3xl border p-5 shadow-sm xl:sticky xl:top-6">
          <div className="mb-5 space-y-1">
            <h2 className="text-lg font-semibold">Sources</h2>

            <p className="text-muted-foreground text-sm">
              Knowledge used by VeriQ.
            </p>
          </div>

          <SourceList sources={sources} />
        </aside>

        {/* Chat */}

        <div className="min-w-0">
          <ChatPanel notebookId={notebook.id} messages={messages} />
        </div>
      </section>
    </main>
  );
}
