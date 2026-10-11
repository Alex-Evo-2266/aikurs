import { useEffect, useRef, useState } from 'react';
import { Check, X } from 'lucide-react';

interface TaskFormProps {
  onSubmit: (title: string, description: string) => void;
  onCancel: () => void;
  initialTitle?: string;
  initialDescription?: string;
  submitLabel?: string;
}

export function TaskForm({ onSubmit, onCancel, initialTitle = '', initialDescription = '', submitLabel = 'Добавить' }: TaskFormProps) {
  const [title, setTitle] = useState(initialTitle);
  const [description, setDescription] = useState(initialDescription);
  const [error, setError] = useState('');
  const titleRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    titleRef.current?.focus();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) {
      setError('Название задачи обязательно — введите его, чтобы продолжить.');
      titleRef.current?.focus();
      return;
    }
    onSubmit(title, description);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="task-title" className="mb-1.5 block text-sm font-medium text-slate-700">
          Название
        </label>
        <input
          id="task-title"
          ref={titleRef}
          type="text"
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
            if (error) setError('');
          }}
          placeholder="Что нужно сделать?"
          className="w-full rounded-lg border border-slate-300 px-3.5 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 transition-colors focus:border-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-200"
        />
        {error && <p className="mt-2 text-sm font-medium text-red-600">{error}</p>}
      </div>

      <div>
        <label htmlFor="task-description" className="mb-1.5 block text-sm font-medium text-slate-700">
          Описание <span className="font-normal text-slate-400">(необязательно)</span>
        </label>
        <textarea
          id="task-description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Дополнительные детали…"
          rows={3}
          className="w-full resize-none rounded-lg border border-slate-300 px-3.5 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 transition-colors focus:border-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-200"
        />
      </div>

      <div className="flex items-center justify-end gap-2.5 pt-1">
        <button
          type="button"
          onClick={onCancel}
          className="inline-flex items-center gap-1.5 rounded-lg px-4 py-2.5 text-sm font-medium text-slate-600 transition-colors hover:bg-slate-100"
        >
          <X className="h-4 w-4" />
          Отмена
        </button>
        <button
          type="submit"
          className="inline-flex items-center gap-1.5 rounded-lg bg-slate-900 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-slate-700 active:bg-slate-800"
        >
          <Check className="h-4 w-4" />
          {submitLabel}
        </button>
      </div>
    </form>
  );
}
