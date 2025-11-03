# Todo List Application - Next.js + Laravel API

A modern, full-featured Todo application built with Next.js 13+ (App Router) that integrates with a Laravel backend API. This project demonstrates clean architecture, type safety, and production-ready code quality.

## Features

### Core Features (MVP)
- **Full CRUD Operations**: Create, Read, Update, and Delete todos
- **Smart Filtering**: Filter todos by status (To Do, In Progress, Done) and priority (Low, Medium, High)
- **Search Functionality**: Real-time search across todo titles and descriptions
- **Sorting Options**: Sort by creation date, due date, or title (ascending/descending)
- **Form Validation**: Client-side validation using Zod schema validation
- **Responsive Design**: Beautiful, mobile-friendly UI built with Tailwind CSS and shadcn/ui
- **Toast Notifications**: User feedback for all operations (success/error states)
- **Confirmation Dialogs**: Safe deletion with confirmation prompts

### Technical Features
- **Next.js 14+ App Router**: Modern React framework with server and client components
- **TypeScript**: Full type safety throughout the application
- **shadcn/ui Components**: Pre-built, accessible UI components
- **Zod Validation**: Schema-based form validation
- **Date Formatting**: User-friendly date display with date-fns
- **Clean Architecture**: Separated concerns with dedicated files for API, validation, and components

## Tech Stack

### Frontend
- **Framework**: Next.js 14+ (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui
- **Form Management**: React Hook Form
- **Validation**: Zod
- **Icons**: Lucide React
- **Date Utilities**: date-fns

### Backend
- **Framework**: Laravel (provided separately)
- **Database**: SQLite
- **API**: RESTful API

## Project Structure

```
project/
├── app/
│   ├── layout.tsx          # Root layout with metadata
│   ├── page.tsx            # Main todo list page (client component)
│   └── globals.css         # Global styles
├── components/
│   ├── todo-form.tsx       # Create/Edit todo form modal
│   ├── todo-filters.tsx    # Filtering and search controls
│   ├── todo-item.tsx       # Individual todo card
│   └── ui/                 # shadcn/ui components
├── lib/
│   ├── api.ts              # API client functions
│   ├── validation.ts       # Zod schemas
│   └── utils.ts            # Utility functions
├── .env.local              # Environment variables (local)
├── .env.example            # Environment variables template
└── package.json            # Dependencies
```

## Installation

### Prerequisites
- Node.js 18+ installed
- npm or yarn package manager
- Laravel backend running (see Laravel setup below)

### Frontend Setup

1. **Clone and navigate to the project**:
```bash
cd project
```

2. **Install dependencies**:
```bash
npm install
```

3. **Configure environment variables**:
```bash
cp .env.example .env.local
```

Edit `.env.local` and set your Laravel API URL:
```env
NEXT_PUBLIC_API_URL=http://localhost:8000/api
```

4. **Run the development server**:
```bash
npm run dev
```

The application will be available at `http://localhost:3000`

### Laravel Backend Setup

1. Ensure your Laravel backend is running on `http://localhost:8000`

2. The Laravel API should have the following endpoints:
   - `GET /api/todos` - List all todos (with query params for filtering)
   - `POST /api/todos` - Create a new todo
   - `GET /api/todos/:id` - Get a single todo
   - `PATCH /api/todos/:id` - Update a todo
   - `DELETE /api/todos/:id` - Delete a todo

3. Make sure CORS is properly configured in your Laravel backend to allow requests from `http://localhost:3000`

## API Integration

### Data Model

The Todo model has the following structure:

```typescript
interface Todo {
  id: number;
  title: string;
  description?: string;
  status: 'todo' | 'in_progress' | 'done';
  priority: 'low' | 'medium' | 'high';
  dueDate?: string;
  createdAt: string;
  updatedAt: string;
}
```

### API Endpoints Usage

**Listing Todos** (with filters):
```
GET /api/todos?status=todo,in_progress&priority=high&search=auth&sort=dueDate:asc&page=1
```

**Creating a Todo**:
```
POST /api/todos
Body: {
  "title": "Add form validation",
  "description": "Both server and client with Zod",
  "status": "todo",
  "priority": "medium",
  "dueDate": "2025-10-28"
}
```

**Updating a Todo**:
```
PATCH /api/todos/:id
Body: { "status": "done" }
```

**Deleting a Todo**:
```
DELETE /api/todos/:id
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint
- `npm run typecheck` - Check TypeScript types

## Code Quality

This project follows best practices for code quality:

- **ESLint**: Configured with Next.js recommended rules
- **TypeScript**: Strict mode enabled for type safety
- **Component Structure**: Clean, reusable components with single responsibilities
- **Error Handling**: Comprehensive error handling with user-friendly messages
- **Loading States**: Visual feedback during async operations

## Key Features Explained

### Form Validation
Forms are validated using Zod schemas with React Hook Form for optimal user experience:
- Required fields are clearly marked
- Real-time validation feedback
- Type-safe form data

### Filtering System
- **Status Filter**: Toggle between To Do, In Progress, and Done
- **Priority Filter**: Filter by Low, Medium, or High priority
- **Search**: Real-time search across titles and descriptions
- **Sorting**: Multiple sorting options with ascending/descending order

### User Experience
- **Toast Notifications**: Success and error messages for all operations
- **Loading States**: Spinners during data fetching
- **Confirmation Dialogs**: Prevent accidental deletions
- **Responsive Design**: Works seamlessly on mobile, tablet, and desktop

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Architecture Decisions

1. **API Layer Separation**: All API calls are centralized in `lib/api.ts` for maintainability
2. **Client Components**: Used `'use client'` directive for interactive components
3. **Validation Layer**: Separated validation logic into `lib/validation.ts` for reusability
4. **Component Composition**: Small, focused components for better maintainability
5. **Type Safety**: Full TypeScript coverage with strict mode

## Challenges & Solutions

1. **API Response Format**: The Laravel API returns data wrapped in a `data` property. Solution: Handle both wrapped and unwrapped responses in the API layer.

2. **Form State Management**: Needed to handle both create and edit modes. Solution: Use a single form component with conditional initial data.

3. **Filter State Synchronization**: Multiple filters needed to work together. Solution: Centralized filter state in the main component and trigger refetch on any filter change.

4. **Date Handling**: Laravel returns dates in different formats. Solution: Use date-fns for consistent date formatting throughout the app.

5. **Toast Positioning**: Needed consistent notification system. Solution: Integrated shadcn/ui's Sonner toasts at the root level.

## Future Enhancements

Potential features to add:
- Server-side pagination
- Bulk actions (delete multiple todos)
- Drag-and-drop Kanban board view
- Tags system
- Due date reminders
- Dark mode
- Export/Import functionality
- Unit and integration tests
- CI/CD pipeline

## License

This project is created for educational purposes as part of an internship assessment.

## Contact

For questions or feedback, please reach out to the development team.

---

Built with Next.js and Laravel
