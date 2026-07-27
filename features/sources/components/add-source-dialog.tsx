"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import type { SourceType } from "../types";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { addSourceAction } from "../actions/add-source";

interface Props {
  notebookId: string;
}

export function AddSourceDialog({
  notebookId,
}: Props) {
  const router = useRouter();

  const [open, setOpen] = useState(false);

  const [type, setType] = useState<SourceType>("TEXT");

  const [source, setSource] = useState("");

  const [pending, startTransition] =
    useTransition();

  function handleSubmit() {
    startTransition(async () => {
      try {
        await addSourceAction({
          notebookId,
          type,
          source,
        });

        setOpen(false);
        setSource("");

        router.refresh();
      } catch (error) {
        console.error(error);
      }
    });
  }

  return (
    <Dialog
      open={open}
      onOpenChange={setOpen}
    >
      <DialogTrigger
      render={<Button />}
    >
        <Button>Add Source</Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Source</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <Select
  value={type}
  onValueChange={(value) => {
    if (!value) return;

    setType(value as SourceType);
  }}
>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>

            <SelectContent>
              <SelectItem value="TEXT">
                Text
              </SelectItem>

              <SelectItem
                value="PDF"
                disabled
              >
                PDF (Coming Soon)
              </SelectItem>

              <SelectItem
                value="WEBSITE"
                disabled
              >
                Website (Coming Soon)
              </SelectItem>

              <SelectItem
                value="YOUTUBE"
                disabled
              >
                YouTube (Coming Soon)
              </SelectItem>
            </SelectContent>
          </Select>

          <Textarea
            value={source}
            onChange={(e) =>
              setSource(e.target.value)
            }
            placeholder="Paste your notes here..."
            rows={10}
          />

          <Button
            onClick={handleSubmit}
            disabled={
              pending || source.trim() === ""
            }
            className="w-full"
          >
            {pending
              ? "Adding..."
              : "Add Source"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}