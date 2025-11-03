<?php

namespace App\Http\Controllers;

use App\Models\Todo;
use App\Http\Resources\TodoResource;
use Illuminate\Http\Request;

class TodoController extends Controller
{
    public function index(Request $request)
    {
        $query = Todo::query();

        // Filter by status
        if ($request->has('status')) {
            $statuses = explode(',', $request->status);
            $query->whereIn('status', $statuses);
        }

        // Filter by priority
        if ($request->has('priority')) {
            $priorities = explode(',', $request->priority);
            $query->whereIn('priority', $priorities);
        }

        // Search by title or description
        if ($request->has('search') && $request->search != '') {
            $search = $request->search;
            $query->where(function($q) use ($search) {
                $q->where('title', 'like', "%{$search}%")
                  ->orWhere('description', 'like', "%{$search}%");
            });
        }

        // Sort
        if ($request->has('sort')) {
            $sortParts = explode(':', $request->sort);
            $field = $sortParts[0] ?? 'created_at';
            $direction = $sortParts[1] ?? 'desc';

            // Map frontend field names to database column names
            $fieldMap = [
                'createdAt' => 'created_at',
                'updatedAt' => 'updated_at',
                'dueDate' => 'dueDate',
                'title' => 'title',
                'status' => 'status',
                'priority' => 'priority',
            ];

            $dbField = $fieldMap[$field] ?? 'created_at';
            $query->orderBy($dbField, $direction);
        } else {
            $query->orderBy('created_at', 'desc');
        }

        $todos = $query->get();

        return TodoResource::collection($todos);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'status' => 'required|in:todo,in_progress,done',
            'priority' => 'required|in:low,medium,high',
            'dueDate' => 'nullable|date',
        ]);

        $todo = Todo::create($validated);
        return new TodoResource($todo);
    }

    public function show(Todo $todo)
    {
        return new TodoResource($todo);
    }

    public function update(Request $request, Todo $todo)
    {
        $validated = $request->validate([
            'title' => 'sometimes|string|max:255',
            'description' => 'nullable|string',
            'status' => 'in:todo,in_progress,done',
            'priority' => 'in:low,medium,high',
            'dueDate' => 'nullable|date',
        ]);

        $todo->update($validated);
        return new TodoResource($todo);
    }

    public function destroy(Todo $todo)
    {
        $todo->delete();
        return response()->json(null, 204);
    }
}
