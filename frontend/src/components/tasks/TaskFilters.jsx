import { Search, ChevronUp, ChevronDown, X, SlidersHorizontal } from 'lucide-react';
import { Button } from '../ui/Button';

const STATUS_OPTIONS = [
  { value: '', label: 'All Statuses' },
  { value: 'pending', label: 'Pending' },
  { value: 'in_progress', label: 'In Progress' },
  { value: 'completed', label: 'Completed' },
];

const PRIORITY_OPTIONS = [
  { value: '', label: 'All Priorities' },
  { value: 'high', label: 'High' },
  { value: 'medium', label: 'Medium' },
  { value: 'low', label: 'Low' },
];

const SORT_OPTIONS = [
  { value: 'createdAt', label: 'Created Date' },
  { value: 'dueDate', label: 'Due Date' },
  { value: 'priority', label: 'Priority' },
  { value: 'title', label: 'Title' },
];

function FilterSelect({ value, onChange, options }) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="px-3 py-2 text-sm rounded-lg border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-gray-700 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 cursor-pointer hover:border-gray-400 dark:hover:border-slate-500 transition-colors"
    >
      {options.map((opt) => (
        <option key={opt.value} value={opt.value} className="dark:bg-slate-800">
          {opt.label}
        </option>
      ))}
    </select>
  );
}

/**
 * Filter and search bar with status, priority, sort, and clear button
 */
export function TaskFilters({ filters, onFilterChange }) {
  const hasActiveFilters =
    filters.search || filters.status || filters.priority || filters.sortBy !== 'createdAt' || filters.sortOrder !== 'desc';

  const clearFilters = () => {
    onFilterChange({
      search: '',
      status: '',
      priority: '',
      sortBy: 'createdAt',
      sortOrder: 'desc',
    });
  };

  return (
    <div className="bg-white dark:bg-slate-800 rounded-2xl border border-gray-200 dark:border-slate-700 shadow-sm p-4">
      <div className="flex flex-col sm:flex-row gap-3">
        {/* Search input */}
        <div className="relative flex-1">
          <Search
            size={16}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-slate-500 pointer-events-none"
          />
          <input
            type="text"
            placeholder="Search tasks by title or description..."
            value={filters.search}
            onChange={(e) => onFilterChange({ search: e.target.value })}
            className="w-full pl-9 pr-4 py-2 text-sm rounded-lg border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-900 text-gray-900 dark:text-slate-100 placeholder:text-gray-400 dark:placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent hover:border-gray-400 dark:hover:border-slate-500 transition-colors"
          />
          {filters.search && (
            <button
              onClick={() => onFilterChange({ search: '' })}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 p-0.5 rounded text-gray-400 hover:text-gray-600 dark:hover:text-slate-200"
            >
              <X size={14} />
            </button>
          )}
        </div>

        {/* Filter controls */}
        <div className="flex items-center gap-2 flex-wrap sm:flex-nowrap">
          <SlidersHorizontal size={16} className="text-gray-400 dark:text-slate-500 flex-shrink-0 hidden sm:block" />

          <FilterSelect
            value={filters.status}
            onChange={(val) => onFilterChange({ status: val })}
            options={STATUS_OPTIONS}
          />

          <FilterSelect
            value={filters.priority}
            onChange={(val) => onFilterChange({ priority: val })}
            options={PRIORITY_OPTIONS}
          />

          <FilterSelect
            value={filters.sortBy}
            onChange={(val) => onFilterChange({ sortBy: val })}
            options={SORT_OPTIONS}
          />

          {/* Sort order toggle */}
          <button
            onClick={() =>
              onFilterChange({ sortOrder: filters.sortOrder === 'asc' ? 'desc' : 'asc' })
            }
            className="flex items-center gap-1 px-3 py-2 text-sm rounded-lg border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-gray-700 dark:text-slate-200 hover:border-gray-400 dark:hover:border-slate-500 hover:bg-gray-50 dark:hover:bg-slate-700 transition-colors"
            title={filters.sortOrder === 'asc' ? 'Sort Descending' : 'Sort Ascending'}
          >
            {filters.sortOrder === 'asc' ? (
              <ChevronUp size={16} />
            ) : (
              <ChevronDown size={16} />
            )}
          </button>

          {/* Clear filters */}
          {hasActiveFilters && (
            <Button variant="ghost" size="sm" onClick={clearFilters} className="text-red-500 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/20">
              <X size={14} />
              Clear
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
