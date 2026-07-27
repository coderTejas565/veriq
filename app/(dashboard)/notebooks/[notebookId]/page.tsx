interface Props {
  params: Promise<{
    notebookId: string;
  }>;
}

export default async function NotebookPage({ params }: Props) {
  const { notebookId } = await params;

  return (
    <main className="container mx-auto py-10">
      <h1 className="text-3xl font-bold">Notebook</h1>

      <p>{notebookId}</p>
    </main>
  );
}
