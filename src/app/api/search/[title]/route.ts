import { NextResponse } from "next/server";
import { searchTask } from "@/lib/tasksStore";

export async function GET(
  request: Request,
  props: { params: Promise<{ title: string }> }
) {
  const params = await props.params;
  const task = searchTask(params.title);
  if (!task) {
    return NextResponse.json({ error: "Task not found" }, { status: 404 });
  }
  return NextResponse.json(task);
}
