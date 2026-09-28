import { NextResponse } from "next/server";
import { editTask } from "@/lib/tasksStore";

export async function PATCH(
  request: Request,
  props: { params: Promise<{ title: string }> }
) {
  try {
    const params = await props.params;
    const body = await request.json();
    const updated = editTask(params.title, body.countdown);
    if (!updated) {
      return NextResponse.json({ error: "Task not found" }, { status: 404 });
    }
    return NextResponse.json(updated);
  } catch {
    return NextResponse.json({ error: "Failed to edit task" }, { status: 400 });
  }
}
