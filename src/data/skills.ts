export type Skill = { name: string; level: number };
export type SkillGroup = {
  id: string;
  title: string;
  description: string;
  skills: Skill[];
};

export const skillGroups: SkillGroup[] = [
  {
    id: "languages",
    title: "Languages",
    description: "Core programming languages",
    skills: [
      { name: "Dart", level: 88 },
      { name: "C++", level: 75 },
      { name: "Python", level: 72 },
      { name: "SQL", level: 70 },
    ],
  },
  {
    id: "mobile",
    title: "Mobile Development",
    description: "Building cross-platform apps",
    skills: [
      { name: "Flutter", level: 90 },
      { name: "Firebase", level: 82 },
      { name: "Riverpod", level: 78 },
      { name: "REST APIs", level: 80 },
      { name: "Material Design", level: 85 },
    ],
  },
  {
    id: "backend",
    title: "Backend & Database",
    description: "Data, auth, and storage layers",
    skills: [
      { name: "Firebase Firestore", level: 80 },
      { name: "Firebase Authentication", level: 78 },
      { name: "SQLite", level: 74 },
    ],
  },
  {
    id: "tools",
    title: "Tools",
    description: "Daily workflow",
    skills: [
      { name: "Git", level: 82 },
      { name: "GitHub", level: 82 },
      { name: "VS Code", level: 90 },
      { name: "Android Studio", level: 84 },
      { name: "Figma", level: 68 },
    ],
  },
];

export const currentlyLearning = [
  "Advanced Flutter",
  "System Design",
  "DSA",
  "AI/LLMs",
];
