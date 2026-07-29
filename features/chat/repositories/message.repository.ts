import { db } from "@/db";
import { messages } from "@/db/schema";

import { eq, asc } from "drizzle-orm";


export async function createMessage(data:{
  id:string;
  notebookId:string;
  role:
    | "USER"
    | "ASSISTANT"
    | "SYSTEM";
  content:string;
}){

  const [message] =
    await db
      .insert(messages)
      .values(data)
      .returning();


  return message;
}



export async function getNotebookMessages(
  notebookId:string
){

  return db.query.messages.findMany({

    where:eq(
      messages.notebookId,
      notebookId
    ),

    orderBy:[
      asc(messages.createdAt)
    ]

  });

}