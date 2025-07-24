"use client";

import Swal from 'sweetalert2'
import { useState } from "react";

export default function AddTaskBar() {
  const [title, setTitle] = useState("");
  const [hours, setHours] = useState<number>(0);
  const [minutes, setMinutes] = useState<number>(0);
  const [seconds, setSeconds] = useState<number>(0);

  const handleAddTask = async () => {
    if (!title) {
      Swal.fire({
        title: "Title is required",
        text: ".Please enter a title for the task",
        icon: "error"
      });
      return;
    }

    const task = {
      title,
      countdown: {
        hours,
        minutes,
        seconds,
      },
      isDone: false,
    };

    try {
      const response = await fetch("http://localhost:3000/api/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(task),
      });

      const result = await response.text();
      console.log(result);
      Swal.fire({
        title: "Succes",
        text: "Your task has been added successfully",
        icon: "success"
      });
      
      // Clear inputs
      setTitle("");
      setHours(0);
      setMinutes(0);
      setSeconds(0);

      setTimeout(()=>{
          window.location.reload();
      },3000);

    } catch (err) {
      console.error("Error adding task:", err);
      Swal.fire({
        title: "Error",
        text: "Failed to add task",
        icon: "error"
      });
    }
  };

  return (
    <div dir="ltr" className="flex flex-1 items-center justify-between w-full gap-4">
      <fieldset className="fieldset flex-1 bg-base-200 border-base-300 rounded-box w-xs border p-4">
        <legend className="fieldset-legend">Task Setting</legend>

        <div className="flex items-center justify-between gap-4 w-full mb-4">
          <input
            type="text"
            className="input flex-1"
            placeholder="Task Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <button onClick={handleAddTask} className="btn btn-soft btn-primary w-[200px]">
            Add Task
          </button>
        </div>

        <div className="flex items-center gap-4 w-full">
          <input
            type="number"
            className="input w-[150px]"
            placeholder="Hours"
            value={hours}
            onChange={(e) => setHours(Number(e.target.value))}
          />
          <p>:</p>
          <input
            type="number"
            className="input w-[150px]"
            placeholder="Minutes"
            value={minutes}
            onChange={(e) => setMinutes(Number(e.target.value))}
          />
          <p>:</p>
          <input
            type="number"
            className="input w-[150px]"
            placeholder="Seconds"
            value={seconds}
            onChange={(e) => setSeconds(Number(e.target.value))}
          />
        </div>

        <p className="label mt-2">You can edit task title later</p>
      </fieldset>
    </div>
  );
}
