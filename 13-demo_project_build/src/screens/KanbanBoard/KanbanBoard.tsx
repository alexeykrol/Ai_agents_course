import React, { useState } from 'react';
import { ArrowLeft, Plus, Clock, CheckCircle, Circle } from 'lucide-react';

interface Task {
  id: string;
  title: string;
  description: string;
  priority: 'low' | 'medium' | 'high';
}

interface Column {
  id: string;
  title: string;
  tasks: Task[];
  icon: React.ReactNode;
  color: string;
}

interface KanbanBoardProps {
  onBack: () => void;
}

const KanbanBoard: React.FC<KanbanBoardProps> = ({ onBack }) => {
  const [draggedTask, setDraggedTask] = useState<Task | null>(null);
  const [draggedFromColumn, setDraggedFromColumn] = useState<string | null>(null);
  const [dragOverColumn, setDragOverColumn] = useState<string | null>(null);

  const [columns, setColumns] = useState<Column[]>([
    {
      id: 'todo',
      title: 'To Do',
      icon: <Circle className="w-5 h-5" />,
      color: 'bg-gray-100 border-gray-300',
      tasks: [
        {
          id: '1',
          title: 'Design new landing page',
          description: 'Create wireframes and mockups for the new product landing page',
          priority: 'high'
        },
        {
          id: '2',
          title: 'Setup database schema',
          description: 'Define tables and relationships for user management system',
          priority: 'medium'
        },
        {
          id: '3',
          title: 'Write API documentation',
          description: 'Document all REST endpoints with examples and response formats',
          priority: 'low'
        }
      ]
    },
    {
      id: 'inprogress',
      title: 'In Progress',
      icon: <Clock className="w-5 h-5" />,
      color: 'bg-blue-50 border-blue-300',
      tasks: [
        {
          id: '4',
          title: 'Implement user authentication',
          description: 'Add login, register, and password reset functionality',
          priority: 'high'
        },
        {
          id: '5',
          title: 'Create responsive navigation',
          description: 'Build mobile-friendly navigation component with hamburger menu',
          priority: 'medium'
        },
        {
          id: '6',
          title: 'Optimize image loading',
          description: 'Implement lazy loading and WebP format support',
          priority: 'low'
        }
      ]
    },
    {
      id: 'done',
      title: 'Done',
      icon: <CheckCircle className="w-5 h-5" />,
      color: 'bg-green-50 border-green-300',
      tasks: [
        {
          id: '7',
          title: 'Setup project structure',
          description: 'Initialize React project with TypeScript and Tailwind CSS',
          priority: 'high'
        },
        {
          id: '8',
          title: 'Configure build pipeline',
          description: 'Setup Vite build configuration and deployment scripts',
          priority: 'medium'
        },
        {
          id: '9',
          title: 'Create component library',
          description: 'Build reusable UI components with consistent styling',
          priority: 'medium'
        }
      ]
    }
  ]);

  const handleDragStart = (e: React.DragEvent, task: Task, columnId: string) => {
    setDraggedTask(task);
    setDraggedFromColumn(columnId);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragEnd = () => {
    setDraggedTask(null);
    setDraggedFromColumn(null);
    setDragOverColumn(null);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDragEnter = (columnId: string) => {
    setDragOverColumn(columnId);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    // Only clear drag over if we're leaving the column entirely
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    const x = e.clientX;
    const y = e.clientY;
    
    if (x < rect.left || x > rect.right || y < rect.top || y > rect.bottom) {
      setDragOverColumn(null);
    }
  };

  const handleDrop = (e: React.DragEvent, targetColumnId: string) => {
    e.preventDefault();
    
    if (!draggedTask || !draggedFromColumn || draggedFromColumn === targetColumnId) {
      return;
    }

    setColumns(prevColumns => {
      return prevColumns.map(column => {
        if (column.id === draggedFromColumn) {
          // Remove task from source column
          return {
            ...column,
            tasks: column.tasks.filter(task => task.id !== draggedTask.id)
          };
        } else if (column.id === targetColumnId) {
          // Add task to target column
          return {
            ...column,
            tasks: [...column.tasks, draggedTask]
          };
        }
        return column;
      });
    });

    setDragOverColumn(null);
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'low':
        return 'bg-green-100 text-green-800 border-green-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 p-6">
        <button
          onClick={onBack}
          className="inline-flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors duration-200 mb-4"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Menu</span>
        </button>
        
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Kanban Board</h1>
          <p className="text-gray-600">Drag and drop tasks between columns to update their status</p>
        </div>
      </div>

      {/* Kanban Board */}
      <div className="p-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex space-x-6 overflow-x-auto pb-6">
            {columns.map((column) => (
              <div
                key={column.id}
                className={`flex-shrink-0 w-80 ${column.color} rounded-lg border-2 transition-all duration-200 ${
                  dragOverColumn === column.id ? 'border-blue-500 bg-blue-100' : ''
                }`}
                onDragOver={handleDragOver}
                onDragEnter={() => handleDragEnter(column.id)}
                onDragLeave={handleDragLeave}
                onDrop={(e) => handleDrop(e, column.id)}
              >
                {/* Column Header */}
                <div className="p-4 border-b border-gray-200">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      {column.icon}
                      <h2 className="text-lg font-semibold text-gray-900">{column.title}</h2>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="bg-gray-200 text-gray-700 text-sm px-2 py-1 rounded-full">
                        {column.tasks.length}
                      </span>
                      <button className="text-gray-400 hover:text-gray-600 transition-colors duration-200">
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Tasks */}
                <div className="p-4 space-y-3 max-h-96 overflow-y-auto">
                  {column.tasks.map((task) => (
                    <div
                      key={task.id}
                      draggable
                      onDragStart={(e) => handleDragStart(e, task, column.id)}
                      onDragEnd={handleDragEnd}
                      className={`bg-white rounded-lg p-4 shadow-sm border border-gray-200 cursor-move hover:shadow-md transition-all duration-200 transform hover:-translate-y-1 ${
                        draggedTask?.id === task.id ? 'opacity-50 rotate-2' : ''
                      }`}
                    >
                      <div className="flex items-start justify-between mb-2">
                        <h3 className="text-sm font-semibold text-gray-900 leading-tight">
                          {task.title}
                        </h3>
                        <span className={`text-xs px-2 py-1 rounded-full border ${getPriorityColor(task.priority)}`}>
                          {task.priority}
                        </span>
                      </div>
                      <p className="text-xs text-gray-600 leading-relaxed">
                        {task.description}
                      </p>
                    </div>
                  ))}

                  {/* Drop Zone Placeholder */}
                  {dragOverColumn === column.id && draggedFromColumn !== column.id && (
                    <div className="border-2 border-dashed border-blue-400 bg-blue-50 rounded-lg p-4 text-center">
                      <p className="text-blue-600 text-sm font-medium">Перетащите задачу сюда</p>
                    </div>
                  )}

                  {/* Empty State */}
                  {column.tasks.length === 0 && dragOverColumn !== column.id && (
                    <div className="text-center py-8">
                      <div className="text-gray-400 mb-2">
                        <Circle className="w-8 h-8 mx-auto" />
                      </div>
                      <p className="text-gray-500 text-sm">Пока нет задач</p>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Instructions */}
          <div className="text-center mt-8">
            <div className="inline-flex items-center space-x-2 text-gray-500 text-sm bg-white px-4 py-2 rounded-full shadow-sm">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
             <span>Перетаскивайте задачи между колонками для изменения статуса</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default KanbanBoard;