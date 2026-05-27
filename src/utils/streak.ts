import { StorageData } from './storage';

export interface StreakInfo {
  currentStreak: number;
  bestStreak: number;
  isRecovering: boolean;
  recoveryProgress: number;
  recoveryTargetStreak: number;
  lastActiveDate: string | null;
  daysUntilRecovery: number;
  status: 'active' | 'broken' | 'recovering' | 'new';
  message: string;
}

export function processDailyLogin(data: StorageData): { data: StorageData; streakInfo: StreakInfo } {
  const today = getTodayStr();
  const yesterday = getYesterdayStr();

  const newData = { ...data };

  // Already logged in today, just return current state
  if (data.loginDates.includes(today)) {
    return { data: newData, streakInfo: computeStreakInfo(data) };
  }

  // Add today to login dates
  newData.loginDates = [...data.loginDates, today].slice(-365); // keep last year

  const lastDate = data.lastActiveDate;

  if (!lastDate) {
    // First ever login
    newData.currentStreak = 1;
    newData.bestStreak = 1;
    newData.isRecovering = false;
    newData.recoveryProgress = 0;
    newData.recoveryTargetStreak = 0;
  } else {
    const daysSince = getDaysBetween(lastDate, today);

    if (daysSince === 0) {
      // Same day, no change
    } else if (daysSince === 1) {
      // Consecutive day
      if (data.isRecovering) {
        // In recovery mode - each consecutive day adds to recovery
        newData.recoveryProgress = data.recoveryProgress + 1;
        if (newData.recoveryProgress >= 3) {
          // Recovery complete! Restore to target
          newData.currentStreak = data.recoveryTargetStreak;
          newData.isRecovering = false;
          newData.recoveryProgress = 0;
          newData.recoveryTargetStreak = 0;
          // Now increment further for today
          newData.currentStreak += 1;
        }
      } else {
        newData.currentStreak = data.currentStreak + 1;
      }
    } else {
      // Streak broken! Enter recovery mode
      newData.isRecovering = true;
      newData.recoveryTargetStreak = data.currentStreak;
      newData.recoveryProgress = 1; // Today counts as day 1 of recovery
      // currentStreak goes to 0 visually but we track the target
      newData.currentStreak = 0;
    }

    // Update best streak
    const effectiveStreak = newData.isRecovering
      ? data.bestStreak
      : Math.max(data.bestStreak, newData.currentStreak);
    newData.bestStreak = effectiveStreak;
  }

  newData.lastActiveDate = today;

  return { data: newData, streakInfo: computeStreakInfo(newData) };
}

export function computeStreakInfo(data: StorageData): StreakInfo {
  const today = getTodayStr();
  const yesterday = getYesterdayStr();
  const lastDate = data.lastActiveDate;

  let status: StreakInfo['status'] = 'new';
  let message = '';

  if (!lastDate) {
    status = 'new';
    message = 'Start your journey today!';
  } else if (data.isRecovering) {
    status = 'recovering';
    const daysLeft = 3 - data.recoveryProgress;
    message = `Recovering your streak of ${data.recoveryTargetStreak}! ${daysLeft} more day${daysLeft > 1 ? 's' : ''} to go.`;
  } else if (data.currentStreak > 0) {
    // Check if last active was yesterday or today
    if (lastDate === today || lastDate === yesterday) {
      status = 'active';
      message = `You're on a ${data.currentStreak}-day streak! Keep going! 🔥`;
    } else {
      status = 'broken';
      message = `Streak was broken ${getDaysBetween(lastDate, today)} day${getDaysBetween(lastDate, today) > 1 ? 's' : ''} ago. Log in to start recovery!`;
    }
  } else {
    status = 'broken';
    message = 'Your streak was broken. Complete tasks for 3 days to recover it!';
  }

  return {
    currentStreak: data.currentStreak,
    bestStreak: data.bestStreak,
    isRecovering: data.isRecovering,
    recoveryProgress: data.recoveryProgress,
    recoveryTargetStreak: data.recoveryTargetStreak,
    lastActiveDate: data.lastActiveDate,
    daysUntilRecovery: data.isRecovering ? 3 - data.recoveryProgress : 0,
    status,
    message,
  };
}

function getYesterdayStr(): string {
  const d = new Date();
  d.setDate(d.getDate() - 1);
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
}

function getTodayStr(): string {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
}

function getDaysBetween(date1: string, date2: string): number {
  const d1 = new Date(date1);
  const d2 = new Date(date2);
  return Math.floor((d2.getTime() - d1.getTime()) / (1000 * 60 * 60 * 24));
}
