export interface Countdown {
  hours: number;
  minutes: number;
  seconds: number;
}

export interface TaskItem {
  title: string;
  countdown: Countdown;
  isDone: boolean;
}

const initialTasks: TaskItem[] = [
  {
    title: "Learn Next.js App Router",
    countdown: { hours: 2, minutes: 30, seconds: 0 },
    isDone: false,
  },
  {
    title: "Complete UI Design",
    countdown: { hours: 1, minutes: 15, seconds: 0 },
    isDone: false,
  },
  {
    title: "Setup Task Management App",
    countdown: { hours: 0, minutes: 45, seconds: 0 },
    isDone: true,
  },
];

const globalForTasks = globalThis as unknown as { tasks: TaskItem[] };

if (!globalForTasks.tasks) {
  globalForTasks.tasks = initialTasks;
}

function safeDecode(str: string): string {
  try {
    return decodeURIComponent(str);
  } catch {
    return str;
  }
}

export function getAllTasks(): TaskItem[] {
  return globalForTasks.tasks.filter((t) => !t.isDone);
}

export function getDoneTasks(): TaskItem[] {
  return globalForTasks.tasks.filter((t) => t.isDone);
}

export function addTask(newTask: TaskItem): TaskItem {
  const existingIndex = globalForTasks.tasks.findIndex(
    (t) => t.title.toLowerCase() === newTask.title.toLowerCase()
  );
  if (existingIndex !== -1) {
    globalForTasks.tasks[existingIndex] = newTask;
  } else {
    globalForTasks.tasks.push(newTask);
  }
  return newTask;
}

export function editTask(title: string, countdown: Countdown): TaskItem | null {
  const decodedTitle = safeDecode(title);
  const task = globalForTasks.tasks.find(
    (t) => t.title.toLowerCase() === decodedTitle.toLowerCase()
  );
  if (task) {
    task.countdown = countdown;
    return task;
  }
  return null;
}

export function deleteTask(title: string): boolean {
  const decodedTitle = safeDecode(title);
  const initialLen = globalForTasks.tasks.length;
  globalForTasks.tasks = globalForTasks.tasks.filter(
    (t) => t.title.toLowerCase() !== decodedTitle.toLowerCase()
  );
  return globalForTasks.tasks.length < initialLen;
}

export function toggleDone(title: string): TaskItem | null {
  const decodedTitle = safeDecode(title);
  const task = globalForTasks.tasks.find(
    (t) => t.title.toLowerCase() === decodedTitle.toLowerCase()
  );
  if (task) {
    task.isDone = !task.isDone;
    return task;
  }
  return null;
}

export function searchTask(title: string): TaskItem | null {
  const decodedTitle = safeDecode(title);
  const task = globalForTasks.tasks.find(
    (t) => t.title.toLowerCase() === decodedTitle.toLowerCase()
  );
  return task || null;
}
