"use client";

import React, { useEffect, useState } from "react";
import Task from "./Task";

interface Countdown {
  hours: number;
  minutes: number;
  seconds: number;
}

interface TaskItem {
  title: string;
  countdown: Countdown;
  isDone: boolean;
}

export default function TaskManager() {
  const [tasks, setTasks] = useState<TaskItem[]>([]);

  const fetchAllTasks = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/getAll");
      if (!response.ok) throw new Error("Network error");
      const data: TaskItem[] = await response.json();
      setTasks(data);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  useEffect(() => {
    fetchAllTasks();
  }, []);

  return (
    <div dir="ltr" className="p-4 flex-1 rounded-lg bg-base-100 border border-base-300">
      <ul className="menu bg-base-200 rounded-box w-[700px] overflow-scroll max-h-[600px] scrollbar-hide">
        {tasks.map((task) => (
          <li key={task.title}>
            <Task title={task.title} countdown={task.countdown} isDone={task.isDone} />
          </li>
        ))}
      </ul>
    </div>
  );
}
