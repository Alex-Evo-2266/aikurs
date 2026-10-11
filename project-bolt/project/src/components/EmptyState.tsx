import { ClipboardList, Plus } from 'lucide-react';

interface EmptyStateProps {
  hasTasks: boolean;
  onAdd: () => void;
}

export function EmptyState({ hasTasks, onAdd }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-slate-200 bg-white/50 px-6 py-16 text-center">
      <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-slate-100">
        <ClipboardList className="h-7 w-7 text-slate-400" />
      </div>
      <h3 className="text-base font-semibold text-slate-900">
        {hasTasks ? 'Нет задач в этой категории' : 'Список задач пуст'}
      </h3>
      <p className="mt-1.5 max-w-xs text-sm text-slate-500">
        {hasTasks
          ? 'Попробуйте выбрать другой фильтр, чтобы увидеть остальные задачи.'
          : 'Самое время добавить первую задачу и начать продуктивный день.'}
      </p>
      {!hasTasks && (
        <button
          onClick={onAdd}
          className="mt-5 inline-flex items-center gap-1.5 rounded-lg bg-slate-900 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-slate-700"
        >
          <Plus className="h-4 w-4" />
          Добавить первую задачу
        </button>
      )}
    </div>
  );
}
