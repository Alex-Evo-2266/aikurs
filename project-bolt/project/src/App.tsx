import { useMemo, useState } from 'react';
import { CheckSquare, Plus, X } from 'lucide-react';
import type { TaskStatus } from '@/types';
import { useTasks } from '@/hooks/useTasks';
import { TaskForm } from '@/components/TaskForm';
import { TaskList } from '@/components/TaskList';
import { FilterBar } from '@/components/FilterBar';
import { ConfirmDialog } from '@/components/ConfirmDialog';
import { EmptyState } from '@/components/EmptyState';

type Filter = 'all' | TaskStatus;

function App() {
  const { tasks, addTask, updateTask, deleteTask, setTaskStatus } = useTasks();
  const [filter, setFilter] = useState<Filter>('all');
  const [showForm, setShowForm] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState<string | null>(null);

  const counts = useMemo(() => {
    const c: Record<Filter, number> = { all: tasks.length, new: 0, in_progress: 0, done: 0 };
    for (const t of tasks) c[t.status]++;
    return c;
  }, [tasks]);

  const filteredTasks = useMemo(() => {
    if (filter === 'all') return tasks;
    return tasks.filter((t) => t.status === filter);
  }, [tasks, filter]);

  const deleteTargetTask = tasks.find((t) => t.id === deleteTarget) ?? null;

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="border-b border-slate-200 bg-white/80 backdrop-blur-sm sticky top-0 z-30">
        <div className="mx-auto max-w-2xl px-4 py-4 sm:px-6">
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-2.5">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-slate-900">
                <CheckSquare className="h-5 w-5 text-white" />
              </div>
              <div>
                <h1 className="text-lg font-bold tracking-tight text-slate-900">Мои задачи</h1>
                <p className="text-xs text-slate-400">{tasks.length > 0 ? `${tasks.length} ${pluralize(tasks.length)}` : 'Нет задач'}</p>
              </div>
            </div>
            {!showForm && (
              <button
                onClick={() => setShowForm(true)}
                className="inline-flex items-center gap-1.5 rounded-lg bg-slate-900 px-3.5 py-2 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-slate-700"
              >
                <Plus className="h-4 w-4" />
                <span className="hidden sm:inline">Новая задача</span>
                <span className="sm:hidden">Добавить</span>
              </button>
            )}
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-2xl px-4 py-6 sm:px-6 sm:py-8">
        {/* Add task form */}
        {showForm && (
          <div className="mb-6 rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-base font-semibold text-slate-900">Новая задача</h2>
              <button
                onClick={() => setShowForm(false)}
                className="rounded-lg p-1.5 text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-600"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
            <TaskForm
              onSubmit={(title, description) => {
                addTask(title, description);
                setShowForm(false);
              }}
              onCancel={() => setShowForm(false)}
            />
          </div>
        )}

        {/* Filter + list */}
        {tasks.length > 0 ? (
          <>
            <div className="mb-5">
              <FilterBar filter={filter} onFilterChange={setFilter} counts={counts} />
            </div>
            {filteredTasks.length > 0 ? (
              <TaskList
                tasks={filteredTasks}
                onUpdate={updateTask}
                onStatusChange={setTaskStatus}
                onDeleteRequest={setDeleteTarget}
              />
            ) : (
              <EmptyState hasTasks={tasks.length > 0} onAdd={() => setShowForm(true)} />
            )}
          </>
        ) : (
          <EmptyState hasTasks={false} onAdd={() => setShowForm(true)} />
        )}
      </main>

      {/* Delete confirmation */}
      {deleteTargetTask && (
        <ConfirmDialog
          title="Удалить задачу?"
          message={`«${deleteTargetTask.title}» будет удалена без возможности восстановления.`}
          onConfirm={() => {
            deleteTask(deleteTargetTask.id);
            setDeleteTarget(null);
          }}
          onCancel={() => setDeleteTarget(null)}
        />
      )}
    </div>
  );
}

function pluralize(n: number): string {
  const mod10 = n % 10;
  const mod100 = n % 100;
  if (mod10 === 1 && mod100 !== 11) return 'задача';
  if (mod10 >= 2 && mod10 <= 4 && (mod100 < 10 || mod100 >= 20)) return 'задачи';
  return 'задач';
}

export default App;
