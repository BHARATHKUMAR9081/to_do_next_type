"use client";

import React, { useState,useEffect } from "react";
import Task from "./Task";
import DoneTask from "./DoneTask";

interface Countdown {
  hours: number;
  minutes: number;
  seconds: number;
}

interface DoneItem {
  title: string;
  countdown: Countdown;
  isDone: boolean;
}

export default function RightBar() {
  const [doneTasks, setDoneTasks] = useState<DoneItem[]>([]);
  const fetchDoneTasks = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/done");
      const data = await response.json();
      console.log("Fetched:", data);
      setDoneTasks(data); 
    } catch (err) {
      console.error("Fetch failed:", err);
    }
  };

  useEffect(() => {
    fetchDoneTasks(); 
  }, []);
  return (
    <div className="flex flex-col bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20 h-screen w-80">
      <h2 className="text-lg font-semibold mb-4 text-white text-center">
        Done Tasks
      </h2>
      <p className="text-gray-400 text-center mb-2">Previously done tasks</p>

      <div
        dir="ltr"
        className="flex-1 overflow-y-auto scrollbar-hide px-4 h-64"
      >
        <ul className="space-y-4 mb-6">
          {doneTasks.map((item) => (
          <li key={item.title}>
            <DoneTask title={item.title} />
          </li>
        ))}
        </ul>
      </div>
    </div>
  );
}
