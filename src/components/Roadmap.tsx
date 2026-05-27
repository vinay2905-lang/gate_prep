'use client';

import { useState } from 'react';
import { useApp } from '../contexts/AppContext';
import { syllabus } from '../data/syllabus';
import { getSubjectProgress } from '../utils/roadmap';

function SubjectCard({ subject }: { subject: typeof syllabus[0] }) {
  const { data: { completedTopics }, markTopicCompleted } = useApp();
  const [expanded, setExpanded] = useState(false);
  const progress = getSubjectProgress(subject.id, completedTopics);
  const completedCount = subject.topics.filter(t => completedTopics[t.id]).length;

  return (
    <div className="rounded-xl border border-gray-700/30 overflow-hidden transition-all duration-300 hover:border-gray-600/50">
      {/* Subject Header */}
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full flex items-center gap-3 sm:gap-4 p-3 sm:p-4 bg-gradient-to-r from-gray-800/80 to-gray-800/40 hover:from-gray-750 hover:to-gray-750/60 transition-all duration-200 text-left"
      >
        <div
          className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center text-xl sm:text-2xl shadow-lg"
          style={{ backgroundColor: `${subject.color}20` }}
        >
          {subject.icon}
        </div>
        
        <div className="flex-1 min-w-0">
          <h3 className="text-sm sm:text-base font-semibold text-white truncate">{subject.name}</h3>
          <div className="flex items-center gap-2 mt-1">
            <div className="flex-1 h-1.5 bg-gray-700/50 rounded-full overflow-hidden max-w-[120px]">
              <div
                className="h-full rounded-full transition-all duration-700"
                style={{ width: `${progress}%`, background: `linear-gradient(90deg, ${subject.gradientFrom}, ${subject.gradientTo})` }}
              />
            </div>
            <span className="text-xs text-gray-400 font-medium">{completedCount}/{subject.topics.length}</span>
          </div>
        </div>

        <svg
          className={`w-4 h-4 sm:w-5 sm:h-5 text-gray-500 transition-transform duration-300 ${expanded ? 'rotate-180' : ''}`}
          fill="none" stroke="currentColor" viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {/* Topics */}
      <div className={`overflow-hidden transition-all duration-300 ${expanded ? 'max-h-[800px] opacity-100' : 'max-h-0 opacity-0'}`}>
        <div className="p-3 sm:p-4 space-y-2 bg-gray-900/50">
          {subject.topics.map((topic) => {
            const isCompleted = completedTopics[topic.id];
            return (
              <div
                key={topic.id}
                className={`flex items-center gap-3 p-2.5 sm:p-3 rounded-lg transition-all duration-200 ${
                  isCompleted
                    ? 'bg-emerald-500/5 border border-emerald-500/10'
                    : 'bg-gray-800/30 border border-gray-700/20 hover:bg-gray-800/50'
                }`}
              >
                <button
                  onClick={() => markTopicCompleted(topic.id)}
                  className={`flex-shrink-0 w-5 h-5 sm:w-6 sm:h-6 rounded-lg border-2 flex items-center justify-center transition-all duration-200 ${
                    isCompleted
                      ? 'bg-emerald-500 border-emerald-500 text-white scale-100'
                      : 'border-gray-600 hover:border-gray-500'
                  }`}
                >
                  {isCompleted && (
                    <svg className="w-3 h-3 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  )}
                </button>
                <div className="flex-1 min-w-0">
                  <span className={`text-sm sm:text-base font-medium ${isCompleted ? 'text-emerald-300' : 'text-gray-200'}`}>
                    {topic.name}
                  </span>
                  <span className={`ml-2 text-xs px-1.5 py-0.5 rounded-full ${
                    topic.weightage >= 5
                      ? 'bg-red-500/10 text-red-400'
                      : topic.weightage >= 3
                      ? 'bg-amber-500/10 text-amber-400'
                      : 'bg-blue-500/10 text-blue-400'
                  }`}>
                    {topic.weightage}%
                  </span>
                </div>
                {isCompleted && (
                  <span className="text-xs text-emerald-400/60 font-medium">Done</span>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default function Roadmap() {
  const { overallProgress, completedCount, totalTopics } = useApp();

  return (
    <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 border border-gray-700/50 shadow-xl">
      <div className="absolute -top-20 -right-20 w-60 h-60 bg-gradient-to-br from-violet-500/10 to-indigo-500/5 rounded-full blur-3xl" />

      <div className="relative p-4 sm:p-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-5">
          <h2 className="text-sm font-semibold uppercase tracking-widest text-gray-400">
            <span className="mr-2">🗺️</span>Study Roadmap
          </h2>
          
          <div className="flex items-center gap-3">
            <div className="flex-1 sm:w-48">
              <div className="flex justify-between text-xs text-gray-500 mb-1">
                <span>Overall Progress</span>
                <span className="text-gray-300 font-medium">{overallProgress}%</span>
              </div>
              <div className="h-2 bg-gray-700/50 rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-violet-500 via-indigo-500 to-blue-500 transition-all duration-700"
                  style={{ width: `${overallProgress}%` }}
                />
              </div>
            </div>
            <span className="text-xs text-gray-500 whitespace-nowrap">{completedCount}/{totalTopics} topics</span>
          </div>
        </div>

        {/* Subjects List */}
        <div className="space-y-2 sm:space-y-3">
          {syllabus.map((subject) => (
            <SubjectCard key={subject.id} subject={subject} />
          ))}
        </div>

        {/* Legend */}
        <div className="flex flex-wrap gap-3 mt-4 pt-4 border-t border-gray-700/30">
          <div className="text-xs text-gray-500">Weightage:</div>
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-red-500/60" />
            <span className="text-xs text-gray-400">High (≥5%)</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-amber-500/60" />
            <span className="text-xs text-gray-400">Medium (3-4%)</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-blue-500/60" />
            <span className="text-xs text-gray-400">Low (&lt;3%)</span>
          </div>
        </div>
      </div>
    </div>
  );
}
