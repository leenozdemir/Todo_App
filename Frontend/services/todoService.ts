const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api';

export interface Todo {
  id: number;
  title: string;
  description?: string;
  status: 'todo' | 'in_progress' | 'done';
  priority: 'low' | 'medium' | 'high';
  dueDate?: string;
  createdAt: string;
  updatedAt: string;
}

export interface TodoFormData {
  title: string;
  description?: string;
  status: 'todo' | 'in_progress' | 'done';
  priority: 'low' | 'medium' | 'high';
  dueDate?: string;
}

export async function fetchTodos(): Promise<Todo[]> {
  const response = await fetch(`${API_URL}/todos`);
  if (!response.ok) throw new Error('Failed to fetch todos');
  const data = await response.json();
  return data.data || data;
}

export async function createTodo(todo: TodoFormData): Promise<Todo> {
  const response = await fetch(`${API_URL}/todos`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(todo),
  });
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Failed to create todo');
  }
  const data = await response.json();
  return data.data || data;
}

export async function updateTodo(id: number, todo: Partial<TodoFormData>): Promise<Todo> {
  const response = await fetch(`${API_URL}/todos/${id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(todo),
  });
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Failed to update todo');
  }
  const data = await response.json();
  return data.data || data;
}

export async function deleteTodo(id: number): Promise<void> {
  const response = await fetch(`${API_URL}/todos/${id}`, { method: 'DELETE' });
  if (!response.ok) throw new Error('Failed to delete todo');
}
