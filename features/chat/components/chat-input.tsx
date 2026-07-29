"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

import { sendMessageAction } from "../actions/send-message";


interface Props {
  notebookId: string;
}


export function ChatInput({
  notebookId,
}: Props) {

  const router = useRouter();

  const [question, setQuestion] =
    useState("");

  const [pending, startTransition] =
    useTransition();


  function handleSubmit() {

    if (!question.trim()) return;


    startTransition(async () => {

      try {

        await sendMessageAction({
          notebookId,
          question,
        });


        setQuestion("");

        router.refresh();

      } catch(error) {

        console.error(error);

      }

    });

  }


  return (
    <div className="space-y-3">

      <Textarea
        value={question}
        onChange={(e)=>
          setQuestion(e.target.value)
        }
        placeholder="Ask about your notebook..."
        rows={3}
      />


      <Button
        onClick={handleSubmit}
        disabled={
          pending ||
          !question.trim()
        }
        className="w-full"
      >
        {
          pending
            ? "Thinking..."
            : "Ask"
        }
      </Button>

    </div>
  );
}