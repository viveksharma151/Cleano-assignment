import { Eye, Pencil, Trash2, Calendar, Clock, AlertTriangle } from 'lucide-react';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';
import {
  formatDate,
  formatDateTime,
  isOverdue,
  getPriorityColor,
  getStatusColor,
  getPriorityLabel,
  getStatusLabel,
} from '../../utils/helpers';

/**
 * Task card component with priority/status badges, overdue indicator, and action buttons
 */
export function TaskCard({ task, onView, onEdit, onDelete }) {
  const overdue = isOverdue(task.dueDate, task.status);

  return (
    <div
      className={`group relative flex flex-col bg-white dark:bg-slate-800 rounded-2xl border transition-all duration-200 cursor-pointer
        hover:shadow-lg hover:-translate-y-0.5
        ${overdue
          ? 'border-red-200 dark:border-red-800/50 shadow-red-50 dark:shadow-none'
          : 'border-gray-200 dark:border-slate-700 shadow-sm'
        }`}
      onClick={() => onView(task)}
    >
      {/* Overdue accent strip */}
      {overdue && (
        <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-red-500 to-orange-500 rounded-t-2xl" />
      )}

      <div className="p-5 flex flex-col gap-3 flex-1">
        {/* Top row: priority + status */}
        <div className="flex items-center justify-between gap-2">
          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getPriorityColor(task.priority)}`}>
            {getPriorityLabel(task.priority)}
          </span>
          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(task.status)}`}>
            {getStatusLabel(task.status)}
          </span>
        </div>

        {/* Title */}
        <h3 className="font-semibold text-gray-900 dark:text-slate-100 text-base leading-snug line-clamp-1 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
          {task.title}
        </h3>

        {/* Description */}
        {task.description && (
          <p className="text-sm text-gray-500 dark:text-slate-400 leading-relaxed line-clamp-2">
            {task.description}
          </p>
        )}

        {/* Dates */}
        <div className="flex flex-col gap-1 mt-auto pt-2 border-t border-gray-100 dark:border-slate-700">
          {task.dueDate && (
            <div className={`flex items-center gap-1.5 text-xs ${overdue ? 'text-red-600 dark:text-red-400 font-medium' : 'text-gray-500 dark:text-slate-400'}`}>
              {overdue ? <AlertTriangle size={12} className="flex-shrink-0" /> : <Calendar size={12} className="flex-shrink-0" />}
              <span>{overdue ? 'Overdue: ' : 'Due: '}</span>
              <span className="font-medium">{formatDate(task.dueDate)}</span>
            </div>
          )}
          <div className="flex items-center gap-1.5 text-xs text-gray-400 dark:text-slate-500">
            <Clock size={12} className="flex-shrink-0" />
            <span>Created {formatDate(task.createdAt)}</span>
          </div>
        </div>
      </div>

      {/* Action buttons — visible on hover */}
      <div
        className="flex items-center gap-1 px-4 py-3 border-t border-gray-100 dark:border-slate-700 bg-gray-50/50 dark:bg-slate-900/30 rounded-b-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        <Button
          size="sm"
          variant="ghost"
          onClick={() => onView(task)}
          className="flex-1 text-gray-500 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400"
        >
          <Eye size={14} />
          View
        </Button>
        <div className="w-px h-4 bg-gray-200 dark:bg-slate-600" />
        <Button
          size="sm"
          variant="ghost"
          onClick={() => onEdit(task)}
          className="flex-1 text-gray-500 dark:text-slate-400 hover:text-amber-600 dark:hover:text-amber-400"
        >
          <Pencil size={14} />
          Edit
        </Button>
        <div className="w-px h-4 bg-gray-200 dark:bg-slate-600" />
        <Button
          size="sm"
          variant="ghost"
          onClick={() => onDelete(task)}
          className="flex-1 text-gray-500 dark:text-slate-400 hover:text-red-600 dark:hover:text-red-400"
        >
          <Trash2 size={14} />
          Delete
        </Button>
      </div>
    </div>
  );
}
