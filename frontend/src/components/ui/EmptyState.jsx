import { Button } from './Button';

/**
 * Empty state component with icon, title, description, and optional action
 */
export function EmptyState({ icon: Icon, title, description, actionLabel, onAction }) {
  return (
    <div className="flex flex-col items-center justify-center py-20 px-4 text-center">
      {Icon && (
        <div className="mb-4 p-4 rounded-full bg-gray-100 dark:bg-slate-800">
          <Icon size={40} className="text-gray-400 dark:text-slate-500" />
        </div>
      )}
      <h3 className="text-lg font-semibold text-gray-800 dark:text-slate-200 mb-2">{title}</h3>
      {description && (
        <p className="text-sm text-gray-500 dark:text-slate-400 max-w-sm mb-6">{description}</p>
      )}
      {actionLabel && onAction && (
        <Button onClick={onAction} variant="primary">
          {actionLabel}
        </Button>
      )}
    </div>
  );
}
