const fs = require('fs');
const path = require('path');

const BASE = '/c/Users/kj583/gate-prep-app';

function writeFile(relPath, content) {
  const fullPath = path.join(BASE, relPath);
  fs.mkdirSync(path.dirname(fullPath), { recursive: true });
  fs.writeFileSync(fullPath, content, 'utf-8');
  console.log('OK:', relPath);
}

// 1. Complete syllabus.ts - The rest of the file after the truncated part
const syllabusAppend = `    {
    id: 'dbms',
    name: 'Databases (DBMS)',
    icon: '\uD83D\uDDC4\uFE0F',
    color: '#06B6D4',
    gradientFrom: '#06B6D4',
    gradientTo: '#0891B2',
    topics: [
      { id: 'dbms-er', name: 'ER Model & Relational', weightage: 4, subtopics: ['Entity-relationship diagrams', 'Relational model', 'Schema refinement', 'ER to relational mapping'] },
      { id: 'dbms-sql', name: 'SQL & Queries', weightage: 5, subtopics: ['DDL & DML', 'Joins & queries', 'Subqueries', 'Views & indexes', 'Aggregation'] },
      { id: 'dbms-nf', name: 'Normalization', weightage: 3, subtopics: ['Functional dependencies', '1NF, 2NF, 3NF, BCNF', 'Decomposition', 'Multi-valued dependencies'] },
      { id: 'dbms-tx', name: 'Transactions & Concurrency', weightage: 4, subtopics: ['ACID properties', 'Conflict serializability', 'Lock-based protocols', 'Deadlock in DB', 'Recovery'] },
      { id: 'dbms-indexing', name: 'Indexing & Hashing', weightage: 2, subtopics: ['B+ trees', 'Hash indexes', 'Bitmap indexes', 'Query optimization'] },
    ],
  },
  {
    id: 'networks',
    name: 'Computer Networks',
    icon: '\uD83C\uDF10',
    color: '#22C55E',
    gradientFrom: '#22C55E',
    gradientTo: '#16A34A',
    topics: [
      { id: 'net-layers', name: 'Network Layers', weightage: 4, subtopics: ['OSI & TCP/IP model', 'Physical layer basics', 'Data link layer', 'Network layer'] },
      { id: 'net-transport', name: 'Transport Layer', weightage: 4, subtopics: ['TCP & UDP', 'Flow & congestion control', 'Socket programming', 'Reliable data transfer'] },
      { id: 'net-app', name: 'Application Layer', weightage: 3, subtopics: ['HTTP & DNS', 'SMTP & FTP', 'DHCP & NAT', 'CDNs'] },
      { id: 'net-security', name: 'Network Security', weightage: 3, subtopics: ['Cryptography basics', 'Symmetric & asymmetric keys', 'Digital signatures', 'Firewalls & VPNs'] },
      { id: 'net-routing', name: 'Routing Algorithms', weightage: 3, subtopics: ['Distance vector', 'Link state', 'OSPF & BGP', 'IPv4 & IPv6'] },
    ],
  },
];
`;

// Read existing syllabus.ts
let existingSyllabus = '';
try {
  existingSyllabus = fs.readFileSync(path.join(BASE, 'src/data/syllabus.ts'), 'utf-8');
} catch {}

// Remove the last trailing part if it's incomplete
const syllabusComplete = existingSyllabus.replace(/\s*,\s*\{\s*$/, '') + '\n' + syllabusAppend;
writeFile('src/data/syllabus.ts', syllabusComplete);

// 2. Complete Tasks.tsx - Append the missing TaskCard function
const tasksAppend = `
            >
              Complete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
`;

let existingTasks = '';
try {
  existingTasks = fs.readFileSync(path.join(BASE, 'src/components/Tasks.tsx'), 'utf-8');
} catch {}

// Find and fix the truncated part
// The file ends with an incomplete button - remove that and add proper closing
const tasksFixed = existingTasks.replace(/<button\s+[^]*$/, '') + tasksAppend;
writeFile('src/components/Tasks.tsx', tasksFixed);

console.log('All files fixed!');
