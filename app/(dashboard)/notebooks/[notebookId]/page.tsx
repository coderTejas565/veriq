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

    const messages =
    await getNotebookMessages(
      notebook.id,
    );


  return (
    <main className="container mx-auto space-y-8 py-10">
      {/* Notebook Header */}

      <div>
        <h1 className="text-3xl font-bold">{notebook.title}</h1>

        <p className="text-muted-foreground">
          {notebook.description ?? "No description"}
        </p>
      </div>

      {/* Sources */}

      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-semibold">Sources</h2>

            <p className="text-muted-foreground text-sm">
              Add documents to your knowledge base.
            </p>
          </div>

          <AddSourceDialog notebookId={notebook.id} />
        </div>

        <SourceList sources={sources} />
      </section>

      {/* Chat */}

      <ChatPanel
        notebookId={notebook.id}
        messages={messages}
      />
    </main>
  );
}
