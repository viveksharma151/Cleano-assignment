import { Sun, Moon, CheckSquare, ListTodo } from 'lucide-react';

/**
 * App Header with logo, dark mode toggle, and stats summary
 */
export function Header({ isDark, toggleTheme, stats }) {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-gray-200 dark:border-slate-700 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center gap-2.5">
            <div className="flex items-center justify-center w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 shadow-md">
              <CheckSquare size={20} className="text-white" />
            </div>
            <div>
              <span className="text-xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                TaskFlow
              </span>
              <p className="text-[10px] text-gray-400 dark:text-slate-500 leading-none -mt-0.5 hidden sm:block">
                Task Management
              </p>
            </div>
          </div>

          {/* Right side */}
          <div className="flex items-center gap-3">
            {/* Stats summary */}
            {stats && (
              <div className="hidden md:flex items-center gap-4 px-4 py-1.5 rounded-full bg-gray-100 dark:bg-slate-800 border border-gray-200 dark:border-slate-700">
                <div className="flex items-center gap-1.5 text-xs text-gray-500 dark:text-slate-400">
                  <ListTodo size={13} className="text-indigo-500" />
                  <span className="font-semibold text-gray-700 dark:text-slate-200">
                    {stats.total ?? 0}
                  </span>
                  <span>total</span>
                </div>
                <div className="w-px h-3 bg-gray-300 dark:bg-slate-600" />
                <div className="flex items-center gap-1 text-xs">
                  <span className="w-2 h-2 rounded-full bg-amber-400" />
                  <span className="text-gray-600 dark:text-slate-300 font-medium">
                    {stats.pending ?? 0}
                  </span>
                </div>
                <div className="flex items-center gap-1 text-xs">
                  <span className="w-2 h-2 rounded-full bg-blue-400" />
                  <span className="text-gray-600 dark:text-slate-300 font-medium">
                    {stats.in_progress ?? 0}
                  </span>
                </div>
                <div className="flex items-center gap-1 text-xs">
                  <span className="w-2 h-2 rounded-full bg-green-400" />
                  <span className="text-gray-600 dark:text-slate-300 font-medium">
                    {stats.completed ?? 0}
                  </span>
                </div>
              </div>
            )}

            {/* Dark mode toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-xl text-gray-500 hover:text-gray-700 hover:bg-gray-100 dark:text-slate-400 dark:hover:text-slate-200 dark:hover:bg-slate-800 transition-all duration-200"
              aria-label="Toggle dark mode"
            >
              {isDark ? <Sun size={20} /> : <Moon size={20} />}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
