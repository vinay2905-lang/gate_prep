export interface Topic {
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
    id: "engineering-maths",
    name: "Engineering Mathematics",
    icon: "📐",
    color: "#EC4899",
    gradientFrom: "#EC4899",
    gradientTo: "#BE185D",
    topics: [
      { id: "em-linear-algebra", name: "Linear Algebra", weightage: 7, subtopics: ["Matrices", "Eigen values & vectors", "Systems of equations", "Vector spaces"] },
      { id: "em-calculus", name: "Calculus", weightage: 8, subtopics: ["Limits & continuity", "Differentiation", "Integration", "Differential equations", "Partial derivatives"] },
      { id: "em-discrete", name: "Discrete Mathematics", weightage: 7, subtopics: ["Set theory", "Combinatorics", "Graph theory", "Mathematical logic", "Group theory"] },
      { id: "em-probability", name: "Probability & Statistics", weightage: 8, subtopics: ["Random variables", "Probability distributions", "Correlation & regression", "Hypothesis testing"] },
    ],
  },
  {
    id: "general-aptitude",
    name: "General Aptitude",
    icon: "🧠",
    color: "#8B5CF6",
    gradientFrom: "#8B5CF6",
    gradientTo: "#6D28D9",
    topics: [
      { id: "ga-verbal", name: "Verbal Ability", weightage: 5, subtopics: ["English grammar", "Sentence completion", "Synonyms & Antonyms", "Reading comprehension"] },
      { id: "ga-numerical", name: "Numerical Ability", weightage: 5, subtopics: ["Numerical reasoning", "Data interpretation", "Arithmetic", "Percentage & averages"] },
      { id: "ga-spatial", name: "Spatial & Analytical", weightage: 5, subtopics: ["Spatial visualization", "Analytical reasoning", "Logical deduction", "Pattern recognition"] },
    ],
  },
  {
    id: "digital-logic",
    name: "Digital Logic",
    icon: "🔢",
    color: "#F59E0B",
    gradientFrom: "#F59E0B",
    gradientTo: "#D97706",
    topics: [
      { id: "dl-boolean", name: "Boolean Algebra", weightage: 3, subtopics: ["Boolean functions", "Simplification (K-Map)", "Logic gates", "Minterms & Maxterms"] },
      { id: "dl-sequential", name: "Sequential Circuits", weightage: 3, subtopics: ["Flip-flops", "Counters", "Registers", "FSM design"] },
      { id: "dl-combinational", name: "Combinational Circuits", weightage: 2, subtopics: ["Multiplexers", "Decoders", "Adders", "ALUs"] },
      { id: "dl-memory", name: "Memory & PLDs", weightage: 2, subtopics: ["ROM & RAM", "PLA & PAL", "Memory hierarchy", "Cache basics"] },
    ],
  },
  {
    id: "coa",
    name: "Computer Organization & Architecture",
    icon: "💻",
    color: "#10B981",
    gradientFrom: "#10B981",
    gradientTo: "#047857",
    topics: [
      { id: "coa-data-path", name: "Data Path & Control", weightage: 4, subtopics: ["ALU design", "Control unit", "Pipelining", "Hazards"] },
      { id: "coa-memory", name: "Memory Systems", weightage: 4, subtopics: ["Cache memory", "Virtual memory", "Page replacement", "Memory hierarchy"] },
      { id: "coa-io", name: "I/O & Interfacing", weightage: 2, subtopics: ["I/O modes", "Interrupts", "DMA", "Bus arbitration"] },
      { id: "coa-processor", name: "Processor Design", weightage: 3, subtopics: ["Instruction formats", "Addressing modes", "RISC vs CISC", "Superscalar"] },
    ],
  },
  {
    id: "programming",
    name: "Programming & Data Structures",
    icon: "⚡",
    color: "#3B82F6",
    gradientFrom: "#3B82F6",
    gradientTo: "#1D4ED8",
    topics: [
      { id: "pds-c", name: "C Programming", weightage: 5, subtopics: ["Data types", "Control structures", "Functions & recursion", "Pointers", "Structures & unions"] },
      { id: "pds-arrays", name: "Arrays & Strings", weightage: 3, subtopics: ["Array operations", "Multi-dimensional arrays", "String manipulation", "Matrix operations"] },
      { id: "pds-ll", name: "Linked Lists", weightage: 4, subtopics: ["Singly & doubly linked lists", "Circular lists", "Operations on lists", "Applications"] },
      { id: "pds-stack-queue", name: "Stacks & Queues", weightage: 3, subtopics: ["Stack operations", "Queue operations", "Circular queue", "Deque", "Applications"] },
      { id: "pds-trees", name: "Trees", weightage: 5, subtopics: ["Binary trees", "BST", "AVL trees", "Tree traversals", "Heap"] },
      { id: "pds-graphs", name: "Graphs", weightage: 3, subtopics: ["Graph representations", "BFS & DFS", "Applications"] },
    ],
  },
  {
    id: "algorithms",
    name: "Algorithms",
    icon: "🔍",
    color: "#EF4444",
    gradientFrom: "#EF4444",
    gradientTo: "#B91C1C",
    topics: [
      { id: "alg-sorting", name: "Sorting & Searching", weightage: 5, subtopics: ["Comparison-based sorts", "Linear sorts", "Binary search", "Interpolation search"] },
      { id: "alg-dp", name: "Dynamic Programming", weightage: 6, subtopics: ["Optimal substructure", "Memoization", "0/1 Knapsack", "LCS", "Matrix chain"] },
      { id: "alg-greedy", name: "Greedy Algorithms", weightage: 3, subtopics: ["Fractional knapsack", "Huffman coding", "Minimum spanning trees", "Job sequencing"] },
      { id: "alg-graph", name: "Graph Algorithms", weightage: 5, subtopics: ["Shortest paths", "MST", "Topological sort", "Strongly connected components"] },
      { id: "alg-complexity", name: "Complexity Analysis", weightage: 3, subtopics: ["Time & space complexity", "Master theorem", "P vs NP", "Recurrence relations"] },
    ],
  },
  {
    id: "toc",
    name: "Theory of Computation",
    icon: "📝",
    color: "#14B8A6",
    gradientFrom: "#14B8A6",
    gradientTo: "#0F766E",
    topics: [
      { id: "toc-automata", name: "Finite Automata", weightage: 3, subtopics: ["DFA & NFA", "Regular expressions", "Closure properties", "Minimization"] },
      { id: "toc-cfg", name: "Context-Free Grammars", weightage: 3, subtopics: ["CFG & PDA", "Derivation & ambiguity", "Normal forms", "CYK algorithm"] },
      { id: "toc-turing", name: "Turing Machines", weightage: 3, subtopics: ["TM design", "Variants of TM", "Undecidability", "Halting problem"] },
      { id: "toc-complexity", name: "Complexity Classes", weightage: 2, subtopics: ["P, NP, NPC", "Reductions", "Cook-Levin theorem", "Approximation"] },
    ],
  },
  {
    id: "compiler",
    name: "Compiler Design",
    icon: "🔧",
    color: "#F97316",
    gradientFrom: "#F97316",
    gradientTo: "#EA580C",
    topics: [
      { id: "cd-lexical", name: "Lexical Analysis", weightage: 2, subtopics: ["Tokens & patterns", "Lex & Flex", "Regular expressions to NFA", "DFA minimization"] },
      { id: "cd-parsing", name: "Parsing Techniques", weightage: 3, subtopics: ["Top-down parsing", "Bottom-up parsing", "LR parsers", "Syntax trees"] },
      { id: "cd-syntax", name: "Syntax-Directed Translation", weightage: 2, subtopics: ["SDD & SDT", "Attribute grammars", "Intermediate code", "Three-address code"] },
      { id: "cd-optimization", name: "Code Optimization", weightage: 2, subtopics: ["Basic blocks", "Flow graphs", "Local & global optimization", "Loop optimization"] },
    ],
  },
  {
    id: "os",
    name: "Operating Systems",
    icon: "⚙️",
    color: "#6366F1",
    gradientFrom: "#6366F1",
    gradientTo: "#4338CA",
    topics: [
      { id: "os-process", name: "Process Management", weightage: 5, subtopics: ["Process states", "Scheduling algorithms", "IPC", "Synchronization"] },
      { id: "os-memory", name: "Memory Management", weightage: 4, subtopics: ["Paging & segmentation", "Virtual memory", "Page replacement", "TLB"] },
      { id: "os-file", name: "File Systems", weightage: 3, subtopics: ["File organization", "Directory structures", "Disk scheduling", "RAID"] },
      { id: "os-deadlock", name: "Deadlocks", weightage: 3, subtopics: ["Deadlock characterization", "Banker algorithm", "Detection & recovery", "Avoidance"] },
      { id: "os-threads", name: "Threads", weightage: 2, subtopics: ["Multithreading models", "Thread libraries", "Thread scheduling", "Mutex & semaphores"] },
    ],
  },
  {
    id: "cn",
    name: "Computer Networks",
    icon: "🌐",
    color: "#06B6D4",
    gradientFrom: "#06B6D4",
    gradientTo: "#0891B2",
    topics: [
      { id: "cn-layers", name: "Network Models", weightage: 3, subtopics: ["OSI model", "TCP/IP model", "Protocols & standards", "Network topologies"] },
      { id: "cn-dll", name: "Data Link Layer", weightage: 4, subtopics: ["Error detection & correction", "Flow control", "MAC protocols", "Ethernet"] },
      { id: "cn-network", name: "Network Layer", weightage: 5, subtopics: ["IP addressing", "Subnetting", "Routing algorithms", "IPv4 & IPv6"] },
      { id: "cn-transport", name: "Transport Layer", weightage: 4, subtopics: ["TCP & UDP", "Congestion control", "Flow control", "Socket programming"] },
      { id: "cn-application", name: "Application Layer", weightage: 3, subtopics: ["HTTP & DNS", "SMTP & FTP", "DHCP & SNMP", "P2P & CDN"] },
    ],
  },
  {
    id: "dbms",
    name: "Database Management Systems",
    icon: "📁",
    color: "#84CC16",
    gradientFrom: "#84CC16",
    gradientTo: "#4D7C0F",
    topics: [
      { id: "dbms-er", name: "ER Modeling", weightage: 3, subtopics: ["Entity-relationship diagrams", "Relationships & constraints", "Cardinality", "Weak entities"] },
      { id: "dbms-relational", name: "Relational Model", weightage: 4, subtopics: ["Relational algebra", "Tuple calculus", "Integrity constraints", "Normalization"] },
      { id: "dbms-sql", name: "SQL & Queries", weightage: 5, subtopics: ["DDL & DML", "Joins & subqueries", "Aggregation & grouping", "Views & indexes"] },
      { id: "dbms-transactions", name: "Transaction Management", weightage: 3, subtopics: ["ACID properties", "Concurrency control", "Recovery", "Serializability"] },
      { id: "dbms-indexing", name: "File Structures & Indexing", weightage: 3, subtopics: ["B+ trees", "Hashing", "Indexing methods", "File organization"] },
    ],
  },
];
