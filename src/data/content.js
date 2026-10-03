// All site copy lives here so it's easy to review and edit in one place.

export const profile = {
  name: "Aswin Pradeep",
  role: "Backend engineer, heading for forward deployed engineering",
  intro:
    "I build reliable backend systems with Java and Spring Boot. I'm working toward forward deployed engineering: sitting close to real teams and taking AI from prototype to production inside their actual workflows.",
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
  "I'm a software engineer with around 5 years of experience, most of it spent on backend systems at IBS Software, building microservices for an airline crew management platform where reliability and performance really matter.",
  "Where I'm heading: forward deployed engineering. I like being close to the people who use the software, understanding their messy real-world problems, and shipping AI-powered solutions that actually fit how they work.",
  "To get there, I'm building side projects, exploring LLMs and AI-assisted development, and learning best by shipping small, real experiments.",
];

export const experience = [
  {
    company: "IBS Software",
    role: "Backend Java Developer",
    summary: "Crew management platform for airlines",
    points: [
      "Build and maintain Spring Boot microservices for a large-scale crew management product.",
      "Develop crew-facing interfaces and messaging flows between services.",
      "Work on performance optimization, including GraphQL API improvements.",
      "Coordinate integrations across multiple teams to ship features end to end.",
    ],
    tags: ["Java", "Spring Boot", "Microservices", "GraphQL"],
  },
];

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
  { group: "AI", items: ["AI & LLMs", "AI-assisted development"] },
  { group: "Frontend", items: ["React"] },
];

// Hero departure board. Statuses are playful labels, not claims.
export const departures = [
  { flight: "AP 101", to: "SPRING BOOT·IBS", status: "CRUISING" },
  { flight: "AP 202", to: "MINDSPEND", status: "BOARDING" },
  { flight: "AP 303", to: "AI SECOND BRAIN", status: "TAXIING" },
  { flight: "AP 404", to: "FWD DEPLOYED ENG", status: "ON TIME" },
];

// Split-flap words cycling in the hero
export const destinations = ["FORWARD DEPLOYED ENG", "REAL-WORLD AI", "PRODUCTION SYSTEMS"];

export const ticker = [
  "NOW BOARDING · MINDSPEND",
  "NEXT DESTINATION · FORWARD DEPLOYED ENGINEERING",
  "~5 YEARS · JAVA · SPRING BOOT · MICROSERVICES",
  "IN PROGRESS · AI SECOND BRAIN",
  "OPEN TO CONVERSATIONS · AI · PRODUCTIVITY · THOUGHTFUL SOFTWARE",
];

export const nav = [
  { href: "#about", label: "About" },
  { href: "#experience", label: "Experience" },
  { href: "#projects", label: "Projects" },
  { href: "#skills", label: "Skills" },
  { href: "#contact", label: "Contact" },
];
