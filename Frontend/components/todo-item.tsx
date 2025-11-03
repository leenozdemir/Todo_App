'use client';

import { Todo } from '@/lib/api';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Calendar, Edit2, Trash2 } from 'lucide-react';
import { format } from 'date-fns';

interface TodoItemProps {
  todo: Todo;
  onEdit: (todo: Todo) => void;
  onDelete: (id: number) => void;
}

const statusColors = {
  todo: 'bg-slate-100 text-slate-800 border-slate-200',
  in_progress: 'bg-blue-100 text-blue-800 border-blue-200',
  done: 'bg-green-100 text-green-800 border-green-200',
};

const priorityColors = {
  low: 'bg-gray-100 text-gray-700 border-gray-200',
  medium: 'bg-orange-100 text-orange-700 border-orange-200',
  high: 'bg-red-100 text-red-700 border-red-200',
};

const statusLabels = {
  todo: 'To Do',
  in_progress: 'In Progress',
  done: 'Done',
};

const priorityLabels = {
  low: 'Low',
  medium: 'Medium',
  high: 'High',
};

export function TodoItem({ todo, onEdit, onDelete }: TodoItemProps) {
  return (
    <Card className="p-4 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1 min-w-0">
          <div className="flex items-start gap-3 mb-2">
            <h3 className="font-semibold text-lg text-gray-900 break-words">
              {todo.title}
            </h3>
          </div>

          {todo.description && (
            <p className="text-sm text-gray-600 mb-3 break-words">
              {todo.description}
            </p>
          )}

          <div className="flex flex-wrap items-center gap-2">
            <Badge className={statusColors[todo.status]}>
              {statusLabels[todo.status]}
            </Badge>
            <Badge className={priorityColors[todo.priority]}>
              {priorityLabels[todo.priority]}
            </Badge>
            {todo.dueDate && (
              <div className="flex items-center gap-1 text-sm text-gray-600">
                <Calendar className="h-4 w-4" />
                <span>{format(new Date(todo.dueDate), 'MMM dd, yyyy')}</span>
              </div>
            )}
          </div>
        </div>

        <div className="flex gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onEdit(todo)}
            className="hover:bg-blue-50 hover:text-blue-600"
          >
            <Edit2 className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onDelete(todo.id)}
            className="hover:bg-red-50 hover:text-red-600"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </Card>
  );
}
