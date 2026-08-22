export type Achievement = {
  id: string;
  category: "Hackathons" | "Certifications" | "Open Source";
  title: string;
  placeholder: boolean;
  detail: string;
};

export const achievements: Achievement[] = [
  {
    id: "hackathon-1",
    category: "Hackathons",
    title: "Hackathon participation — details coming soon",
    placeholder: true,
    detail: "Add your hackathon name, placement, and a one-line result here.",
  },
  {
    id: "cert-1",
    category: "Certifications",
    title: "Certification — details coming soon",
    placeholder: true,
    detail: "Add issuing platform and certificate title here.",
  },
  {
    id: "oss-1",
    category: "Open Source",
    title: "Open source contribution — details coming soon",
    placeholder: true,
    detail: "Add the repository and what you contributed here.",
  },
];
