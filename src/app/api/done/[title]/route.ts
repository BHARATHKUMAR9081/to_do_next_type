import { NextResponse } from "next/server";
import { toggleDone } from "@/lib/tasksStore";

export async function POST(
  request: Request,
  props: { params: Promise<{ title: string }> }
) {
  const params = await props.params;
  const task = toggleDone(params.title);
  if (!task) {
    return NextResponse.json({ error: "Task not found" }, { status: 404 });
  }
  return NextResponse.json(task);
}
