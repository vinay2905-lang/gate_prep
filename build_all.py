import os

BASE = '/c/Users/kj583/gate-prep-app'

def write_file(r, c):
    p = os.path.join(BASE, r)
    os.makedirs(os.path.dirname(p), exist_ok=True)
    with open(p, 'w', encoding='utf-8') as f:
        f.write(c)
    print(f'OK: {r} ({len(c)} chars)')

def append_file(r, c):
    p = os.path.join(BASE, r)
    with open(p, 'a', encoding='utf-8') as f:
        f.write(c)
    print(f'APPENDED: {r} ({len(c)} chars)')

# ============================================================
# SYLLABUS.TS - Full content
# ============================================================

syllabus_content = '''export interface Topic {
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
    id: "general-aptitude",
    name: "General Aptitude",
    icon: "\U0001F9E0",
    color: "#8B5CF6",
    gradientFrom: "#8B5CF6",
    gradientTo: "#6D28D9",
    topics: [
      { id: "ga-verbal", name: "Verbal Ability", weightage: 5, subtopics: ["English grammar", "Sentence completion", "Synonyms & Antonyms", "Reading comprehension"] },
      { id: "ga-numerical", name: "Numerical Ability", weightage: 5, subtopics: ["Numerical reasoning", "Data interpretation", "Arithmetic", "Percentage & averages"] },
      { id: "ga-spatial", name: "Spatial & Analytical", weightage: 5, subtopics: ["Spatial reasoning", "Analytical thinking", "Puzzle solving", "Pattern recognition"] },
    ],
  },
  {
    id: "engineering-maths",
    name: "Engineering Mathematics",
    icon: "\U0001F4CA",
    color: "#EC4899",
    gradientFrom: "#EC4899",
    gradientTo: "#BE185D",
    topics: [
      { id: "em-linear", name: "Linear Algebra", weightage: 5, subtopics: ["Matrix algebra", "Eigenvalues & eigenvectors", "Systems of equations", "Vector spaces"] },
      { id: "em-calc", name: "Calculus", weightage: 5, subtopics: ["Limits & continuity", "Differentiation", "Integration", "Differential equations"] },
      { id: "em-prob", name: "Probability & Statistics", weightage: 4, subtopics: ["Random variables", "Distributions", "Hypothesis testing", "Correlation & regression"] },
      { id: "em-discrete", name: "Discrete Mathematics", weightage: 4, subtopics: ["Set theory & logic", "Combinatorics", "Graph theory", "Boolean algebra"] },
    ],
  },
  {
    id: "digital-logic",
    name: "Digital Logic",
    icon: "\U0001F4B1",
    color: "#F59E0B",
    gradientFrom: "#F59E0B",
    gradientTo: "#D97706",
    topics: [
      { id: "dl-numbers", name: "Number Systems", weightage: 3, subtopics: ["Binary & hexadecimal", "Boolean algebra", "K-maps", "Logic gates"] },
      { id: "dl-circuits", name: "Combinational Circuits", weightage: 3, subtopics: ["Adders & subtractors", "Multiplexers & decoders", "Encoders", "Comparators"] },
      { id: "dl-sequential", name: "Sequential Circuits", weightage: 3, subtopics: ["Flip-flops & latches", "Counters & registers", "FSM design", "State minimization"] },
    ],
  },
  {
    id: "coa",
    name: "Computer Organization & Architecture",
    icon: "\U0001F5A5\U0000FE0F",
    color: "#10B981",
    gradientFrom: "#10B981",
    gradientTo: "#047857",
    topics: [
      { id: "coa-data", name: "Data Representation", weightage: 3, subtopics: ["Integer & float representation", "Error detection codes", "Data formats", "IEEE standards"] },
      { id: "coa-processor", name: "Processor Architecture", weightage: 5, subtopics: ["CPU design", "RISC vs CISC", "Pipeline hazards", "Superscalar architecture"] },
      { id: "coa-memory", name: "Memory Organization", weightage: 4, subtopics: ["Cache memory", "Virtual memory", "Memory hierarchy", "TLB"] },
      { id: "coa-io", name: "I/O & Interfacing", weightage: 3, subtopics: ["Interrupts & DMA", "I/O mapping", "Bus architectures", "Programmed I/O"] },
    ],
  },
  {
    id: "programming",
    name: "Programming & Data Structures",
    icon: "\U0001F4BB",
    color: "#3B82F6",
    gradientFrom: "#3B82F6",
    gradientTo: "#1D4ED8",
    topics: [
      { id: "prog-basics", name: "Programming Basics", weightage: 5, subtopics: ["Control flow (C/Java)", "Functions & recursion", "Arrays & strings", "Pointers & structures"] },
      { id: "prog-ds", name: "Data Structures", weightage: 6, subtopics: ["Linked lists", "Stacks & queues", "Trees & graphs", "Hash tables"] },
      { id: "prog-algo", name: "Algorithm Analysis", weightage: 5, subtopics: ["Sorting & searching", "Divide & conquer", "Greedy & DP", "Complexity analysis"] },
    ],
  },
  {
    id: "dbms",
    name: "Databases (DBMS)",
    icon: "\U0001F5C4\U0000FE0F",
    color: "#06B6D4",
    gradientFrom: "#06B6D4",
    gradientTo: "#0891B2",
    topics: [
      { id: "dbms-er", name: "ER Model & Relational", weightage: 4, subtopics: ["Entity-relationship diagrams", "Relational model", "Schema refinement", "ER to relational mapping"] },
      { id: "dbms-sql", name: "SQL & Queries", weightage: 5, subtopics: ["DDL & DML", "Joins & queries", "Subqueries & aggregation", "Set operations"] },
      { id: "dbms-norm", name: "Normalization", weightage: 4, subtopics: ["Functional dependencies", "Normal forms (1NF-5NF)", "Decomposition", "MVD & join dependencies"] },
      { id: "dbms-txn", name: "Transactions & Concurrency", weightage: 4, subtopics: ["ACID properties", "Concurrency control", "Recovery techniques", "Serializability"] },
    ],
  },
  {
    id: "cn",
    name: "Computer Networks",
    icon: "\U0001F310",
    color: "#14B8A6",
    gradientFrom: "#14B8A6",
    gradientTo: "#0D9488",
    topics: [
      { id: "cn-layers", name: "Network Layers", weightage: 4, subtopics: ["OSI & TCP/IP models", "Physical layer", "Data link layer", "Network layer"] },
      { id: "cn-transport", name: "Transport Layer", weightage: 4, subtopics: ["TCP & UDP", "Flow & congestion control", "Reliable data transfer", "Socket programming"] },
      { id: "cn-app", name: "Application Layer", weightage: 3, subtopics: ["HTTP & DNS", "SMTP & FTP", "DHCP & SNMP", "P2P & CDN"] },
      { id: "cn-security", name: "Network Security", weightage: 3, subtopics: ["Encryption & authentication", "Firewalls & VPNs", "Digital signatures", "SSL/TLS"] },
      { id: "cn-routing", name: "Routing Algorithms", weightage: 3, subtopics: ["Distance vector routing", "Link state routing", "BGP & OSPF", "Multicast routing"] },
    ],
  },
  {
    id: "os",
    name: "Operating Systems",
    icon: "\U0001F4C0",
    color: "#EF4444",
    gradientFrom: "#EF4444",
    gradientTo: "#B91C1C",
    topics: [
      { id: "os-process", name: "Process Management", weightage: 5, subtopics: ["Process states & scheduling", "IPC & synchronization", "Deadlocks", "Threads"] },
      { id: "os-memory", name: "Memory Management", weightage: 4, subtopics: ["Paging & segmentation", "Virtual memory", "Page replacement", "Allocation strategies"] },
      { id: "os-fs", name: "File Systems & Storage", weightage: 3, subtopics: ["File organization", "Disk scheduling", "RAID", "I/O buffering"] },
    ],
  },
  {
    id: "toc",
    name: "Theory of Computation",
    icon: "\U0001F3B5",
    color: "#6366F1",
    gradientFrom: "#6366F1",
    gradientTo: "#4338CA",
    topics: [
      { id: "toc-automata", name: "Automata Theory", weightage: 4, subtopics: ["DFA & NFA", "Regular expressions", "Pumping lemma", "Closure properties"] },
      { id: "toc-cfl", name: "Context-Free Languages", weightage: 4, subtopics: ["CFG & PDA", "Parse trees", "Ambiguity", "Chomsky normal form"] },
      { id: "toc-turing", name: "Turing Machines", weightage: 3, subtopics: ["TM design", "Recursive & RE languages", "Halting problem", "Undecidability"] },
      { id: "toc-complexity", name: "Complexity Theory", weightage: 3, subtopics: ["P & NP", "NP-completeness", "Cook-Levin theorem", "Polynomial hierarchy"] },
    ],
  },
  {
    id: "se",
    name: "Software Engineering",
    icon: "\U0001F6E0\U0000FE0F",
    color: "#F97316",
    gradientFrom: "#F97316",
    gradientTo: "#EA580C",
    topics: 
