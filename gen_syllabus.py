import os

BASE = '/c/Users/kj583/gate-prep-app'

def w(r, c):
    p = os.path.join(BASE, r)
    os.makedirs(os.path.dirname(p), exist_ok=True)
    with open(p, 'w', encoding='utf-8') as f:
        f.write(c)
    print(f'OK: {r} ({len(c)} chars)')

interfaces = '''export interface Topic {
  id: string;
  name: string;
  weightage: number;
  subtopics: string[];
}

export interface Subject {
  id: string;
  name: string;
  icon: string;
  color: string;
  gradientFrom: string;
  gradientTo: string;
  topics: Topic[];
}

'''

w('src/data/syllabus.ts', interfaces)
print('Interfaces written')
