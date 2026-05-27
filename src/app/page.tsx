'use client';

import { AppProvider, useApp } from '../contexts/AppContext';
import Header from '../components/Header';
import StreakDisplay from '../components/StreakDisplay';
import Roadmap from '../components/Roadmap';
import Tasks from '../components/Tasks';

function DashboardContent() {
  const { streakInfo, overallProgress, completedCount, totalTopics } = useApp();

  return (
    <div className="min-h-screen bg-gray-950">
      {/* Ambient background */}
      <div className="fixed inset-0 bg-gradient-to-b from-gray-950 via-gray-900 to-gray-950 pointer-events-none" />
      <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-violet-500/5 via-transparent to-transparent pointer-events-none" />

      <Header />

      <main className="relative px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        <div className="max-w-7xl mx-auto">
          {/* Quick Stats */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mb-6 sm:mb-8">
            <StatCard
              icon="📊"
              label="Overall Progress"
              value={`${overallProgress}%`}
              subtext={`${completedCount}/${totalTopics} topics`}
              gradient="from-violet-500/20 to-indigo-500/10"
            />
            <StatCard
              icon="🔥"
              label="Current Streak"
              value={`${streakInfo.currentStreak}`}
              subtext={streakInfo.isRecovering ? 'Recovering...' : streakInfo.currentStreak > 0 ? 'days' : 'Start today!'}
              gradient="from-orange-500/20 to-amber-500/10"
            />
            <StatCard
              icon="🏆"
              label="Best Streak"
              value={`${streakInfo.bestStreak}`}
              subtext="days"
              gradient="from-yellow-500/20 to-amber-500/10"
            />
            <StatCard
              icon="🎯"
              label="Status"
              value={streakInfo.status === 'active' ? 'On Track' : streakInfo.status === 'recovering' ? 'Recovering' : streakInfo.status === 'broken' ? 'Off Track' : 'Started'}
              subtext={streakInfo.status}
              gradient="from-emerald-500/20 to-teal-500/10"
            />
          </div>

          {/* Main Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
            {/* Left Column - Streak & Tasks */}
            <div className="lg:col-span-1 space-y-6">
              <StreakDisplay />
              
              {/* Quick Tip */}
              <div className="rounded-2xl bg-gradient-to-br from-indigo-500/10 to-purple-500/5 border border-indigo-500/20 p-4 sm:p-6">
                <h3 className="text-sm font-semibold text-indigo-300 mb-2">💡 Quick Tip</h3>
                <p className="text-xs sm:text-sm text-gray-400 leading-relaxed">
                  Consistency is key! Complete at least 3 tasks daily to maintain your streak.
                  Review completed topics weekly to reinforce your learning.
                </p>
              </div>
            </div>

            {/* Right Column - Roadmap & Tasks */}
            <div className="lg:col-span-2 space-y-6">
              <Tasks />
              <Roadmap />
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="relative px-4 sm:px-6 lg:px-8 py-6 border-t border-gray-800/50 mt-8">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="text-xs text-gray-600">GATE Prep · Build consistency, ace the exam 🚀</p>
          <p className="text-xs text-gray-700">Data stored locally on your device</p>
        </div>
      </footer>
    </div>
  );
}

function StatCard({ icon, label, value, subtext, gradient }: {
  icon: string;
  label: string;
  value: string;
  subtext: string;
  gradient: string;
}) {
  return (
    <div className={`relative overflow-hidden rounded-xl bg-gradient-to-br ${gradient} border border-gray-700/30 p-3 sm:p-4`}>
      <div className="relative">
        <div className="text-xl sm:text-2xl mb-1">{icon}</div>
        <div suppressHydrationWarning className="text-lg sm:text-2xl font-bold text-white">{value}</div>
        <div className="text-xs text-gray-400 mt-0.5">{label}</div>
        <div suppressHydrationWarning className="text-xs text-gray-500">{subtext}</div>
      </div>
    </div>
  );
}

export default function Home() {
  return (
    <AppProvider>
      <DashboardContent />
    </AppProvider>
  );
}
