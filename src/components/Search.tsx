"use client";
import { useState } from "react";
import Swal from "sweetalert2";

export default function Search() {
  const [title, setTitle] = useState("");

  const handleSearch = async () => {
    if (!title.trim()) {
      Swal.fire("error", "please choose title!", "error");
      return;
    }

    try {
      const response = await fetch(`/api/search/${encodeURIComponent(title.trim())}`);
      if (!response.ok) {
        throw new Error("Task not found.");
      }

      const task = await response.json();

      Swal.fire({
        title: `📋 ${task.title}`,
        html: `
          <b>⏱ Timer:</b><br/>
          ${task.countdown.hours} hours, ${task.countdown.minutes} minutes, ${task.countdown.seconds} seconds<br/><br/>
          <b>Status:</b> ${task.isDone ? "✅ Done" : "❌ Not Done"}
        `,
        icon: "info",
        confirmButtonText: "Close"
      });

    } catch (err) {
      Swal.fire("Error", err instanceof Error ? err.message : "Something went wrong", "error");
    }
  };

  return (
    <div dir="ltr" className='flex flex-row items-center mt-4 justify-between gap-4 w-full'>
      <fieldset className="fieldset flex flex-row gap-4 flex-1 bg-base-200 border-base-300 rounded-box w-xs border p-4">
        <legend className="fieldset-legend">Search Task</legend>
        <label className="input flex-1">
          <svg className="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <g fill="none" stroke="currentColor">
              <circle cx="11" cy="11" r="8"></circle>
              <path d="m21 21-4.3-4.3"></path>
            </g>
          </svg>
          <input
            type="search"
            required
            placeholder="Search"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </label>
        <button onClick={handleSearch} className="btn btn-soft btn-primary w-[200px]">
          Search
        </button>
      </fieldset>
    </div>
  );
}
