import { SuggestedTask } from './roadmap';

export type StorageData = {
  completedTopics: Record<string, boolean>;
  tasksCompletedByDate: Record<string, string[]>;
  loginDates: string[];
  currentStreak: number;
  bestStreak: number;
  lastActiveDate: string | null;
  recoveryTargetStreak: number;
  recoveryProgress: number;
  isRecovering: boolean;
  lastTaskDate: string | null;
  totalTasksCompleted: number;
  assignedTasks: SuggestedTask[];
};

const STORAGE_KEY = 'gate-prep-data';

export function getDefaultData(): StorageData {
  return {
    completedTopics: {},
    tasksCompletedByDate: {},
    loginDates: [],
    currentStreak: 0,
    bestStreak: 0,
    lastActiveDate: null,
    recoveryTargetStreak: 0,
    recoveryProgress: 0,
    isRecovering: false,
    lastTaskDate: null,
    totalTasksCompleted: 0,
    assignedTasks: [],
  };
}

export function loadData(): StorageData {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return getDefaultData();
    const parsed = JSON.parse(raw);
    return { ...getDefaultData(), ...parsed };
  } catch {
    return getDefaultData();
  }
}

export function saveData(data: StorageData): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch (e) {
    console.error('Failed to save data:', e);
  }
}

// Check if user has logged in today
export function hasLoggedInToday(data: StorageData): boolean {
  const today = getTodayStr();
  return data.loginDates.includes(today);
}

export function getTodayStr(): string {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
}

export function getYesterdayStr(): string {
  const d = new Date();
  d.setDate(d.getDate() - 1);
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
}

export function getDaysBetween(date1: string, date2: string): number {
  const d1 = new Date(date1);
  const d2 = new Date(date2);
  return Math.floor((d2.getTime() - d1.getTime()) / (1000 * 60 * 60 * 24));
}
