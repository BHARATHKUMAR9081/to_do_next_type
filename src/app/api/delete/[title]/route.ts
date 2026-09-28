import { NextResponse } from "next/server";
import { deleteTask } from "@/lib/tasksStore";

export async function DELETE(
  request: Request,
  props: { params: Promise<{ title: string }> }
) {
  const params = await props.params;
  const success = deleteTask(params.title);
  if (!success) {
    return NextResponse.json({ error: "Task not found" }, { status: 404 });
  }
  return NextResponse.json({ message: "Task deleted successfully" });
}
