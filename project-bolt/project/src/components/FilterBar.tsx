import { FILTER_OPTIONS, STATUS_OPTIONS, getStatusMeta } from '@/types';
import type { TaskStatus } from '@/types';
import { ChevronDown } from 'lucide-react';

interface FilterBarProps {
  filter: 'all' | TaskStatus;
  onFilterChange: (filter: 'all' | TaskStatus) => void;
  counts: Record<'all' | TaskStatus, number>;
}

export function FilterBar({ filter, onFilterChange, counts }: FilterBarProps) {
  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex flex-wrap items-center gap-2">
        {FILTER_OPTIONS.map((option) => {
          const isActive = filter === option.value;
          return (
            <button
              key={option.value}
              onClick={() => onFilterChange(option.value)}
              className={`inline-flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-sm font-medium transition-all ${
                isActive
                  ? 'bg-slate-900 text-white shadow-sm'
                  : 'bg-white text-slate-600 border border-slate-200 hover:border-slate-300 hover:bg-slate-50'
              }`}
            >
              {option.label}
              <span
                className={`rounded-full px-1.5 py-0.5 text-xs font-semibold ${
                  isActive ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-500'
                }`}
              >
                {counts[option.value] ?? 0}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

interface StatusSelectProps {
  status: TaskStatus;
  onChange: (status: TaskStatus) => void;
}

export function StatusSelect({ status, onChange }: StatusSelectProps) {
  const meta = getStatusMeta(status);
  return (
    <div className="relative">
      <select
        value={status}
        onChange={(e) => onChange(e.target.value as TaskStatus)}
        className={`cursor-pointer appearance-none rounded-full border py-1 pl-2.5 pr-7 text-xs font-semibold transition-all focus:outline-none focus:ring-2 focus:ring-slate-200 ${meta.color}`}
      >
        {STATUS_OPTIONS.map((opt) => (
          <option key={opt.value} value={opt.value} className="bg-white text-slate-900">
            {opt.label}
          </option>
        ))}
      </select>
      <ChevronDown className="pointer-events-none absolute right-2 top-1/2 h-3.5 w-3.5 -translate-y-1/2 opacity-60" />
    </div>
  );
}
