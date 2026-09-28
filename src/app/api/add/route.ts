import { NextResponse } from "next/server";
import { addTask } from "@/lib/tasksStore";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const task = addTask({
      title: body.title,
      countdown: body.countdown || { hours: 0, minutes: 0, seconds: 0 },
      isDone: body.isDone || false,
    });
    return NextResponse.json(task, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Invalid task data" }, { status: 400 });
  }
}
