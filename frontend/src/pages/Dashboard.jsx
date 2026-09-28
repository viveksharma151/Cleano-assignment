import { useState } from 'react';
import toast from 'react-hot-toast';
import { Plus, ClipboardList, Trash2 } from 'lucide-react';

import { useTasks } from '../hooks/useTasks';
import { TaskCard } from '../components/tasks/TaskCard';
import { TaskStats } from '../components/tasks/TaskStats';
import { TaskFilters } from '../components/tasks/TaskFilters';
import { TaskModal } from '../components/tasks/TaskModal';
import { TaskDetailModal } from '../components/tasks/TaskDetailModal';
import { Pagination } from '../components/tasks/Pagination';
import { Button } from '../components/ui/Button';
import { SpinnerOverlay } from '../components/ui/Spinner';
import { EmptyState } from '../components/ui/EmptyState';
import { ErrorState } from '../components/ui/ErrorState';
import { Modal } from '../components/ui/Modal';

export function Dashboard() {
  const {
    tasks,
    loading,
    error,
    stats,
    pagination,
    filters,
    fetchTasks,
    createTask,
    updateTask,
    deleteTask,
    setFilters,
  } = useTasks();

  // Modal states
  const [taskModalOpen, setTaskModalOpen] = useState(false);
  const [detailModalOpen, setDetailModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const [taskToDelete, setTaskToDelete] = useState(null);
  const [formLoading, setFormLoading] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);

  // ── Handlers ──────────────────────────────────────────────────────────────

  const handleOpenCreate = () => {
    setSelectedTask(null);
    setTaskModalOpen(true);
  };

  const handleOpenEdit = (task) => {
    setSelectedTask(task);
    setTaskModalOpen(true);
  };

  const handleOpenView = (task) => {
    setSelectedTask(task);
    setDetailModalOpen(true);
  };

  const handleOpenDelete = (task) => {
    setTaskToDelete(task);
    setDeleteModalOpen(true);
  };

  const handleFormSubmit = async (formData) => {
    setFormLoading(true);
    try {
      if (selectedTask) {
        await updateTask(selectedTask.id, formData);
        toast.success('Task updated successfully!');
      } else {
        await createTask(formData);
        toast.success('Task created successfully!');
      }
      setTaskModalOpen(false);
      setSelectedTask(null);
    } catch (err) {
      toast.error(err.message || 'Failed to save task');
    } finally {
      setFormLoading(false);
    }
  };

  const handleConfirmDelete = async () => {
    if (!taskToDelete) return;
    setDeleteLoading(true);
    try {
      await deleteTask(taskToDelete.id);
      toast.success('Task deleted successfully!');
      setDeleteModalOpen(false);
      setTaskToDelete(null);
    } catch (err) {
      toast.error(err.message || 'Failed to delete task');
    } finally {
      setDeleteLoading(false);
    }
  };

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };

  const handlePageChange = (newPage) => {
    setFilters({ page: newPage });
  };

  // ── Render ─────────────────────────────────────────────────────────────────

  return (
    <div className="flex flex-col gap-6">
      {/* Page header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-slate-100">
            My Tasks
          </h1>
          <p className="text-sm text-gray-500 dark:text-slate-400 mt-0.5">
            Manage and track all your tasks in one place
          </p>
        </div>
        <Button variant="primary" size="md" onClick={handleOpenCreate} className="hidden sm:flex">
          <Plus size={18} />
          New Task
        </Button>
      </div>

      {/* Stats */}
      <TaskStats stats={stats} />

      {/* Filters */}
      <TaskFilters filters={filters} onFilterChange={handleFilterChange} />

      {/* Content area */}
      {loading ? (
        <SpinnerOverlay message="Loading tasks..." />
      ) : error ? (
        <ErrorState message={error} onRetry={fetchTasks} />
      ) : tasks.length === 0 ? (
        <EmptyState
          icon={ClipboardList}
          title={
            filters.search || filters.status || filters.priority
              ? 'No tasks match your filters'
              : 'No tasks yet'
          }
          description={
            filters.search || filters.status || filters.priority
              ? 'Try clearing some filters to see more tasks.'
              : 'Create your first task to get started!'
          }
          actionLabel={
            filters.search || filters.status || filters.priority
              ? undefined
              : 'Create First Task'
          }
          onAction={handleOpenCreate}
        />
      ) : (
        <>
          {/* Task grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {tasks.map((task) => (
              <TaskCard
                key={task._id}
                task={task}
                onView={handleOpenView}
                onEdit={handleOpenEdit}
                onDelete={handleOpenDelete}
              />
            ))}
          </div>

          {/* Pagination */}
          <Pagination
            page={pagination.page}
            totalPages={pagination.totalPages}
            total={pagination.total}
            limit={pagination.limit}
            onPageChange={handlePageChange}
          />
        </>
      )}

      {/* Floating Action Button (mobile) */}
      <button
        onClick={handleOpenCreate}
        className="fixed bottom-6 right-6 sm:hidden flex items-center justify-center w-14 h-14 bg-indigo-600 hover:bg-indigo-700 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-200 z-30 active:scale-95"
        aria-label="Create new task"
      >
        <Plus size={26} />
      </button>

      {/* Task Create/Edit Modal */}
      <TaskModal
        isOpen={taskModalOpen}
        onClose={() => { setTaskModalOpen(false); setSelectedTask(null); }}
        task={selectedTask}
        onSubmit={handleFormSubmit}
        isLoading={formLoading}
      />

      {/* Task Detail Modal */}
      <TaskDetailModal
        isOpen={detailModalOpen}
        onClose={() => { setDetailModalOpen(false); setSelectedTask(null); }}
        task={selectedTask}
        onEdit={handleOpenEdit}
      />

      {/* Delete Confirmation Modal */}
      <Modal
        isOpen={deleteModalOpen}
        onClose={() => { setDeleteModalOpen(false); setTaskToDelete(null); }}
        title="Delete Task"
        maxWidth="max-w-md"
        footer={
          <>
            <Button
              variant="secondary"
              onClick={() => { setDeleteModalOpen(false); setTaskToDelete(null); }}
              disabled={deleteLoading}
            >
              Cancel
            </Button>
            <Button
              variant="danger"
              onClick={handleConfirmDelete}
              loading={deleteLoading}
            >
              <Trash2 size={16} />
              Delete Task
            </Button>
          </>
        }
      >
        <div className="flex flex-col gap-3">
          <div className="flex items-center justify-center w-14 h-14 rounded-full bg-red-50 dark:bg-red-900/20 mx-auto">
            <Trash2 size={26} className="text-red-500" />
          </div>
          <p className="text-center text-gray-700 dark:text-slate-300">
            Are you sure you want to delete{' '}
            <span className="font-semibold text-gray-900 dark:text-slate-100">
              &quot;{taskToDelete?.title}&quot;
            </span>
            ?
          </p>
          <p className="text-center text-sm text-gray-500 dark:text-slate-400">
            This action cannot be undone.
          </p>
        </div>
      </Modal>
    </div>
  );
}
