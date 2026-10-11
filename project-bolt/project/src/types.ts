export type TaskStatus = 'new' | 'in_progress' | 'done';

export interface Task {
  id: string;
  title: string;
  description: string;
  status: TaskStatus;
  createdAt: string;
}

export const STATUS_OPTIONS: { value: TaskStatus; label: string; color: string; dot: string }[] = [
  { value: 'new', label: 'Новая', color: 'bg-blue-100 text-blue-700 border-blue-200', dot: 'bg-blue-500' },
  { value: 'in_progress', label: 'В работе', color: 'bg-amber-100 text-amber-700 border-amber-200', dot: 'bg-amber-500' },
  { value: 'done', label: 'Выполнена', color: 'bg-emerald-100 text-emerald-700 border-emerald-200', dot: 'bg-emerald-500' },
];

export const FILTER_OPTIONS: { value: 'all' | TaskStatus; label: string }[] = [
  { value: 'all', label: 'Все' },
  { value: 'new', label: 'Новые' },
  { value: 'in_progress', label: 'В работе' },
  { value: 'done', label: 'Выполненные' },
];

export function getStatusMeta(status: TaskStatus) {
  return STATUS_OPTIONS.find((s) => s.value === status) ?? STATUS_OPTIONS[0];
}
