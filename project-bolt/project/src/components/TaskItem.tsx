import { useState } from 'react';
import { Calendar, Pencil, Trash2, Check, X } from 'lucide-react';
import type { Task, TaskStatus } from '@/types';
import { getStatusMeta } from '@/types';
import { StatusSelect } from './FilterBar';
import { TaskForm } from './TaskForm';

interface TaskItemProps {
  task: Task;
  onUpdate: (id: string, updates: { title: string; description: string }) => void;
  onStatusChange: (id: string, status: TaskStatus) => void;
  onDelete: (id: string) => void;
}

function formatDate(iso: string): string {
  const date = new Date(iso);
  return date.toLocaleDateString('ru-RU', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

export function TaskItem({ task, onUpdate, onStatusChange, onDelete }: TaskItemProps) {
  const [isEditing, setIsEditing] = useState(false);
  const meta = getStatusMeta(task.status);
  const isDone = task.status === 'done';

  if (isEditing) {
    return (
      <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
        <TaskForm
          initialTitle={task.title}
          initialDescription={task.description}
          submitLabel="Сохранить"
          onSubmit={(title, description) => {
            onUpdate(task.id, { title, description });
            setIsEditing(false);
          }}
          onCancel={() => setIsEditing(false)}
        />
      </div>
    );
  }

  return (
    <div className="group rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition-all hover:border-slate-300 hover:shadow-md">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0 flex-1">
          <h3 className={`text-base font-semibold text-slate-900 ${isDone ? 'line-through decoration-slate-300' : ''}`}>
            {task.title}
          </h3>
          {task.description && (
            <p className={`mt-1.5 text-sm text-slate-500 ${isDone ? 'line-through decoration-slate-200' : ''}`}>
              {task.description}
            </p>
          )}
          <div className="mt-3 flex items-center gap-2 text-xs text-slate-400">
            <Calendar className="h-3.5 w-3.5" />
            <span>Создана {formatDate(task.createdAt)}</span>
          </div>
        </div>
        <div className="flex shrink-0 items-center gap-1">
          <button
            onClick={() => setIsEditing(true)}
            className="rounded-lg p-2 text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-700"
            aria-label="Редактировать"
          >
            <Pencil className="h-4 w-4" />
          </button>
          <button
            onClick={() => onDelete(task.id)}
            className="rounded-lg p-2 text-slate-400 transition-colors hover:bg-red-50 hover:text-red-600"
            aria-label="Удалить"
          >
            <Trash2 className="h-4 w-4" />
          </button>
        </div>
      </div>
      <div className="mt-4 flex items-center justify-between border-t border-slate-100 pt-3.5">
        <div className="flex items-center gap-1.5">
          <span className={`h-2 w-2 rounded-full ${meta.dot}`} />
          <span className="text-xs font-medium text-slate-500">{meta.label}</span>
        </div>
        <StatusSelect status={task.status} onChange={(status) => onStatusChange(task.id, status)} />
      </div>
    </div>
  );
}
