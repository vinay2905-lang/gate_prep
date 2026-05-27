'use client';

import { useState } from 'react';
import { useApp } from '../contexts/AppContext';
import { getTodayStr } from '../utils/storage';
import type { SuggestedTask } from '../utils/roadmap';

export default function Tasks() {
  const { dailyTasks, completedToday, completeTask, uncompleteTask, refreshDailyTasks, data } = useApp();
  const [showCompleted, setShowCompleted] = useState(false);

  // Split tasks into completed and pending based on today's completions
  const pendingTasks = dailyTasks.filter(t => !completedToday.includes(t.id));

  const completedTaskObjects = dailyTasks.filter(t => completedToday.includes(t.id));

  const todayTaskCount = completedToday.length;
  const totalAvailable = dailyTasks.length;

  const getDifficultyColor = (diff: string) => {
    switch (diff) {
      case 'easy': return 'from-emerald-500 to-green-600';
      case 'medium': return 'from-amber-500 to-orange-600';
      case 'hard': return 'from-red-500 to-rose-600';
      default: return 'from-gray-500 to-gray-600';
    }
  };

  return (
    <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 border border-gray-700/50 shadow-xl">
      <div className="absolute -top-20 -left-20 w-60 h-60 bg-gradient-to-br from-emerald-500/10 to-teal-500/5 rounded-full blur-3xl" />

      <div className="relative p-4 sm:p-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-5">
          <div>
            <h2 className="text-sm font-semibold uppercase tracking-widest text-gray-400">
              <span className="mr-2">📋</span>Today&apos;s Tasks
            </h2>
            {todayTaskCount > 0 && (
              <p className="text-xs text-gray-500 mt-1">
                {todayTaskCount}/{totalAvailable} completed today
              </p>
            )}
          </div>
          
          <div className="flex items-center gap-2">
            <button
              onClick={refreshDailyTasks}
              className="px-3 py-1.5 text-xs font-medium rounded-lg bg-white/5 border border-gray-700/30 text-gray-300 hover:bg-white/10 hover:border-gray-600/50 transition-all duration-200 flex items-center gap-1.5"
            >
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              Refresh
            </button>
            {completedTaskObjects.length > 0 && (
              <button
                onClick={() => setShowCompleted(!showCompleted)}
                className={`px-3 py-1.5 text-xs font-medium rounded-lg border transition-all duration-200 flex items-center gap-1.5 ${
                  showCompleted
                    ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300'
                    : 'bg-white/5 border-gray-700/30 text-gray-300 hover:bg-white/10'
                }`}
              >
                {showCompleted ? 'Hide' : 'Show'} Completed ({completedTaskObjects.length})
              </button>
            )}
          </div>
        </div>

        {/* Pending Tasks */}
        <div className="space-y-2">
          {pendingTasks.length === 0 && completedTaskObjects.length === 0 && (
            <div className="text-center py-8 sm:py-12">
              <div className="text-4xl mb-3">🎉</div>
              <p className="text-gray-400 text-sm">All topics completed! You&apos;ve mastered the syllabus!</p>
              <button
                onClick={refreshDailyTasks}
                className="mt-3 px-4 py-2 text-sm font-medium rounded-lg bg-gradient-to-r from-violet-500 to-indigo-500 text-white hover:from-violet-600 hover:to-indigo-600 transition-all duration-200"
              >
                Generate Review Tasks
              </button>
            </div>
          )}

          {pendingTasks.length === 0 && completedTaskObjects.length > 0 && (
            <div className="text-center py-6 sm:py-8 bg-gradient-to-b from-emerald-500/5 to-transparent rounded-xl border border-emerald-500/10">
              <div className="text-4xl mb-2">🎯</div>
              <p className="text-emerald-300 font-medium text-sm sm:text-base">All tasks completed for today!</p>
              <p className="text-gray-500 text-xs mt-1">Great progress! Come back tomorrow for new tasks.</p>
            </div>
          )}

          {pendingTasks.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              onComplete={completeTask}
              getDifficultyColor={getDifficultyColor}
            />
          ))}
        </div>

        {/* Completed Tasks */}
        {showCompleted && completedTaskObjects.length > 0 && (
          <div className="mt-4 pt-4 border-t border-gray-700/30">
            <h3 className="text-xs font-medium text-gray-500 mb-3 uppercase tracking-wider">
              Completed ({completedTaskObjects.length})
            </h3>
            <div className="space-y-2">
              {completedTaskObjects.map((task) => (
                <div
                  key={task.id}
                  className="flex items-center gap-3 p-3 rounded-xl bg-emerald-500/5 border border-emerald-500/10 opacity-75 hover:opacity-100 transition-all duration-200"
                >
                  <button
                    onClick={() => uncompleteTask(task.id)}
                    className="flex-shrink-0 w-6 h-6 rounded-lg bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center hover:bg-emerald-500/30 transition-colors"
                  >
                    <svg className="w-3.5 h-3.5 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                    </svg>
                  </button>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-gray-300 line-through">{task.title}</p>
                    <p className="text-xs text-gray-500">{task.subjectName} · {task.estimatedMinutes} min</p>
                  </div>
                  <span className="text-xs text-emerald-500/50">✓ Done</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Progress bar */}
        {totalAvailable > 0 && (
          <div className="mt-4 pt-4 border-t border-gray-700/30">
            <div className="flex justify-between text-xs text-gray-500 mb-1.5">
              <span>Today&apos;s Progress</span>
              <span>{todayTaskCount}/{totalAvailable} tasks</span>
            </div>
            <div className="h-2 bg-gray-700/50 rounded-full overflow-hidden">
              <div
                className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-teal-500 transition-all duration-500"
                style={{ width: `${(todayTaskCount / totalAvailable) * 100}%` }}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function TaskCard({
  task,
  onComplete,
  getDifficultyColor,
}: {
  task: SuggestedTask;
  onComplete: (id: string) => void;
  getDifficultyColor: (d: string) => string;
}) {
  const [isAnimating, setIsAnimating] = useState(false);

  const handleComplete = () => {
    setIsAnimating(true);
    setTimeout(() => {
      onComplete(task.id);
      setIsAnimating(false);
    }, 300);
  };

  return (
    <div
      className={`group relative overflow-hidden rounded-xl border transition-all duration-300 ${
        isAnimating
          ? 'border-emerald-500/30 scale-[0.98] opacity-50'
          : 'border-gray-700/30 hover:border-gray-600/50 hover:bg-gray-800/40'
      } bg-gray-800/20`}
    >
      <div className="p-3 sm:p-4">
        <div className="flex items-start gap-3">
          <button
            onClick={handleComplete}
            disabled

            className="flex-shrink-0 w-6 h-6 rounded-lg bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center hover:bg-emerald-500/30 transition-colors">
              <svg className="w-3.5 h-3.5 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
              </svg>
            </button>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-200 group-hover:text-white transition-colors">{task.title}</p>
              <p className="text-xs text-gray-500 mt-0.5">{task.subjectName} &middot; {task.estimatedMinutes} min</p>
            </div>
            <div className="flex-shrink-0 flex items-center">
              <span className={"text-xs font-medium px-2 py-0.5 rounded-full bg-gradient-to-r " + getDifficultyColor(task.difficulty)}>{task.difficulty}</span>
            </div>
          </div>
        </div>
      </div>
    );
  }