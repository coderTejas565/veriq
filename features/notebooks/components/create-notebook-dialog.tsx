"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

import { createNotebookAction } from "../actions/create-notebook";

export function CreateNotebookDialog() {
  const router = useRouter();

  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    console.log("submit fired");

    const formData = new FormData(e.currentTarget);

    console.log({
      title: formData.get("title"),
      description: formData.get("description"),
    });

    setLoading(true);

    try {
      const notebook = await createNotebookAction({
        title: formData.get("title"),
        description: formData.get("description"),
      });

      console.log("created notebook", notebook);

      setOpen(false);

      router.push(`/notebooks/${notebook.id}`);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger render={<Button />}>New Notebook</DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create Notebook</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <Input name="title" placeholder="Notebook name" required />

          <Textarea
            name="description"
            placeholder="What is this notebook about?"
          />

          <Button type="submit" disabled={loading} className="w-full">
            {loading ? "Creating..." : "Create Notebook"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
