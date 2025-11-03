'use client';

import { useEffect, useState } from 'react';
import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { TodoForm } from '@/components/todo-form';
import { TodoFilters } from '@/components/todo-filters';
import { TodoItem } from '@/components/todo-item';
import { useToast } from '@/hooks/use-toast';
import { Toaster } from '@/components/ui/sonner';
import {
  fetchTodos,
  createTodo,
  updateTodo,
  deleteTodo,
  Todo,
} from '@/lib/api';
import { TodoFormData } from '@/lib/validation';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';

export default function Home() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingTodo, setEditingTodo] = useState<Todo | undefined>();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const [todoToDelete, setTodoToDelete] = useState<number | null>(null);

  const [statusFilter, setStatusFilter] = useState<string[]>([]);
  const [priorityFilter, setPriorityFilter] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('createdAt:desc');

  const { toast } = useToast();

  const loadTodos = async () => {
    try {
      setIsLoading(true);
      const data = await fetchTodos({
        status: statusFilter,
        priority: priorityFilter,
        search: searchQuery,
        sort: sortBy,
      });
      setTodos(data);
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to fetch todos. Please check your API connection.',
        variant: 'destructive',
      });
      console.error('Failed to fetch todos:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadTodos();
  }, [statusFilter, priorityFilter, searchQuery, sortBy]);

  const handleCreateOrUpdate = async (data: TodoFormData) => {
    try {
      setIsSubmitting(true);
      if (editingTodo) {
        await updateTodo(editingTodo.id, data);
        toast({
          title: 'Success',
          description: 'Todo updated successfully',
        });
      } else {
        await createTodo(data);
        toast({
          title: 'Success',
          description: 'Todo created successfully',
        });
      }
      setIsFormOpen(false);
      setEditingTodo(undefined);
      loadTodos();
    } catch (error) {
      toast({
        title: 'Error',
        description: `Failed to ${editingTodo ? 'update' : 'create'} todo`,
        variant: 'destructive',
      });
      console.error('Failed to save todo:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEdit = (todo: Todo) => {
    setEditingTodo(todo);
    setIsFormOpen(true);
  };

  const handleDeleteClick = (id: number) => {
    setTodoToDelete(id);
    setDeleteConfirmOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (todoToDelete === null) return;

    try {
      await deleteTodo(todoToDelete);
      toast({
        title: 'Success',
        description: 'Todo deleted successfully',
      });
      loadTodos();
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to delete todo',
        variant: 'destructive',
      });
      console.error('Failed to delete todo:', error);
    } finally {
      setDeleteConfirmOpen(false);
      setTodoToDelete(null);
    }
  };

  const handleReset = () => {
    setStatusFilter([]);
    setPriorityFilter([]);
    setSearchQuery('');
    setSortBy('createdAt:desc');
  };

  const handleFormOpenChange = (open: boolean) => {
    setIsFormOpen(open);
    if (!open) {
      setEditingTodo(undefined);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <div>
              <h1 className="text-4xl font-bold text-gray-900">Todo List</h1>
              <p className="text-gray-600 mt-1">Manage your tasks efficiently</p>
            </div>
            <Button
              onClick={() => setIsFormOpen(true)}
              size="lg"
              className="bg-gray-900 hover:bg-gray-800"
            >
              <Plus className="h-5 w-5 mr-2" />
              New Todo
            </Button>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <TodoFilters
            statusFilter={statusFilter}
            priorityFilter={priorityFilter}
            searchQuery={searchQuery}
            sortBy={sortBy}
            onStatusFilterChange={setStatusFilter}
            onPriorityFilterChange={setPriorityFilter}
            onSearchChange={setSearchQuery}
            onSortChange={setSortBy}
            onReset={handleReset}
          />
        </div>

        <div className="space-y-4">
          {isLoading ? (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto"></div>
              <p className="text-gray-600 mt-4">Loading todos...</p>
            </div>
          ) : todos.length === 0 ? (
            <div className="text-center py-12 bg-white rounded-lg shadow-sm">
              <p className="text-gray-500 text-lg">
                No todos found. Create your first todo!
              </p>
            </div>
          ) : (
            todos.map((todo) => (
              <TodoItem
                key={todo.id}
                todo={todo}
                onEdit={handleEdit}
                onDelete={handleDeleteClick}
              />
            ))
          )}
        </div>

        <TodoForm
          open={isFormOpen}
          onOpenChange={handleFormOpenChange}
          onSubmit={handleCreateOrUpdate}
          initialData={editingTodo}
          isLoading={isSubmitting}
        />

        <AlertDialog open={deleteConfirmOpen} onOpenChange={setDeleteConfirmOpen}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete the todo.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction
                onClick={handleDeleteConfirm}
                className="bg-red-600 hover:bg-red-700"
              >
                Delete
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>

        <Toaster />
      </div>
    </div>
  );
}
