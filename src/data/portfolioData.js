/**
 * Portfolio Data Registry
 * Amit Kumar - Software Engineer / React Native & Full-Stack Developer
 */

export const developerInfo = {
  name: 'Amit Kumar',
  role: 'Software Engineer',
  specialization: 'React Native & Full-Stack Developer',
  location: 'Mohali, Punjab, India',
  status: 'Ready for Deployment / Immediate Joiner',
  email: 'amit.reactnative.dev@gmail.com',
  phone: '+91 82956 47048',
  github: 'https://github.com/Amitkumar404',
  linkedin: 'https://www.linkedin.com/in/amit-kumar-39967b22a/',
  whatsapp: 'https://wa.me/918295647048',
  bio: `Software Engineer specializing in production React Native mobile architectures, robust Node.js/Express backends, and normalized PostgreSQL schemas. Proven track record building AI-integrated learning tools and high-concurrency event apps with 60FPS fluid UIs and offline-first persistence.`,
  metrics: [
    { label: 'Production Apps', value: '2+', desc: 'Deployed with Real Users' },
    { label: 'Target Frame Rate', value: '60', unit: 'FPS', desc: 'Zero-Jank Virtualization' },
    { label: 'Codebase Reduction', value: '35', unit: '%', desc: 'Modular DRY Architecture' },
    { label: 'Academic CGPA', value: '8.45', unit: '/10', desc: 'B.Tech in CSE' }
  ]
};

export const techStackRegistry = {
  'React Native': {
    title: 'React Native',
    category: 'Mobile Framework',
    level: 'Core Specialization',
    desc: 'Architecting high-performance cross-platform mobile apps with 60FPS UIs, optimized rendering cycles, and custom native bridges.',
    projects: ['BroSis (AI Platform)', 'Tracevenue (Event App)', 'NeuroSync AI', 'Phytier (Fitness)']
  },
  'TypeScript': {
    title: 'TypeScript',
    category: 'Language',
    level: 'Advanced',
    desc: 'Building type-safe scalable architectures with strict schemas, reusable generic contracts, and robust reducer slice typing.',
    projects: ['Phytier (Backend & Mobile)', 'BroSis (Component Library)']
  },
  'JavaScript': {
    title: 'JavaScript (ES6+)',
    category: 'Language',
    level: 'Advanced',
    desc: 'Deep mastery of asynchronous programming, closures, promises, event loop mechanics, and performance optimization.',
    projects: ['BroSis', 'Tracevenue', 'NeuroSync AI', 'Phytier']
  },
  'Redux Toolkit': {
    title: 'Redux Toolkit',
    category: 'State Management',
    level: 'Advanced State',
    desc: 'Centralized state management with structured slices, memoized selectors (createSelector), and eliminating cross-screen prop-drilling.',
    projects: ['BroSis', 'NeuroSync AI']
  },
  'Node.js': {
    title: 'Node.js / Express.js',
    category: 'Backend',
    level: 'Proficient',
    desc: 'Building scalable RESTful API microservices, JWT authentication middleware, and robust error boundary controllers.',
    projects: ['Phytier (REST Backend)']
  },
  'Express.js': {
    title: 'Express.js',
    category: 'Backend',
    level: 'Proficient',
    desc: 'REST API routing, JWT token guards, CORS policies, and request lifecycle validation middleware.',
    projects: ['Phytier']
  },
  'PostgreSQL': {
    title: 'PostgreSQL',
    category: 'Database',
    level: 'Schema Modeling',
    desc: 'Designing 3NF normalized relational schemas for user habits, workout logging, and progress tracking with indexed high-performance queries.',
    projects: ['Phytier (Database Layer)']
  },
  'SQL': {
    title: 'SQL / Relational DBs',
    category: 'Database',
    level: 'Proficient',
    desc: 'Query optimization, transactions, foreign key constraints, and relational schema migrations.',
    projects: ['Phytier', 'Bahra University Academic Systems']
  },
  'AI & OCR Pipeline': {
    title: 'AI & OCR Pipeline',
    category: 'AI Pipeline',
    level: 'Multimodal Systems',
    desc: 'End-to-end document OCR text extraction to dynamic interactive quiz rendering in React Native, plus STT/TTS voice engines.',
    projects: ['BroSis (AI-Powered Platform)']
  },
  'FlashList': {
    title: 'FlashList / FlatList Opt',
    category: 'Performance',
    level: '60 FPS Target',
    desc: 'Eliminating UI frame drops and scroll jank on low-end Android hardware via Shopify FlashList virtualization & recycling.',
    projects: ['Tracevenue']
  },
  'JWT Authentication': {
    title: 'JWT Authentication',
    category: 'Security',
    level: 'Auth Shield',
    desc: 'Secure token storage, silent background session refresh rotations, and protected route access without exposing credentials.',
    projects: ['Tracevenue', 'Phytier']
  },
  'AsyncStorage': {
    title: 'AsyncStorage',
    category: 'Offline Storage',
    level: 'Local First',
    desc: 'Resilient client storage engine chosen over SQLite for zero-network persistence, key-value journaling, and instant load times.',
    projects: ['NeuroSync AI']
  },
  'Offline-First': {
    title: 'Offline-First Architecture',
    category: 'Architecture',
    level: 'Zero Dependency',
    desc: 'Local-first data persistence, offline task timers, and local push notifications with zero network dependency.',
    projects: ['NeuroSync AI']
  },
  'Git': {
    title: 'Git & GitHub',
    category: 'DevOps & Tooling',
    level: 'Agile Workflow',
    desc: 'Feature branching workflows, peer pull request reviews, and agile merge conflict resolution.',
    projects: ['Sensation Solutions Team Workflows']
  }
};

export const techCategories = [
  {
    category: 'mobile',
    title: 'Mobile Architecture',
    desc: 'Cross-platform engineering with high-framerate rendering and native platform bridges.',
    skills: [
      { name: 'React Native', badge: 'Core', level: '95%' },
      { name: 'Redux Toolkit', badge: 'State', level: '92%' },
      { name: 'FlashList', badge: '60 FPS', level: '90%' },
      { name: 'AsyncStorage', badge: 'Offline', level: '94%' }
    ]
  },
  {
    category: 'languages',
    title: 'Core Languages',
    desc: 'Type-safe contracts, modern ECMAScript standards, and robust component schemas.',
    skills: [
      { name: 'TypeScript', badge: 'Strict', level: '90%' },
      { name: 'JavaScript', badge: 'ES6+', level: '95%' },
      { name: 'SQL', badge: 'Queries', level: '85%' },
      { name: 'HTML5 / CSS3', badge: 'Design', level: '92%' }
    ]
  },
  {
    category: 'backend',
    title: 'Backend Services & APIs',
    desc: 'Microservices, RESTful architectural design, JWT session guards, and routing controllers.',
    skills: [
      { name: 'Node.js', badge: 'Runtime', level: '88%' },
      { name: 'Express.js', badge: 'REST API', level: '88%' },
      { name: 'JWT Authentication', badge: 'Security', level: '92%' },
      { name: 'RESTful Architecture', badge: 'Protocol', level: '90%' }
    ]
  },
  {
    category: 'database',
    title: 'Relational Database Layer',
    desc: 'Relational schema design, 3NF normalization, index optimization, and CRUD operations.',
    skills: [
      { name: 'PostgreSQL', badge: 'Relational', level: '86%' },
      { name: 'SQL Query Optimization', badge: 'Index', level: '84%' },
      { name: 'Schema Migration', badge: '3NF', level: '85%' },
      { name: 'Connection Pooling', badge: 'Scale', level: '82%' }
    ]
  },
  {
    category: 'ai-cloud',
    title: 'AI & Modern Pipelines',
    desc: 'Multimodal AI integration, document OCR parsing, voice synthesis (TTS/STT), and audio processing.',
    skills: [
      { name: 'AI & OCR Pipeline', badge: 'Vision', level: '88%' },
      { name: 'STT / TTS Voice Engines', badge: 'Audio', level: '85%' },
      { name: 'Dynamic Quiz Engine', badge: 'GenAI', level: '90%' },
      { name: 'Cloud Integration', badge: 'Async', level: '84%' }
    ]
  },
  {
    category: 'devops',
    title: 'DevOps & Engineering Workflow',
    desc: 'Collaborative development practices, code review standards, and mobile build pipelines.',
    skills: [
      { name: 'Git', badge: 'Version Control', level: '92%' },
      { name: 'GitHub CI/Workflows', badge: 'Agile', level: '88%' },
      { name: 'Android SDK / ADB', badge: 'Mobile Tooling', level: '86%' },
      { name: 'Code Quality & PR Reviews', badge: 'Peer Review', level: '90%' }
    ]
  }
];

export const experienceData = [
  {
    id: 'sensation-brosis',
    company: 'Sensation Solutions',
    role: 'React Native Developer',
    period: '01/2026 – Present',
    location: 'Mohali, Punjab, India',
    status: 'ACTIVE PRODUCTION',
    projectTitle: 'BroSis // AI-Powered Mobile Learning Platform',
    projectCategory: 'FLAGSHIP COMMERCIAL APP',
    desc: 'Architected and built full-stack features for an intelligent educational mobile application on React Native, integrating multimodal AI document processing and automated interactive quiz generation.',
    skills: ['React Native', 'JavaScript', 'Redux Toolkit', 'AI & OCR Pipeline', 'Node.js', 'Git'],
    metrics: [
      { label: 'Multimodal OCR', value: 'Instant Text-to-Quiz' },
      { label: 'Voice Pipeline', value: 'Integrated STT / TTS' },
      { label: 'State Sync', value: 'Centralized Redux' }
    ],
    bullets: [
      'Engineered an end-to-end OCR processing pipeline that converts uploaded document images and PDFs directly into dynamic, interactive multiple-choice quizzes.',
      'Integrated Speech-to-Text (STT) and Text-to-Speech (TTS) voice engines for natural conversational tutoring and voice-assisted quiz interactions.',
      'Implemented centralized Redux Toolkit state slices for user profiles, study materials, and progress telemetry, eliminating prop-drilling across 15+ screens.',
      'Collaborated in an agile team using Git branching, PR reviews, and sprint planning to deliver on-time releases.'
    ]
  },
  {
    id: 'sensation-tracevenue',
    company: 'Sensation Solutions',
    role: 'React Native Developer',
    period: '11/2025 – 01/2026',
    location: 'Mohali, Punjab, India',
    status: 'COMPLETED SHIPMENT',
    projectTitle: 'Tracevenue // Real-Time Event Planning & Vendor Platform',
    projectCategory: 'COMMERCIAL PRODUCTION APP',
    desc: 'Built a high-performance cross-platform event coordination app connecting event organizers, attendees, and service vendors with low-latency navigation and secure session authentication.',
    skills: ['React Native', 'FlashList', 'JWT Authentication', 'JavaScript', 'Git'],
    metrics: [
      { label: 'Rendering Speed', value: '60 FPS Target' },
      { label: 'List Optimization', value: 'Shopify FlashList' },
      { label: 'Auth Shield', value: 'JWT Session Guard' }
    ],
    bullets: [
      'Integrated Shopify FlashList to recycle viewport cells, eliminating FlatList memory leaks and scroll jank across vendor directories with 500+ items.',
      'Implemented secure JWT authentication flows with encrypted token storage and silent background session refresh rotations.',
      'Built custom bottom sheet filters, vendor category selectors, and responsive event card components ensuring identical UX across iOS and Android.',
      'Optimized image asset bundling and lazy loading strategies, cutting initial app cold-start load times significantly.'
    ]
  }
];

export const flagshipProjects = [
  {
    id: 'neurosync',
    title: 'NeuroSync AI',
    tagline: 'Offline-First Productivity & Mental Wellness Journaling Engine',
    type: 'INDEPENDENT ARCHITECTURE',
    archKey: 'neurosync',
    skills: ['React Native', 'Redux Toolkit', 'AsyncStorage', 'JavaScript', 'Offline-First'],
    desc: 'Engineered a full-featured offline-first mobile productivity app integrating mental wellness journaling, Pomodoro interval timers, and local daily notification engines with zero external cloud dependencies.',
    metrics: [
      { label: 'Codebase Reduction', value: '35% Modular JSX' },
      { label: 'Offline Resilience', value: '100% Zero-Cloud' },
      { label: 'Local Notifications', value: 'AlarmManager Native' }
    ],
    highlights: [
      'Chose AsyncStorage over SQLite to minimize binary size while providing instant read/write cycles for JSON task graphs.',
      'Abstracted shared card, timer, and state badge components across 3 modules, reducing duplicate code by ~35%.',
      'Configured local push notifications for task alarms without third-party push server dependencies.'
    ],
    github: 'https://github.com/Amitkumar404',
    demo: 'https://github.com/Amitkumar404/NeuroSync-AI'
  },
  {
    id: 'phytier',
    title: 'Phytier',
    tagline: 'Full-Stack Fitness Milestone & Habit Progression Platform',
    type: 'FULL-STACK COMMERCIAL ARCHITECTURE',
    archKey: 'phytier',
    skills: ['React Native', 'TypeScript', 'Node.js', 'Express.js', 'PostgreSQL', 'SQL', 'JWT Authentication'],
    desc: 'Architected and built an end-to-end full-stack habit tracking ecosystem featuring dynamic progression milestones in React Native, backed by an Express REST API and a normalized PostgreSQL relational database.',
    metrics: [
      { label: 'Database Schema', value: '3NF Normalized' },
      { label: 'Backend Runtime', value: 'Node.js / Express' },
      { label: 'Type Safety', value: 'Strict TypeScript' }
    ],
    highlights: [
      'Designed 3NF normalized PostgreSQL relational schemas separating user credentials, workout logs, habit frequencies, and progression milestones.',
      'Constructed RESTful API endpoints with JWT authentication guards, request validation middleware, and connection pooling.',
      'Built responsive React Native mobile frontend with dynamic milestone progress meters, skeleton loading states, and streak badges.'
    ],
    github: 'https://github.com/Amitkumar404',
    demo: 'https://github.com/Amitkumar404/Phytier-Fitness'
  }
];

export const codeSnippets = {
  storage: {
    id: 'storage',
    title: 'AsyncStorage vs SQLite Decision Matrix',
    lang: 'javascript',
    targetId: 'codeSnippetStorage',
    code: `// NeuroSync AI: Resilient Key-Value Offline Slices
import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEYS = {
  JOURNAL_ENTRIES: '@neurosync:journal_entries',
  POMODORO_SESSIONS: '@neurosync:pomodoro_history',
};

// Benchmarking Decision:
// SQLite adds ~4MB native bindings overhead.
// AsyncStorage JSON serialization gives <2ms access on budget Android devices.
export const saveJournalEntries = async (entries) => {
  try {
    const serialized = JSON.stringify(entries);
    await AsyncStorage.setItem(STORAGE_KEYS.JOURNAL_ENTRIES, serialized);
    return { success: true };
  } catch (error) {
    console.error('AsyncStorage Write Error:', error);
    return { success: false, error };
  }
};`
  },
  redux: {
    id: 'redux',
    title: 'Redux Toolkit Slice with Memoized Selectors',
    lang: 'typescript',
    targetId: 'codeSnippetRedux',
    code: `// BroSis Platform: Centralized Quiz State Machine
import { createSlice, createSelector, PayloadAction } from '@reduxjs/toolkit';

interface QuizState {
  questions: Array<{ id: string; text: string; options: string[]; answerIndex: number }>;
  userAnswers: Record<string, number>;
  activeQuestionIndex: number;
}

const initialState: QuizState = {
  questions: [],
  userAnswers: {},
  activeQuestionIndex: 0,
};

export const quizSlice = createSlice({
  name: 'quiz',
  initialState,
  reducers: {
    setExtractedQuestions(state, action: PayloadAction<QuizState['questions']>) {
      state.questions = action.payload;
      state.userAnswers = {};
      state.activeQuestionIndex = 0;
    },
    recordAnswer(state, action: PayloadAction<{ questionId: string; answerIndex: number }>) {
      state.userAnswers[action.payload.questionId] = action.payload.answerIndex;
    },
  },
});

// Memoized calculation eliminating 60FPS re-render lag
export const selectQuizScore = createSelector(
  [(state: { quiz: QuizState }) => state.quiz],
  (quiz) => {
    return quiz.questions.reduce((score, q) => {
      return quiz.userAnswers[q.id] === q.answerIndex ? score + 1 : score;
    }, 0);
  }
);`
  },
  jwt: {
    id: 'jwt',
    title: 'PostgreSQL Relational Pool & JWT Route Guard',
    lang: 'javascript',
    targetId: 'codeSnippetJWT',
    code: `// Phytier Backend: Express JWT Auth Guard & PostgreSQL Connection Pool
const jwt = require('jsonwebtoken');
const { Pool } = require('pg');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  max: 20,
  idleTimeoutMillis: 30000,
});

const verifyTokenMiddleware = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) return res.status(401).json({ error: 'Access token required' });

  jwt.verify(token, process.env.JWT_ACCESS_SECRET, (err, user) => {
    if (err) return res.status(403).json({ error: 'Invalid or expired token' });
    req.user = user;
    next();
  });
};

// 3NF Normalized Query: Sub-10ms Indexed Query Latency
const getHabitStreaks = async (req, res) => {
  try {
    const { rows } = await pool.query(
      \`SELECT h.id, h.title, COUNT(l.id) as completion_count
       FROM habits h
       LEFT JOIN habit_logs l ON h.id = l.habit_id AND l.completed_at >= NOW() - INTERVAL '30 days'
       WHERE h.user_id = $1
       GROUP BY h.id, h.title
       ORDER BY completion_count DESC\`,
      [req.user.id]
    );
    res.json({ habits: rows });
  } catch (err) {
    res.status(500).json({ error: 'Database execution failure' });
  }
};`
  }
};

export const educationData = [
  {
    institution: 'Bahra University',
    location: 'Solan, Himachal Pradesh, India',
    degree: 'Bachelor of Technology in Computer Science & Engineering (B.Tech CSE)',
    period: '2022 – 2026',
    grade: 'CGPA: 8.45 / 10',
    description: 'Coursework: Data Structures & Algorithms, Database Management Systems, Object-Oriented Programming, Operating Systems, Computer Networks, Software Engineering.'
  },
  {
    institution: 'Delhi Public School (DPS)',
    location: 'Senior Secondary',
    degree: 'Class XII (Non-Medical Science with Computer Science)',
    period: '2021 – 2022',
    grade: 'Score: 87%',
    description: 'Specialization in Mathematics, Physics, Chemistry, and Foundations of Computer Programming.'
  }
];

export const searchableItems = [
  { title: 'BroSis — AI-Powered Learning Platform', tag: 'Production App', section: 'experience', match: 'brosis ocr quiz stt tts sensation' },
  { title: 'Tracevenue — Real-Time Event Planning', tag: 'Production App', section: 'experience', match: 'tracevenue flashlist 60fps jwt sensation' },
  { title: 'NeuroSync AI — Offline-First Journaling', tag: 'Project', section: 'projects', match: 'neurosync asyncstorage offline pomodoro' },
  { title: 'Phytier — Full-Stack Fitness Tracker', tag: 'Project', section: 'projects', match: 'phytier node postgresql express habit' },
  { title: 'React Native 60FPS Architecture', tag: 'Core Stack', section: 'skills', match: 'react native flashlist mobile' },
  { title: 'TypeScript & JavaScript ES6+', tag: 'Language', section: 'skills', match: 'typescript js type contracts' },
  { title: 'PostgreSQL & SQL Schema Design', tag: 'Database', section: 'skills', match: 'postgres database 3nf schema queries' },
  { title: 'Architecture & Code Lab', tag: 'Workbench', section: 'lab', match: 'lab pipeline benchmark code' },
  { title: 'Bahra University (B.Tech CSE)', tag: 'Education', section: 'education', match: 'bahra degree cgpa university' },
  { title: 'Contact Amit Kumar', tag: 'Channel', section: 'contact', match: 'email phone whatsapp contact hire' }
];
