// All site copy lives here so it's easy to review and edit in one place.

export const profile = {
  name: "Aswin Pradeep",
  role: "Backend engineer, heading for forward deployed engineering",
  intro:
    "I've worked across data science, AI and backend engineering, and today I build Spring Boot microservices for airline crew management at IBS Software. Next: forward deployed engineering, sitting close to real teams and taking AI from prototype to production inside their actual workflows.",
  years: "~5 years",
  email: "aswinpradeep15@gmail.com",
  phone: { display: "62824 42055", href: "tel:+916282442055" },
  links: {
    github: "https://github.com/aswinpradeepgit",
    linkedin: null, // add your LinkedIn URL here to show it
  },
};

export const nowBuilding = {
  label: "Currently building",
  title: "MindSpend",
  text: "A gamified expense tracker that makes logging spending feel lightweight and rewarding, so the habit actually sticks.",
};

export const about = [
  "I'm a software engineer with around 5 years of experience across data science, AI and backend engineering. I started as a Data Science Associate at Belong Education, then worked as a software engineer at Done Academy (remote, Dubai) and Speridian Technologies in Kochi, where AI was part of the work too.",
  "Today I'm at IBS Software, building Spring Boot microservices for an airline crew management platform where reliability and performance really matter. Alongside, I've freelanced part-time for trading companies, automating their algorithms and strategies with Python and AI.",
  "Where I'm heading: forward deployed engineering. I like being close to the people who use the software, understanding their messy real-world problems, and shipping AI-powered solutions that actually fit how they work.",
];

// Newest first. `stamp` = the domain "passport stamp" shown on each leg.
export const experience = [
  {
    company: "IBS Software",
    code: "IBS",
    role: "Backend Java Developer",
    period: "2025 – Present",
    years: "2025–now",
    current: true,
    summary: "Crew management platform for airlines",
    stamp: { label: "Airline systems", tone: "amber" },
    points: [
      "Build and maintain Spring Boot microservices for a large-scale crew management product.",
      "Develop crew-facing interfaces and messaging flows between services.",
      "Work on performance optimization, including GraphQL API improvements.",
      "Coordinate integrations across multiple teams to ship features end to end.",
    ],
    tags: ["Java", "Spring Boot", "Microservices", "GraphQL"],
  },
  {
    company: "Speridian Technologies",
    code: "SPD",
    role: "Software Engineer",
    period: "Jun 2025 – Oct 2025",
    years: "2025",
    location: "Kochi, India",
    summary: "Software engineering, with AI as part of the work.",
    stamp: { label: "Software + AI", tone: "emerald" },
    tags: ["Software engineering", "AI"],
  },
  {
    company: "Done Academy",
    code: "DNE",
    role: "Software Engineer",
    period: "Aug 2024 – May 2025",
    years: "2024–25",
    location: "Dubai, UAE · Remote",
    summary: "Remote software engineering for a Dubai-based company, including AI work.",
    stamp: { label: "Software + AI", tone: "emerald" },
    tags: ["Software engineering", "AI", "Remote"],
  },
  {
    company: "Belong Education",
    code: "BLG",
    role: "Data Science Associate",
    period: "May 2022 – Aug 2024",
    years: "2022–24",
    summary: "Where it started: data science and AI work.",
    stamp: { label: "Data science & AI", tone: "indigo" },
    tags: ["Data science", "AI"],
  },
];

// Part-time work alongside the roles above ("charter flights").
export const freelance = {
  title: "Freelance · Trading automation",
  period: "Part-time",
  summary: "Automated algorithms and strategies for trading companies using Python and AI.",
  stamp: { label: "Algo trading", tone: "rose" },
  tags: ["Python", "AI", "Algorithmic trading", "Automation"],
};

export const projects = [
  {
    title: "MindSpend",
    code: "MSP",
    status: "Currently building",
    description:
      "A gamified expense tracker that makes logging spending feel lightweight and rewarding, so the habit actually sticks.",
    tags: ["Mobile", "Gamification", "Personal finance"],
  },
  {
    title: "AI Second Brain",
    code: "BRN",
    status: "In progress",
    description:
      "A productivity app that understands what you save, keeps context and surfaces relevant notes and links when you need them.",
    tags: ["LLMs", "FastAPI", "React"],
  },
  {
    title: "Hyper-casual mobile games",
    code: "GMS",
    status: "Experiment",
    description:
      "Small mobile games built with AI-assisted development, including experiments with publishing on the Google Play Store.",
    tags: ["AI-assisted dev", "Mobile", "Play Store"],
  },
  {
    title: "Focus & productivity tools",
    code: "FCS",
    status: "Concept",
    description:
      "Concept work on tools that reduce distraction and help people protect deep-focus time, drawn from my own work habits.",
    tags: ["Product design", "AI"],
  },
];

export const skills = [
  { group: "Backend", items: ["Java", "Spring Boot", "Microservices", "GraphQL", "REST APIs", "FastAPI", "Databases", "System Design"] },
  { group: "AI & Data", items: ["Python", "Data Science", "Machine Learning", "LLMs", "Prompt engineering", "AI-assisted development", "Trading automation"] },
  { group: "Frontend", items: ["React"] },
];

// Hero departure board. Statuses are playful labels, not claims.
export const departures = [
  { flight: "2022", to: "BELONG·DATA SCI", status: "ARRIVED" },
  { flight: "2024", to: "DONE ACADEMY·DXB", status: "ARRIVED" },
  { flight: "2025", to: "SPERIDIAN·COK", status: "ARRIVED" },
  { flight: "NOW", to: "IBS·CREW SYSTEMS", status: "CRUISING", highlight: true },
  { flight: "NEXT", to: "FWD DEPLOYED ENG", status: "ON TIME" },
];

// Split-flap words cycling in the hero
export const destinations = ["FORWARD DEPLOYED ENG", "REAL-WORLD AI", "PRODUCTION SYSTEMS"];

export const ticker = [
  "NOW BOARDING · MINDSPEND",
  "NEXT DESTINATION · FORWARD DEPLOYED ENGINEERING",
  "CRUISING · SPRING BOOT MICROSERVICES @ IBS SOFTWARE",
  "PREVIOUS STOPS · DATA SCIENCE @ BELONG · SOFTWARE + AI @ DONE ACADEMY (DUBAI) & SPERIDIAN",
  "CHARTER FLIGHTS · PYTHON + AI TRADING AUTOMATION",
  "OPEN TO CONVERSATIONS · AI · PRODUCTIVITY · THOUGHTFUL SOFTWARE",
];

export const nav = [
  { href: "#about", label: "About" },
  { href: "#experience", label: "Experience" },
  { href: "#projects", label: "Projects" },
  { href: "#skills", label: "Skills" },
  { href: "#contact", label: "Contact" },
];
