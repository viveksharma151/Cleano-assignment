import { CheckCircle2, Clock, Loader2, ListTodo } from 'lucide-react';

function StatCard({ icon: Icon, label, count, color, bgColor, dotColor }) {
  return (
    <div className={`flex items-center gap-3 px-4 py-3 rounded-xl border ${bgColor} transition-all duration-200 hover:shadow-sm`}>
      <div className={`p-2 rounded-lg ${color} bg-opacity-10`}>
        <Icon size={16} className={color} />
      </div>
      <div>
        <p className="text-2xl font-bold text-gray-900 dark:text-slate-100 leading-none">
          {count ?? 0}
        </p>
        <p className="text-xs text-gray-500 dark:text-slate-400 mt-0.5">{label}</p>
      </div>
    </div>
  );
}

/**
 * Stats bar showing total, pending, in-progress, and completed counts
 */
export function TaskStats({ stats }) {
  if (!stats) return null;

  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
      <StatCard
        icon={ListTodo}
        label="Total Tasks"
        count={stats.total}
        color="text-indigo-600 dark:text-indigo-400"
        bgColor="bg-indigo-50 dark:bg-indigo-900/20 border-indigo-100 dark:border-indigo-900/50"
      />
      <StatCard
        icon={Clock}
        label="Pending"
        count={stats.pending}
        color="text-amber-600 dark:text-amber-400"
        bgColor="bg-amber-50 dark:bg-amber-900/20 border-amber-100 dark:border-amber-900/50"
      />
      <StatCard
        icon={Loader2}
        label="In Progress"
        count={stats.in_progress}
        color="text-blue-600 dark:text-blue-400"
        bgColor="bg-blue-50 dark:bg-blue-900/20 border-blue-100 dark:border-blue-900/50"
      />
      <StatCard
        icon={CheckCircle2}
        label="Completed"
        count={stats.completed}
        color="text-green-600 dark:text-green-400"
        bgColor="bg-green-50 dark:bg-green-900/20 border-green-100 dark:border-green-900/50"
      />
    </div>
  );
}
