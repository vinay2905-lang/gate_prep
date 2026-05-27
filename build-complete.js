const fs = require('fs');
const path = require('path');

const BASE = '/c/Users/kj583/gate-prep-app';

function writeFile(relPath, content) {
  const fullPath = path.join(BASE, relPath);
  fs.mkdirSync(path.dirname(fullPath), { recursive: true });
  fs.writeFileSync(fullPath, content, 'utf-8');
  console.log('WRITTEN:', relPath, `(${content.length} chars)`);
}

// ====== COMPLETE SYLLABUS ======
writeFile('src/data/syllabus.ts', `export interface Topic {
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

export const syllabus: Subject[] = [
  {
    id: 'general-aptitude',
    name: 'General Aptitude',
    icon: '\uD83E\uDDE0',
    color: '#8B5CF6',
    gradientFrom: '#8B5CF6',
    gradientTo: '#6D28D9',
    topics: [
      { id: 'ga-verbal', name: 'Verbal Ability', weightage: 5, subtopics: ['English grammar', 'Sentence completion', 'Synonyms & Antonyms', 'Reading comprehension'] },
      { id: 'ga-numerical', name: 'Numerical Ability', weightage: 5, subtopics: ['Numerical reasoning', 'Data interpretation', 'Arithmetic', 'Percentage & averages'] },
      { id: 'ga-spatial', name: 'Spatial & Analytical', weightage: 5, subtopics: ['Spatial visualization', 'Analytical reasoning', 'Logical deduction', 'Pattern recognition'] },
    ],
  },
  {
    id: 'engineering-maths',
    name: 'Engineering Mathematics',
    icon: '\uD83D\uDCD0',
    color: '#EC4899',
    gradientFrom: '#EC4899',
    gradientTo: '#BE185D',
    topics: [
      { id: 'em-linear-algebra', name: 'Linear Algebra', weightage: 7, subtopics: ['Matrices', 'Eigen values & vectors', 'Systems of equations', 'Vector spaces'] },
      { id: 'em-calculus', name: 'Calculus', weightage: 8, subtopics: ['Limits & continuity', 'Differentiation', 'Integration', 'Differential equations', 'Partial derivatives'] },
      { id: 'em-discrete', name: 'Discrete Mathematics', weightage: 7, subtopics: ['Set theory', 'Combinatorics', 'Graph theory', 'Mathematical logic', 'Group theory'] },
      { id: 'em-probability', name: 'Probability & Statistics', weightage: 8, subtopics: ['Random variables', 'Probability distributions', 'Correlation & regression', 'Hypothesis testing'] },
    ],
  },
  {
    id: 'digital-logic',
    name: 'Digital Logic',
    icon: '\uD83D\uDD22',
    color: '#F59E0B',
    gradientFrom: '#F59E0B',
    gradientTo: '#D97706',
    topics: [
      { id: 'dl-boolean', name: 'Boolean Algebra', weightage: 3, subtopics: ['Boolean functions', 'Simplification (K-Map)', 'Logic gates', 'Minterms & Maxterms'] },
      { id: 'dl-sequential', name: 'Sequential Circuits', weightage: 3, subtopics: ['Flip-flops', 'Counters', 'Registers', 'FSM design'] },
      { id: 'dl-combinational', name: 'Combinational Circuits', weightage: 2, subtopics: ['Multiplexers', 'Decoders', 'Adders', 'ALUs'] },
      { id: 'dl-memory', name: 'Memory & PLDs', weightage: 2, subtopics: ['ROM & RAM', 'PLA & PAL', 'Memory hierarchy', 'Cache basics'] },
    ],
  },
  {
    id: 'coa',
    name: 'Computer Organization & Architecture',
    icon: '\uD83D\uDCBB',
    color: '#10B981',
    gradientFrom: '#10B981',
    gradientTo: '#047857',
    topics: [
      { id: 'coa-data-path', name: 'Data Path & Control', weightage: 4, subtopics: ['ALU design', 'Control unit (hardwired/micro)', 'Pipelining', 'Hazards'] },
      { id: 'coa-memory', name: 'Memory Systems', weightage: 4, subtopics: ['Cache memory', 'Virtual memory', 'Page replacement', 'Memory hierarchy'] },
      { id: 'coa-io', name: 'I/O & Interfacing', weightage: 2, subtopics: ['I/O modes', 'Interrupts', 'DMA', 'Bus arbitration'] },
      { id: 'coa-processor', name: 'Processor Design', weightage: 3, subtopics: ['Instruction formats', 'Addressing modes', 'RISC vs CISC', 'Superscalar'] },
    ],
  },
  {
    id: 'programming',
    name: 'Programming & Data Structures',
    icon: '\u26A1',
    color: '#3B82F6',
    gradientFrom: '#3B82F6',
    gradientTo: '#1D4ED8',
    topics: [
      { id: 'pds-c', name: 'C Programming', weightage: 5, subtopics: ['Data types', 'Control structures', 'Functions & recursion', 'Pointers', 'Structures & unions'] },
      { id: 'pds-arrays', name: 'Arrays & Strings', weightage: 3, subtopics: ['Array operations', 'Multi-dimensional arrays', 'String manipulation', 'Matrix operations'] },
      { id: 'pds-ll', name: 'Linked Lists', weightage: 4, subtopics: ['Singly & doubly linked lists', 'Circular lists', 'Operations on lists', 'Application of linked lists'] },
      { id: 'pds-stack-queue', name: 'Stacks & Queues', weightage: 3, subtopics: ['Stack operations', 'Queue operations', 'Circular queue', 'Deque', 'Applications'] },
      { id: 'pds-trees', name: 'Trees', weightage: 5, subtopics: ['Binary trees', 'BST', 'AVL trees', 'Tree traversals', 'Heap'] },
      { id: 'pds-graphs', name: 'Graphs', weightage: 3, subtopics: ['Graph representations', 'BFS & DFS', 'Applications'] },
    ],
  },
  {
    id: 'algorithms',
    name: 'Algorithms',
    icon: '\uD83D\uDD0D',
    color: '#EF4444',
    gradientFrom: '#EF4444',
    gradientTo: '#B91C1C',
    topics: [
      { id: 'alg-sorting', name: 'Sorting & Searching', weightage: 5, subtopics: ['Comparison-based sorts', 'Linear sorts', 'Binary search', 'Interpolation search'] },
      { id: 'alg-dp', name: 'Dynamic Programming', weightage: 6, subtopics: ['Optimal substructure', 'Memoization', '0/1 Knapsack', 'LCS', 'Matrix chain'] },
      { id: 'alg-greedy', name: 'Greedy Algorithms', weightage: 3, subtopics: ['Fractional knapsack', 'Huffman coding', 'Minimum spanning trees', 'Job sequencing'] },
      { id: 'alg-graph', name: 'Graph Algorithms', weightage: 5, subtopics: ['Shortest paths', 'MST', 'Topological sort', 'Strongly connected components'] },
      { id: 'alg-complexity', name: 'Complexity Analysis', weightage: 3, subtopics: ['Time & space complexity', 'Master theorem', 'P vs NP', 'Recurrence relations'] },
    ],
  },
  {
    id: 'toc',
    name: 'Theory of Computation',
    icon: '\uD83D\uDCDD',
    color: '#14B8A6',
    gradientFrom: '#14B8A6',
    gradientTo: '#0F766E',
    topics: [
      { id: 'toc-automata', name: 'Finite Automata', weightage: 3, subtopics: ['DFA & NFA', 'Regular expressions', 'Closure properties', 'Minimization'] },
      { id: 'toc-cfg', name: 'Context-Free Grammars', weightage: 3, subtopics: ['CFG & PDA', 'Derivation & ambiguity', 'Normal forms', 'CYK algorithm'] },
      { id: 'toc-turing', name: 'Turing Machines', weightage: 3, subtopics: ['TM design', 'Variants of TM', 'Undecidability', 'Halting problem'] },
      { id: 'toc-complexity', name: 'Complexity Classes', weightage: 2, subtopics: ['P, NP, NPC', 'Reductions', 'Cook-Levin theorem', 'Approximation'] },
    ],
  },
  {
    id: 'compiler',
    name: 'Compiler Design',
    icon: '\uD83D\uDD27',
    color: '#F97316',
    gradientFrom: '#F97316',
    gradientTo: '#EA580C',
    topics: [
      { id: 'cd-lexical', name: 'Lexical Analysis', weightage: 2, subtopics: ['Tokens & patterns', 'Lex & Flex', 'Regular expressions to NFA', 'DFA minimization'] },
      { id: 'cd-parsing', name: 'Parsing Techniques', weightage: 3, subtopics: ['Top-down parsing', 'Bottom-up parsing', 'LR parsers', 'Syntax trees'] },
      { id: 'cd-syntax', name: 'Syntax-Directed Translation', weightage: 2, subtopics: ['SDD & SDT', 'Attribute grammars', 'Intermediate code', 'Three-address code'] },
      { id: 'cd-optimization', name: 'Code Optimization', weightage: 2, subtopics: ['Basic blocks', 'Flow graphs', 'Local & global optimization', 'Loop optimization'] },
    ],
  },
  {
    id: 'os',
    name: 'Operating Systems',
    icon: '\u2699\uFE0F',
    color: '#6366F1',
    gradientFrom: '#6366F1',
    gradientTo: '#4338CA',
    topics: [
      { id: 'os-process', name: 'Process Management', weightage: 5, subtopics: ['Process states', 'Scheduling algorithms', 'IPC', 'Synchronization'] },
      { id: 'os-memory', name: 'Memory Management', weightage: 4, subtopics: ['Paging & segmentation', 'Vir
