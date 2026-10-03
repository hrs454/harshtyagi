// Everything shown on the page lives here, so edits never require touching components.
// Items marked REPLACE are placeholders until Harsh supplies the real URL.

export const profile = {
  name: 'Harsh Tyagi',
  role: 'Software Engineer',
  location: 'Noida, India',
  email: 'tyagiharsh7830@gmail.com',
  phone: '+91 7830061649',
  phoneHref: '+917830061649',
  resume: 'Harsh-Tyagi-Resume.pdf',
  statement:
    'I build the dashboards, import tools and APIs that keep eCommerce and CRM teams moving.',
  availability: 'Open to full-time software engineering roles',
}

export const links = {
  github: 'https://github.com/harshtyagi', // REPLACE
  linkedin: 'https://www.linkedin.com/in/harshtyagi', // REPLACE
}

export const about = [
  'I work across the stack, but the part I enjoy most is turning a messy manual process into something a team can run in a few clicks. At Seztech that meant a bulk Excel and CSV importer with validation and field mapping; before that, CRM modules that keep working when the connection drops.',
  'Most of my day is React on the front and Node, Express and SQL behind it. I care about components that stay readable six months later, APIs that fail clearly, and interfaces that hold up on a slow phone.',
]

export const work = [
  {
    company: 'Seztech Inc.',
    title: 'Software Engineer',
    mode: 'Remote',
    start: 'Oct 2025',
    end: 'Present',
    current: true,
    points: [
      'Build and extend the web application merchants use to manage and sell their catalogue across eCommerce platforms, in React.js.',
      'Write responsive, reusable components for product management, workflows, forms, dashboards and data-heavy tables.',
      'Shipped bulk Excel and CSV import with data validation and field mapping, cutting manual entry and lifting data-import productivity by {40%}.',
      'Integrate REST APIs so the interface and backend services stay in sync without hand-holding.',
    ],
    stack: ['React.js', 'REST APIs', 'JavaScript'],
  },
  {
    company: 'VMR Vision',
    title: 'Software Engineer, Internship',
    mode: 'Dehradun',
    start: 'Jan 2025',
    end: 'Sep 2025',
    current: false,
    points: [
      'Built enterprise CRM applications and business modules across the frontend, backend, API and database layers.',
      'Designed and integrated RESTful APIs for communication between application components and backend services.',
      'Optimised application workflows and data-processing operations, improving overall efficiency by {20%}.',
      'Introduced reusable components and a modular architecture that cut repeated work across modules.',
      'Added offline data capability with SQLite and AsyncStorage so the app stays usable on patchy connections.',
    ],
    stack: ['Node.js', 'Express.js', 'SQL', 'SQLite', 'React Native'],
  },
]

export const projects = [
  {
    id: 'sys-power-yoga',
    name: 'SYS Power Yoga',
    subtitle: 'Cross-platform companion app for a live yoga studio',
    period: 'Oct 2025 – Dec 2025',
    summary:
      'Members book live sessions, manage their membership and pay from one app on both iOS and Android. Built on a modular architecture so new screens reuse what is already there.',
    features: [
      'Firebase authentication and account recovery',
      'Membership plans, renewals and expiry handling',
      'Payment workflow for plan purchase',
      'Session-based access control for live classes',
    ],
    metric: { value: '20%', label: 'faster delivery from reusable components' },
    stack: ['React Native', 'Firebase', 'JavaScript'],
    url: 'https://www.syspoweryoga.com/',
    repo: '',
  },
  {
    id: 'fast-fingers',
    name: 'Fast Fingers',
    subtitle: 'Speed typing game',
    period: 'Jul 2025 – Aug 2025',
    summary:
      'A typing test that scores words per minute and accuracy in real time. The version below runs right here on this page.',
    features: [],
    stack: ['JavaScript', 'React', 'CSS'],
    url: '', // REPLACE with the live link
    repo: '', // REPLACE with the repository link
    playable: true,
  },
]

// Grouped by how often I actually reach for them, which is more useful than a percentage bar.
export const skills = [
  {
    tier: 'Daily',
    note: 'What I reach for on almost every task',
    items: ['JavaScript', 'React.js', 'HTML5', 'CSS3', 'REST APIs', 'Git'],
  },
  {
    tier: 'Shipped in production',
    note: 'Used on work that is live today',
    items: [
      'Node.js',
      'Express.js',
      'React Native',
      'SQL',
      'MySQL',
      'SQLite',
      'AsyncStorage',
      'Firebase',
      'Jira',
      'Cursor',
    ],
  },
  {
    tier: 'Working knowledge',
    note: 'Comfortable picking up a task in these',
    items: ['Python', 'Java', 'PHP', 'Shopify', 'WordPress'],
  },
]

export const background = {
  education: {
    degree: 'B.Tech, Computer Science',
    school: 'Dev Bhoomi Group of Institutions',
    place: 'Dehradun, Uttarakhand',
    period: '2021 – 2025',
  },
  certification: {
    name: 'Java Software Developer',
    issuer: 'GeeksforGeeks',
    period: 'Oct 2025',
  },
  activities: [
    'Represented the college at Uttarakhand Tech Fest 2024',
    'Campus ambassador for the college',
  ],
}

export const nav = [
  { id: 'about', label: 'About' },
  { id: 'work', label: 'Work' },
  { id: 'projects', label: 'Projects' },
  { id: 'skills', label: 'Skills' },
  { id: 'background', label: 'Background' },
  { id: 'contact', label: 'Contact' },
]
