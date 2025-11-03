'use client';

import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Search } from 'lucide-react';

interface TodoFiltersProps {
  statusFilter: string[];
  priorityFilter: string[];
  searchQuery: string;
  sortBy: string;
  onStatusFilterChange: (status: string[]) => void;
  onPriorityFilterChange: (priority: string[]) => void;
  onSearchChange: (search: string) => void;
  onSortChange: (sort: string) => void;
  onReset: () => void;
}

export function TodoFilters({
  statusFilter,
  priorityFilter,
  searchQuery,
  sortBy,
  onStatusFilterChange,
  onPriorityFilterChange,
  onSearchChange,
  onSortChange,
  onReset,
}: TodoFiltersProps) {
  const toggleStatus = (status: string) => {
    if (statusFilter.includes(status)) {
      onStatusFilterChange(statusFilter.filter((s) => s !== status));
    } else {
      onStatusFilterChange([...statusFilter, status]);
    }
  };

  const togglePriority = (priority: string) => {
    if (priorityFilter.includes(priority)) {
      onPriorityFilterChange(priorityFilter.filter((p) => p !== priority));
    } else {
      onPriorityFilterChange([...priorityFilter, priority]);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Search todos..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="pl-10"
          />
        </div>
        <Select value={sortBy} onValueChange={onSortChange}>
          <SelectTrigger className="w-[200px]">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="createdAt:desc">Created (Newest)</SelectItem>
            <SelectItem value="createdAt:asc">Created (Oldest)</SelectItem>
            <SelectItem value="dueDate:asc">Due Date (Earliest)</SelectItem>
            <SelectItem value="dueDate:desc">Due Date (Latest)</SelectItem>
            <SelectItem value="title:asc">Title (A-Z)</SelectItem>
            <SelectItem value="title:desc">Title (Z-A)</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex gap-6">
          <div className="space-y-2">
            <p className="text-sm font-medium text-gray-700">Status</p>
            <div className="flex gap-2">
              <Button
                variant={statusFilter.includes('todo') ? 'default' : 'outline'}
                size="sm"
                onClick={() => toggleStatus('todo')}
              >
                To Do
              </Button>
              <Button
                variant={statusFilter.includes('in_progress') ? 'default' : 'outline'}
                size="sm"
                onClick={() => toggleStatus('in_progress')}
              >
                In Progress
              </Button>
              <Button
                variant={statusFilter.includes('done') ? 'default' : 'outline'}
                size="sm"
                onClick={() => toggleStatus('done')}
              >
                Done
              </Button>
            </div>
          </div>

          <div className="space-y-2">
            <p className="text-sm font-medium text-gray-700">Priority</p>
            <div className="flex gap-2">
              <Button
                variant={priorityFilter.includes('low') ? 'default' : 'outline'}
                size="sm"
                onClick={() => togglePriority('low')}
              >
                Low
              </Button>
              <Button
                variant={priorityFilter.includes('medium') ? 'default' : 'outline'}
                size="sm"
                onClick={() => togglePriority('medium')}
              >
                Medium
              </Button>
              <Button
                variant={priorityFilter.includes('high') ? 'default' : 'outline'}
                size="sm"
                onClick={() => togglePriority('high')}
              >
                High
              </Button>
            </div>
          </div>
        </div>

        <Button variant="ghost" onClick={onReset}>
          Reset Filters
        </Button>
      </div>
    </div>
  );
}
