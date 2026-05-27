import { syllabus, Subject } from '../data/syllabus';

// Generate daily tasks based on incomplete topics
export interface SuggestedTask {
  id: string;
  title: string;
  subjectId: string;
  subjectName: string;
  topicId: string;
  topicName: string;
  difficulty: 'easy' | 'medium' | 'hard';
  estimatedMinutes: number;
  description: string;
}

export function getCompletionPercentage(completedTopics: Record<string, boolean>): number {
  const totalTopics = syllabus.reduce((sum, s) => sum + s.topics.length, 0);
  const completed = Object.keys(completedTopics).filter(k => completedTopics[k]).length;
  return totalTopics > 0 ? Math.round((completed / totalTopics) * 100) : 0;
}

export function getSubjectProgress(subjectId: string, completedTopics: Record<string, boolean>): number {
  const subject = syllabus.find(s => s.id === subjectId);
  if (!subject || subject.topics.length === 0) return 0;
  const completed = subject.topics.filter(t => completedTopics[t.id]).length;
  return Math.round((completed / subject.topics.length) * 100);
}

export function getTotalTopics(): number {
  return syllabus.reduce((sum, s) => sum + s.topics.length, 0);
}

export function getCompletedTopicsCount(completedTopics: Record<string, boolean>): number {
  return Object.keys(completedTopics).filter(k => completedTopics[k]).length;
}

export function getIncompleteTopics(completedTopics: Record<string, boolean>): { subject: Subject; topic: typeof syllabus[0]['topics'][0] }[] {
  const incomplete: { subject: Subject; topic: typeof syllabus[0]['topics'][0] }[] = [];
  for (const subject of syllabus) {
    for (const topic of subject.topics) {
      if (!completedTopics[topic.id]) {
        incomplete.push({ subject, topic });
      }
    }
  }
  return incomplete;
}

export function generateDailyTasks(completedTopics: Record<string, boolean>, count: number = 5): SuggestedTask[] {
  const incomplete = getIncompleteTopics(completedTopics);
  if (incomplete.length === 0) return [];

  // Shuffle and pick
  const shuffled = incomplete.sort(() => Math.random() - 0.5);
  const selected = shuffled.slice(0, Math.min(count, shuffled.length));

  return selected.map((item, i) => ({
    id: `task-${Date.now()}-${i}`,
    title: `Study: ${item.topic.name}`,
    subjectId: item.subject.id,
    subjectName: item.subject.name,
    topicId: item.topic.id,
    topicName: item.topic.name,
    difficulty: (i % 3 === 0 ? 'hard' : i % 3 === 1 ? 'medium' : 'easy') as 'easy' | 'medium' | 'hard',
    estimatedMinutes: 30 + (i * 15),
    description: `Cover ${item.topic.subtopics.slice(0, 3).join(', ')}`,
  }));
}
