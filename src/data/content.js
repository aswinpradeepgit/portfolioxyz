// All site copy lives here so it's easy to review and edit in one place.

export const profile = {
  name: "Aswin Pradeep",
  role: "Backend engineer, heading for forward deployed engineering",
  intro:
    "I build backend systems people rely on, currently Spring Boot microservices for airline crew operations at IBS Software. Heading toward forward deployed engineering: working alongside teams to turn their real problems into software that ships.",
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
  "Right now I'm at IBS Software, writing Java and Spring Boot services that help airlines manage their crews.",
  "Getting here took a few turns: software engineering, data science, AI, some freelancing, and even teaching. Along the way I learned that the best code usually comes from understanding the people who'll use it.",
  "That's why I'm heading toward forward deployed engineering: less building in isolation, more working alongside teams to solve the problems they actually have.",
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
    summary: "General backend engineering: APIs, services, and fixing whatever the system needed that week.",
    stamp: { label: "Backend", tone: "sky" },
    tags: ["Backend", "APIs"],
  },
  {
    company: "Done Academy",
    code: "DNE",
    role: "Software Engineer",
    period: "Aug 2024 – May 2025",
    years: "2024–25",
    location: "Dubai, UAE · Remote",
    summary: "Learning platforms again, this time for the hospitality industry: backend work for a Dubai-based team, fully remote.",
    stamp: { label: "LMS · Hospitality", tone: "emerald" },
    tags: ["LMS", "Hospitality", "Backend", "Remote"],
  },
  {
    company: "Belong Education",
    code: "BLG",
    role: "Data Science Associate",
    period: "May 2022 – Aug 2024",
    years: "2022–24",
    summary: "Two seats on the same plane: built the backend and AI features of an LMS, then taught data science to the students learning on it.",
    stamp: { label: "EdTech · Data science", tone: "indigo" },
    tags: ["LMS", "Backend", "AI", "Teaching"],
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
  "PREVIOUS STOPS · EDTECH @ BELONG · HOSPITALITY LMS @ DONE ACADEMY (DUBAI) · BACKEND @ SPERIDIAN",
  "CHARTER FLIGHTS · PYTHON + AI TRADING AUTOMATION",
  "OPEN TO CONVERSATIONS · AI · PRODUCTIVITY · THOUGHTFUL SOFTWARE",
];

export const nav = [
  { href: "#about", label: "About" },
  { href: "#experience", label: "Experience" },
  { href: "#projects", label: "Projects" },
  { href: "#skills", label: "Skills" },
  { href: "/blog", label: "Blog" },
  { href: "#contact", label: "Contact" },
];
