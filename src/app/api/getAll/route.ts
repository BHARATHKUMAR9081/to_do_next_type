import { NextResponse } from "next/server";
import { getAllTasks } from "@/lib/tasksStore";

export async function GET() {
  const tasks = getAllTasks();
  return NextResponse.json(tasks);
}
