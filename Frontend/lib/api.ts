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

export interface FetchTodosParams {
  status?: string[];
  priority?: string[];
  search?: string;
  sort?: string;
  page?: number;
}

export async function fetchTodos(params?: FetchTodosParams): Promise<Todo[]> {
  const queryParams = new URLSearchParams();

  if (params?.status && params.status.length > 0) {
    queryParams.append('status', params.status.join(','));
  }

  if (params?.priority && params.priority.length > 0) {
    queryParams.append('priority', params.priority.join(','));
  }

  if (params?.search) {
    queryParams.append('search', params.search);
  }

  if (params?.sort) {
    queryParams.append('sort', params.sort);
  }

  if (params?.page) {
    queryParams.append('page', params.page.toString());
  }

  const url = `${API_URL}/todos${queryParams.toString() ? `?${queryParams.toString()}` : ''}`;

  try {
    const response = await fetch(url, {
      headers: {
        'Accept': 'application/json',
      },
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Fetch error:', errorText);
      throw new Error('Failed to fetch todos');
    }

    const data = await response.json();
    // Laravel Resource returns data in 'data' property
    return data.data || data;
  } catch (error) {
    console.error('Error fetching todos:', error);
    throw error;
  }
}

export async function createTodo(todo: TodoFormData): Promise<Todo> {
  // Remove empty description to avoid sending null/empty string
  const payload = { ...todo };
  if (!payload.description || payload.description.trim() === '') {
    delete payload.description;
  }
  if (!payload.dueDate || payload.dueDate.trim() === '') {
    delete payload.dueDate;
  }

  console.log('Creating todo with payload:', payload);

  try {
    const response = await fetch(`${API_URL}/todos`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({ message: 'Failed to create todo' }));
      console.error('Create error:', errorData);
      throw new Error(errorData.message || 'Failed to create todo');
    }

    const data = await response.json();
    console.log('Create response:', data);
    return data.data || data;
  } catch (error) {
    console.error('Error creating todo:', error);
    throw error;
  }
}

export async function updateTodo(id: number, todo: Partial<TodoFormData>): Promise<Todo> {
  // Clean up payload
  const payload = { ...todo };
  if (!payload.description || payload.description.trim() === '') {
    delete payload.description;
  }
  if (!payload.dueDate || payload.dueDate.trim() === '') {
    delete payload.dueDate;
  }

  console.log('Updating todo with payload:', payload);

  try {
    // Use PUT instead of PATCH for Laravel apiResource
    const response = await fetch(`${API_URL}/todos/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({ message: 'Failed to update todo' }));
      console.error('Update error:', errorData);
      throw new Error(errorData.message || 'Failed to update todo');
    }

    const data = await response.json();
    return data.data || data;
  } catch (error) {
    console.error('Error updating todo:', error);
    throw error;
  }
}

export async function deleteTodo(id: number): Promise<void> {
  try {
    const response = await fetch(`${API_URL}/todos/${id}`, {
      method: 'DELETE',
      headers: {
        'Accept': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Failed to delete todo');
    }
  } catch (error) {
    console.error('Error deleting todo:', error);
    throw error;
  }
}
