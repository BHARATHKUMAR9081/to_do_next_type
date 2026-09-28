import { NextResponse } from "next/server";
import { getDoneTasks } from "@/lib/tasksStore";

export async function GET() {
  const doneTasks = getDoneTasks();
  return NextResponse.json(doneTasks);
}
