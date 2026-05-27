'use client';

import React, { createContext, useContext, useState, useCallback, useEffect, useRef } from 'react';
import { StorageData, loadData, saveData, getTodayStr, hasLoggedInToday } from '../utils/storage';
import { processDailyLogin, computeStreakInfo, StreakInfo } from '../utils/streak';
import { generateDailyTasks, SuggestedTask, getCompletionPercentage, getCompletedTopicsCount, getTotalTopics } from '../utils/roadmap';
import { syllabus } from '../data/syllabus';

interface AppState {
  data: StorageData;
  streakInfo: StreakInfo;
  dailyTasks: SuggestedTask[];
  completedToday: string[];
  overallProgress: number;
  completedCount: number;
  totalTopics: number;
}

interface AppContextType extends AppState {
  completeTask: (taskId: string) => void;
  uncompleteTask: (taskId: string) => void;
  refreshDailyTasks: () => void;
  markTopicCompleted: (topicId: string) => void;
}

const AppContext = createContext<AppContextType | null>(null);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<AppState>(() => {
    const defaultData: StorageData = {
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
    return {
      data: defaultData,
      streakInfo: computeStreakInfo(defaultData),
      dailyTasks: [],
      completedToday: [],
      overallProgress: 0,
      completedCount: 0,
      totalTopics: getTotalTopics(),
    };
  });

  const initialized = useRef(false);
  const [hydrated, setHydrated] = useState(false);

  // Hydrate from localStorage + process daily login on mount (client only)
  useEffect(() => {
    if (initialized.current) return;
    initialized.current = true;

    const data = loadData();
    const today = getTodayStr();

    let finalData = data;
    if (!hasLoggedInToday(data)) {
      const result = processDailyLogin(data);
      finalData = result.data;
      saveData(finalData);
    }

    // Use stored assigned tasks if available; otherwise generate once and persist
    let dailyTasks = finalData.assignedTasks;
    if (!dailyTasks || dailyTasks.length === 0) {
      dailyTasks = generateDailyTasks(finalData.completedTopics, 5);
      finalData = { ...finalData, assignedTasks: dailyTasks };
      saveData(finalData);
    }

    setState({
      data: finalData,
      streakInfo: computeStreakInfo(finalData),
      dailyTasks,
      completedToday: finalData.tasksCompletedByDate[today] || [],
      overallProgress: getCompletionPercentage(finalData.completedTopics),
      completedCount: getCompletedTopicsCount(finalData.completedTopics),
      totalTopics: getTotalTopics(),
    });

    setHydrated(true);
  }, []);

  // Persist data whenever it changes (only after hydration)
  useEffect(() => {
    if (hydrated) {
      saveData(state.data);
    }
  }, [state.data, hydrated]);


  const completeTask = useCallback((taskId: string) => {
    setState(prev => {
      const today = getTodayStr();
      const completedForToday = [...(prev.data.tasksCompletedByDate[today] || []), taskId];
      const newTasksByDate = { ...prev.data.tasksCompletedByDate, [today]: completedForToday };

      // Find the task's topic and mark it as completed
      const task = prev.dailyTasks.find(t => t.id === taskId);
      const newCompletedTopics = { ...prev.data.completedTopics };
      if (task && !newCompletedTopics[task.topicId]) {
        newCompletedTopics[task.topicId] = true;
      }

      const newData: StorageData = {
        ...prev.data,
        tasksCompletedByDate: newTasksByDate,
        completedTopics: newCompletedTopics,
        totalTasksCompleted: prev.data.totalTasksCompleted + 1,
        assignedTasks: prev.dailyTasks,
      };

      return {
        ...prev,
        data: newData,
        completedToday: completedForToday,
        overallProgress: getCompletionPercentage(newCompletedTopics),
        completedCount: getCompletedTopicsCount(newCompletedTopics),
      };
    });
  }, []);

  const uncompleteTask = useCallback((taskId: string) => {
    setState(prev => {
      const today = getTodayStr();
      const completedForToday = (prev.data.tasksCompletedByDate[today] || []).filter(id => id !== taskId);
      const newTasksByDate = { ...prev.data.tasksCompletedByDate, [today]: completedForToday };

      const task = prev.dailyTasks.find(t => t.id === taskId);
      const newCompletedTopics = { ...prev.data.completedTopics };
      if (task) {
        delete newCompletedTopics[task.topicId];
      }

      const newData: StorageData = {
        ...prev.data,
        tasksCompletedByDate: newTasksByDate,
        completedTopics: newCompletedTopics,
        totalTasksCompleted: Math.max(0, prev.data.totalTasksCompleted - 1),
        assignedTasks: prev.dailyTasks,
      };

      return {
        ...prev,
        data: newData,
        completedToday: completedForToday,
        overallProgress: getCompletionPercentage(newCompletedTopics),
        completedCount: getCompletedTopicsCount(newCompletedTopics),
      };
    });
  }, []);

  const refreshDailyTasks = useCallback(() => {
    setState(prev => {
      const tasks = generateDailyTasks(prev.data.completedTopics, 5);
      const today = getTodayStr();
      const completedToday = prev.data.tasksCompletedByDate[today] || [];
      const newData = { ...prev.data, assignedTasks: tasks };
      saveData(newData);
      return { ...prev, data: newData, dailyTasks: tasks, completedToday };
    });
  }, []);

  const markTopicCompleted = useCallback((topicId: string) => {
    setState(prev => {
      const newCompletedTopics = { ...prev.data.completedTopics, [topicId]: true };
      const newData: StorageData = { ...prev.data, completedTopics: newCompletedTopics };
      return {
        ...prev,
        data: newData,
        overallProgress: getCompletionPercentage(newCompletedTopics),
        completedCount: getCompletedTopicsCount(newCompletedTopics),
      };
    });
  }, []);

  return (
    <AppContext.Provider value={{
      ...state,
      completeTask,
      uncompleteTask,
      refreshDailyTasks,
      markTopicCompleted,
    }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp(): AppContextType {
  const ctx = useContext(AppContext);
  if (!ctx) {
    throw new Error('useApp must be used within AppProvider');
  }
  return ctx;
}
