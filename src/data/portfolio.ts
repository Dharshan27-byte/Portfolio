export interface ProjectImage {
  src: string;
  caption: string;
  alt: string;
}

export interface ProjectItem {
  id: string;
  index: string;
  title: string;
  subtitle: string;
  category: string;
  year: string;
  summary: string;
  description: string;
  highlights: string[];
  technologies: string[];
  accentColor: 'violet' | 'blue' | 'mint';
  images: ProjectImage[];
}

export interface TimelineEntry {
  year: string;
  period: string;
  title: string;
  organization: string;
  location: string;
  type: 'Education' | 'Hackathon' | 'Competition' | 'Build';
  detail: string;
}

export interface SkillGroup {
  title: string;
  subtitle: string;
  items: string[];
}

export const PROFILE = {
  name: 'Yoga Dharshan P',
  shortName: 'Yoga Dharshan',
  role: 'Full Stack Developer',
  studyArea: 'B.Tech in Artificial Intelligence & Data Science',
  college: 'Sri Krishna College of Engineering and Technology (SKCET)',
  collegeShort: 'SKCET, Coimbatore',
  duration: '2024 – 2028',
  location: 'Bodi, Theni · Coimbatore, India',
  coordinates: { lat: 11.0168, lng: 76.9558, label: 'Tamil Nadu, India' },
  email: 'ydharshan06@gmail.com',
  phone: '+91 88836 06436',
  portrait: '/assets/portfolio/portrait.jpg',
  resumePdf: '/assets/portfolio/Yoga_Dharshan_P_Resume.pdf',
  resumePreview: '/assets/portfolio/resume-preview.png',
  headline: 'Software you never have to overthink.',
  subheadline:
    'Full Stack Developer & AI and Data Science student at SKCET building healthcare companions, fitness analytics apps, and automated pipelines.',
  aboutLead:
    'I am a passionate Artificial Intelligence & Data Science student at SKCET with a strong foundation in programming, problem-solving, and data analytics.',
  aboutReveal:
    'My work bridges AI, web development, and database systems—turning real-world problems into clean, practical software like Care 360, FitPulse, and Gmail to Sheets.',
  careerObjective:
    'To leverage my passion for Artificial Intelligence and Data Science by contributing to innovative projects and continuously sharpening my technical and analytical craft.',
};

export const SECTIONS = [
  { id: 'hero', number: '00', label: 'Intro', subtitle: 'Portrait & overview' },
  { id: 'about', number: '01', label: 'About', subtitle: 'Who I am' },
  { id: 'focus', number: '02', label: 'Capabilities', subtitle: 'What I build' },
  { id: 'process', number: '03', label: 'Process', subtitle: 'How it ships' },
  { id: 'work', number: '04', label: 'Selected Work', subtitle: 'Four projects' },
  { id: 'timeline', number: '05', label: 'Timeline', subtitle: 'Education & milestones' },
  { id: 'skills', number: '06', label: 'Skills', subtitle: 'Stack & principles' },
  { id: 'contact', number: '07', label: 'Contact', subtitle: 'Direct inquiry' },
];

export const CAPABILITIES = [
  {
    id: 'fullstack',
    index: '01',
    title: 'Full Stack Web',
    headline: 'Full Stack Web',
    description:
      'Responsive interfaces built with HTML, CSS, JavaScript, TypeScript, and React—designed cleanly from first layout to live state.',
    diagramType: 'wireframe' as const,
  },
  {
    id: 'frontend',
    index: '02',
    title: 'Frontend UI',
    headline: 'Frontend UI',
    description:
      'Interactive dashboards, health trackers, and clear visual hierarchies engineered for smooth responsiveness across desktop and mobile.',
    diagramType: 'grid' as const,
  },
  {
    id: 'aidata',
    index: '03',
    title: 'AI & Data',
    headline: 'AI & Data',
    description:
      'Applying Artificial Intelligence and Data Science foundations—from Care 360 symptom guidance to analytics and structured insights.',
    diagramType: 'network' as const,
  },
  {
    id: 'databases',
    index: '04',
    title: 'Databases & APIs',
    headline: 'Databases & APIs',
    description:
      'Relational schemas in SQL and DBMS, document stores in MongoDB, and OAuth-authenticated Google Workspace and Map APIs.',
    diagramType: 'architecture' as const,
  },
];

export const PROCESS_STEPS = [
  {
    id: 'discover',
    index: '01',
    title: 'Discover',
    headline: 'Understand the real user bottleneck first.',
    description:
      'Break down the problem statement, user workflow, and core constraints before writing a line of code.',
    diagramType: 'wireframe' as const,
  },
  {
    id: 'architect',
    index: '02',
    title: 'Architect',
    headline: 'Map data flows, APIs, and state cleanly.',
    description:
      'Connect frontend views, database schemas, OAuth credentials, and geolocation endpoints into a cohesive structure.',
    diagramType: 'hub' as const,
  },
  {
    id: 'build',
    index: '03',
    title: 'Build',
    headline: 'Write modular, readable code across the stack.',
    description:
      'Implement clean React components, Python automation modules, and responsive CSS layouts that scale reliably.',
    diagramType: 'code' as const,
  },
  {
    id: 'ship',
    index: '04',
    title: 'Refine & Ship',
    headline: 'Verify edge cases, responsiveness, and clarity.',
    description:
      'Test end-to-end execution, validate state persistence, and polish every interaction before release.',
    diagramType: 'pulse' as const,
  },
];

export const PROJECTS: ProjectItem[] = [
  {
    id: 'care-360',
    index: '01',
    title: 'Care 360',
    subtitle: 'AI Healthcare Companion & Health Tracker',
    category: 'Healthcare Web App · AI & GPS',
    year: '2025 – 2026',
    summary:
      'An AI-powered healthcare chatbot and personal health tracker designed for symptom-based diagnosis, personalized recommendations, GPS nearby hospital discovery, and appointment booking.',
    description:
      'Built to improve healthcare accessibility and simplify personal health management. Care 360 combines a calm overview dashboard for upcoming visits and health entries with an interactive symptom guide, visual health tracker insights, and a live OpenStreetMap/Leaflet facility locator that uses browser GPS to surface nearby clinics and plan doctor appointments.',
    highlights: [
      'Overview dashboard organizing upcoming visits, recorded health entries, and daily care reminders.',
      'Interactive health tracker webpage for logging personal health statistics and reviewing insights.',
      'Symptom guide and AI-driven recommendations tailored for healthier everyday living.',
      'Live OpenStreetMap & Leaflet geolocation integration to discover nearby hospitals and schedule visits.',
    ],
    technologies: ['React', 'TypeScript', 'OpenStreetMap', 'Leaflet', 'Geolocation API'],
    accentColor: 'mint',
    images: [
      {
        src: '/assets/portfolio/care360-overview.png',
        caption: 'Overview Dashboard — Upcoming visits, health entries, and daily care summary',
        alt: 'Care 360 personal health overview dashboard showing appointments and health entry summaries',
      },
      {
        src: '/assets/portfolio/care360-appointments.png',
        caption: 'Nearby Care & Visit Planning — Interactive OpenStreetMap facility finder and booking flow',
        alt: 'Care 360 appointments view with OpenStreetMap locator and visit planner form',
      },
    ],
  },
  {
    id: 'fitpulse',
    index: '02',
    title: 'FitPulse',
    subtitle: 'Daily Movement, Nutrition & Health Analytics',
    category: 'Full Stack Fitness Tracker · Analytics',
    year: '2026',
    summary:
      'A personal fitness and wellness platform for recording workouts with a live session timer, monitoring BMI and vitals, tracking hydration and sleep, and exporting records.',
    description:
      'FitPulse brings daily movement, calorie intake, hydration history, and body metrics into a cohesive web application. Users can sign in or explore a clearly labeled sample workspace, switch across 7, 30, and 90-day summaries, run a live workout timer, configure daily targets, and export complete workout and health logs as CSV or JSON.',
    highlights: [
      'Split authentication screen with personal account sign-in and sample data exploration.',
      'Daily nutrition & energy radial gauge alongside 7/30/90-day activity and calorie burn summaries.',
      'Interactive live workout session timer, activity type distribution chart, and searchable workout log.',
      'Hydration history bar chart, weight trend curve, goal progress trackers, and CSV / JSON data export.',
    ],
    technologies: ['React', 'TypeScript', 'Tailwind CSS', 'Data Visualization', 'CSV / JSON Export'],
    accentColor: 'violet',
    images: [
      {
        src: '/assets/portfolio/fitpulse-dashboard.png',
        caption: 'Dashboard — Daily nutrition gauge, 7-day activity summary, and personalized insights',
        alt: 'FitPulse dashboard displaying daily nutrition energy gauge and 7-day activity summary',
      },
      {
        src: '/assets/portfolio/fitpulse-analytics.png',
        caption: 'Analytics — Weight trend, daily steps expenditure, hydration history, and recent workouts',
        alt: 'FitPulse analytics showing weight chart, steps expenditure, and hydration history bars',
      },
      {
        src: '/assets/portfolio/fitpulse-workouts.png',
        caption: 'Workouts — Live workout session timer, calorie duration trend, and activity distribution',
        alt: 'FitPulse workouts view with live timer and workout type distribution donut chart',
      },
      {
        src: '/assets/portfolio/fitpulse-auth.png',
        caption: 'Authentication — Clean split sign-in and account onboarding screen',
        alt: 'FitPulse split-screen login and create account interface',
      },
      {
        src: '/assets/portfolio/fitpulse-settings.png',
        caption: 'Settings & Export — Daily goal preferences, reminders, and JSON/CSV archive export',
        alt: 'FitPulse settings page with daily goals and JSON/CSV export actions',
      },
    ],
  },
  {
    id: 'gmail-to-sheets',
    index: '03',
    title: 'Gmail to Sheets',
    subtitle: 'Automated Email-to-Spreadsheet Python Pipeline',
    category: 'Python Automation · Workspace APIs',
    year: '2026',
    summary:
      'A modular Python automation tool that reads unread Gmail messages through OAuth 2.0, parses structured metadata and body content, prevents duplicates via state persistence, and logs rows to Google Sheets.',
    description:
      'Engineered with clean separation of concerns across gmail_service.py, sheets_service.py, email_parser.py, state_manager.py, and main.py. The script authenticates securely with OAuth 2.0, scans unread inbox threads, extracts From, Subject, Date, and Content fields, and writes rows directly into a structured Google Sheet ("Gmail Logs").',
    highlights: [
      'Modular Python architecture separating Gmail API fetching, parsing, Sheets writing, and state management.',
      'OAuth 2.0 authentication with token persistence and clean credential isolation.',
      'Stateful deduplication via state.json so only new unread emails are appended per execution.',
      'Verified end-to-end execution logging sender, subject, timestamp, and content into Google Sheets.',
    ],
    technologies: ['Python', 'Gmail API', 'Google Sheets API', 'OAuth 2.0', 'JSON State'],
    accentColor: 'blue',
    images: [
      {
        src: '/assets/portfolio/gmail-execution.png',
        caption: 'CLI Execution — Modular Python codebase running src/main.py and logging processed emails',
        alt: 'VS Code workspace and terminal output running python src/main.py for Gmail to Sheets',
      },
      {
        src: '/assets/portfolio/gmail-sheet.png',
        caption: 'Google Sheets Output — Parsed From, Subject, Date, and Content rows inside Gmail Logs',
        alt: 'Google Sheets spreadsheet populated with parsed Gmail rows',
      },
      {
        src: '/assets/portfolio/gmail-mailbox.png',
        caption: 'Source Inbox — Unread Gmail inbox processed into structured spreadsheet entries',
        alt: 'Gmail inbox showing messages captured by the automation script',
      },
    ],
  },
  {
    id: 'study-gen-ai',
    index: '04',
    title: 'Study Gen AI',
    subtitle: 'AI Study Space, Gemini Generator & Focus Planner',
    category: 'Generative AI · EdTech Web App',
    year: '2026',
    summary:
      'A personal AI study workspace combining a subject progress dashboard, a Gemini-powered Notes/Quiz/Flashcards generator, and a daily focus planner.',
    description:
      'StudyGenAI organizes academic preparation into one unified workspace across Dashboard, My Subjects, AI Generator, and Study Planner views. Learners track their study streak, hours logged, quiz accuracy, and per-subject progress, generate structured Gemini study packs in Notes, Quiz, or Flashcards modes, and schedule timed focus sessions with completion tracking.',
    highlights: [
      'Workspace dashboard surfacing Day streak, Study time, Avg. accuracy, Continue learning subject progress bars, and Today’s focus sessions.',
      'AI Generator supporting Notes, Quiz, and Flashcards modes to produce structured Gemini study packs with key concepts, review time, and difficulty.',
      'Study Planner focus calendar with Today’s progress ring, Today / Tomorrow / This week views, and interactive focus session completion.',
      'Personal account workspace with subject library organization and responsive multi-view navigation.',
    ],
    technologies: ['React', 'TypeScript', 'Gemini API', 'Tailwind CSS', 'Vite'],
    accentColor: 'violet',
    images: [
      {
        src: '/assets/aistudio/Screenshot_2026-11-19_151824_16ef0a79.png',
        caption: 'Dashboard — Day streak, study time, average accuracy, subject progress, and Today’s focus plan',
        alt: 'StudyGenAI dashboard showing streak metrics, Continue learning subject progress bars, and Today’s focus sessions',
      },
      {
        src: '/assets/aistudio/Screenshot_2026-11-19_151901_d68c8e57.png',
        caption: 'AI Generator — Notes, Quiz, and Flashcards modes producing structured Gemini study packs',
        alt: 'StudyGenAI AI Generator generating structured study pack notes powered by Gemini',
      },
      {
        src: '/assets/aistudio/Screenshot_2026-11-19_151910_feef60dd.png',
        caption: 'Study Planner — Focus calendar with daily completion ring, streak tracking, and timed sessions',
        alt: 'StudyGenAI Study Planner focus calendar with session completion tracking and Today/Tomorrow/This week filters',
      },
      {
        src: '/assets/aistudio/Screenshot_2026-11-19_151816_e79ce4e7.png',
        caption: 'Authentication — Split editorial landing and sign-in workspace for StudyGenAI',
        alt: 'StudyGenAI split-screen welcome landing and account sign-in page',
      },
    ],
  },
];

export const TIMELINE: TimelineEntry[] = [
  {
    year: '2024',
    period: '2024 – 2028',
    title: 'B.Tech in Artificial Intelligence & Data Science',
    organization: 'Sri Krishna College of Engineering and Technology (SKCET)',
    location: 'Coimbatore, Tamil Nadu',
    type: 'Education',
    detail:
      'Pursuing undergraduate engineering in AI & Data Science, building strong foundations in C++, Java, Python, web development, DBMS, and analytical problem-solving.',
  },
  {
    year: '2024',
    period: 'Oct – Nov 2024',
    title: 'Srinivasa Ramanujan Mathematical Competitions (Levels 1 & 2)',
    organization: 'ISTE Tamil Nadu Section',
    location: 'Coimbatore, Tamil Nadu',
    type: 'Competition',
    detail:
      'Represented SKCET AI & DS in both Chapter Level and State Level national engineering mathematical competitions.',
  },
  {
    year: '2025',
    period: 'March 2025',
    title: 'Hack the Horizon 2025 — 24-Hour IEEE Hackathon',
    organization: 'KPR Institute of Engineering and Technology · IEEE CIS',
    location: 'Coimbatore, Tamil Nadu',
    type: 'Hackathon',
    detail:
      'Developed an Open Innovation solution during a 24-hour sprint from a live problem statement, strengthening rapid prototyping and teamwork.',
  },
  {
    year: '2026',
    period: 'February 2026',
    title: 'FuturiX 2K26 — Web-Sprint (Second Prize)',
    organization: 'Arjun College of Technology · National Technical Symposium',
    location: 'Coimbatore, Tamil Nadu',
    type: 'Competition',
    detail:
      'Secured Second Prize in the Web-Sprint technical competition at FuturiX 2K26.',
  },
  {
    year: '2026',
    period: '2025 – 2026',
    title: 'Full Stack, Healthcare, AI & Automation Builds',
    organization: 'Care 360 · FitPulse · Gmail to Sheets · Study Gen AI',
    location: 'Independent Engineering',
    type: 'Build',
    detail:
      'Designed and built Care 360 (AI healthcare companion with GPS hospital discovery), FitPulse (fitness & nutrition analytics), Gmail to Sheets (Python OAuth automation), and Study Gen AI (generative study workspace).',
  },
];

export const SKILL_GROUPS: SkillGroup[] = [
  {
    title: 'Programming Languages',
    subtitle: 'Logic & systems',
    items: ['C++', 'Java', 'JavaScript', 'TypeScript', 'Python'],
  },
  {
    title: 'Web Technologies',
    subtitle: 'Interfaces & styling',
    items: ['HTML5', 'CSS3', 'React', 'Tailwind CSS', 'Responsive UI'],
  },
  {
    title: 'Databases & APIs',
    subtitle: 'Storage & integration',
    items: ['DBMS', 'SQL', 'MongoDB', 'Gmail & Sheets APIs', 'OpenStreetMap / Leaflet'],
  },
  {
    title: 'AI & Core CS',
    subtitle: 'Academic specialization',
    items: ['Artificial Intelligence', 'Data Science', 'Data Analytics', 'Problem Solving', 'Rapid Prototyping'],
  },
];

export const MARQUEE_ITEMS = [
  'Care 360',
  'FitPulse',
  'Gmail to Sheets',
  'Study Gen AI',
  'FuturiX 2K26 Web-Sprint',
  'C++',
  'Java',
  'JavaScript',
  'TypeScript',
  'Python',
  'React',
  'HTML & CSS',
  'DBMS & SQL',
  'Artificial Intelligence & Data Science',
];
