'use client';

import { useApp } from '../contexts/AppContext';

export default function StreakDisplay() {
  const { streakInfo } = useApp();

  const getStatusColor = () => {
    switch (streakInfo.status) {
      case 'active': return 'from-emerald-500 to-green-600';
      case 'recovering': return 'from-amber-500 to-orange-600';
      case 'broken': return 'from-red-500 to-rose-600';
      case 'new': return 'from-blue-500 to-indigo-600';
    }
  };

  const getStatusIcon = () => {
    switch (streakInfo.status) {
      case 'active': return '🔥';
      case 'recovering': return '🔄';
      case 'broken': return '💔';
      case 'new': return '🚀';
    }
  };

  return (
    <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 border border-gray-700/50 shadow-xl">
      {/* Decorative elements */}
      <div className="absolute -top-10 -right-10 w-40 h-40 bg-gradient-to-br from-amber-500/10 to-orange-500/5 rounded-full blur-3xl" />
      <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-gradient-to-br from-violet-500/10 to-purple-500/5 rounded-full blur-3xl" />

      <div className="relative p-4 sm:p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-sm font-semibold uppercase tracking-widest text-gray-400">
            <span className="mr-2">📊</span>Your Streak
          </h2>
          <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-gradient-to-r ${getStatusColor()} text-white`}>
            {getStatusIcon()}
            {streakInfo.status === 'active' ? 'Active' : streakInfo.status === 'recovering' ? 'Recovering' : streakInfo.status === 'broken' ? 'Broken' : 'New'}
          </span>
        </div>

        <div className="grid grid-cols-3 gap-3 sm:gap-4 mb-4">
          <div className="text-center p-3 sm:p-4 rounded-xl bg-white/5 border border-gray-700/30">
            <div className="text-2xl sm:text-4xl font-extrabold text-white mb-1">
              {streakInfo.currentStreak}
            </div>
            <div className="text-xs text-gray-400">Current</div>
          </div>
          <div className="text-center p-3 sm:p-4 rounded-xl bg-white/5 border border-gray-700/30">
            <div className="text-2xl sm:text-4xl font-extrabold text-amber-400 mb-1">
              {streakInfo.bestStreak}
            </div>
            <div className="text-xs text-gray-400">Best</div>
          </div>
          <div className="text-center p-3 sm:p-4 rounded-xl bg-white/5 border border-gray-700/30">
            <div className="text-2xl sm:text-4xl font-extrabold text-emerald-400 mb-1">
              {streakInfo.isRecovering ? `${streakInfo.recoveryProgress}/3` : streakInfo.status === 'active' ? '✓' : '0'}
            </div>
            <div className="text-xs text-gray-400">{streakInfo.isRecovering ? 'Recovery' : streakInfo.status === 'active' ? 'On Track' : 'Progress'}</div>
          </div>
        </div>

        {/* Message */}
        <div className={`p-3 rounded-xl text-sm ${
          streakInfo.status === 'active'
            ? 'bg-emerald-500/10 text-emerald-300 border border-emerald-500/20'
            : streakInfo.status === 'recovering'
            ? 'bg-amber-500/10 text-amber-300 border border-amber-500/20'
            : streakInfo.status === 'broken'
            ? 'bg-red-500/10 text-red-300 border border-red-500/20'
            : 'bg-blue-500/10 text-blue-300 border border-blue-500/20'
        }`}>
          {streakInfo.message}
        </div>

        {/* Recovery progress bar */}
        {streakInfo.isRecovering && (
          <div className="mt-3">
            <div className="flex justify-between text-xs text-gray-500 mb-1">
              <span>Recovery Progress</span>
              <span>{streakInfo.recoveryProgress}/3 days</span>
            </div>
            <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-amber-500 to-orange-500 rounded-full transition-all duration-500"
                style={{ width: `${(streakInfo.recoveryProgress / 3) * 100}%` }}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
