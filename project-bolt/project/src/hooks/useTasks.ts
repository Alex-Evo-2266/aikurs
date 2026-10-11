import { useCallback, useEffect, useState } from 'react';
import type { Task, TaskStatus } from '@/types';

const STORAGE_KEY = 'tasks';

function loadTasks(): Task[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as Task[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function useTasks() {
  const [tasks, setTasks] = useState<Task[]>(loadTasks);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
    } catch {
      /* ignore write errors */
    }
  }, [tasks]);

  const addTask = useCallback((title: string, description: string) => {
    const task: Task = {
      id: crypto.randomUUID(),
      title: title.trim(),
      description: description.trim(),
      status: 'new',
      createdAt: new Date().toISOString(),
    };
    setTasks((prev) => [task, ...prev]);
  }, []);

  const updateTask = useCallback((id: string, updates: Partial<Pick<Task, 'title' | 'description' | 'status'>>) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, ...updates, title: updates.title !== undefined ? updates.title.trim() : t.title, description: updates.description !== undefined ? updates.description.trim() : t.description } : t)),
    );
  }, []);

  const deleteTask = useCallback((id: string) => {
    setTasks((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const setTaskStatus = useCallback((id: string, status: TaskStatus) => {
    updateTask(id, { status });
  }, [updateTask]);

  return { tasks, addTask, updateTask, deleteTask, setTaskStatus };
}
