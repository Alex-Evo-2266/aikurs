import type { Task, TaskStatus } from '@/types';
import { TaskItem } from './TaskItem';

interface TaskListProps {
  tasks: Task[];
  onUpdate: (id: string, updates: { title: string; description: string }) => void;
  onStatusChange: (id: string, status: TaskStatus) => void;
  onDeleteRequest: (id: string) => void;
}

export function TaskList({ tasks, onUpdate, onStatusChange, onDeleteRequest }: TaskListProps) {
  return (
    <div className="space-y-3">
      {tasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          onUpdate={onUpdate}
          onStatusChange={onStatusChange}
          onDelete={onDeleteRequest}
        />
      ))}
    </div>
  );
}
