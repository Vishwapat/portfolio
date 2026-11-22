/** facts about the owner, reused by pages, metadata and structured data */
export const profile = {
  firstName: "Vishwa",
  lastName: "Patel",
  headline: "Software engineer in training, shipping like a professional.",
  location: "Brampton, ON",
  coordinates: "43.73 N, 79.76 W",
  availability: "Open to 2027 internships and co-ops",
  school: "Western University",
  degree: "B.Sc. Computer Science, Specialization, Minor in Software Engineering",
  graduation: "2028",
} as const;

export interface Stat {
  value: string;
  label: string;
}

export const stats: readonly Stat[] = [
  { value: "4 yrs", label: "teaching a room of students" },
  { value: "50+", label: "members helped retain" },
  { value: "18", label: "tests guarding one engine" },
  { value: "1", label: "professional licence, earned while studying" },
];

export interface Chapter {
  index: string;
  title: string;
  period: string;
  body: readonly string[];
}

export const chapters: readonly Chapter[] = [
  {
    index: "01",
    title: "The mat",
    period: "2019 to 2023",
    body: [
      "My first job was teaching. For four years I co-instructed martial arts classes at the Academy of Martial Arts in Brampton, for students from young kids to adults, and helped keep more than fifty members coming back.",
      "Teaching a young kid and an adult the same technique in the same hour forces you to explain one idea five different ways. I still use that skill every time I write a README or a pull request.",
    ],
  },
  {
    index: "02",
    title: "The counter",
    period: "2022 to 2024",
    body: [
      "Two years at Fortinos, on the register and in the bakery, through the busiest shifts of the week. It is not glamorous work, but it is where I learned that reliability is a habit: you do the boring thing correctly every single time, especially when it is busy.",
    ],
  },
  {
    index: "03",
    title: "The licence",
    period: "2024 to now",
    body: [
      "I earned my LLQP licence while studying full time and now work as a licensed associate with World Financial Group. The job is translating complicated products into plain language for real people making real decisions.",
      "It is also where my first serious project came from. I kept doing the same reasoning across the table, so I went home and wrote it as code, with tests.",
    ],
  },
  {
    index: "04",
    title: "The code",
    period: "Now",
    body: [
      "I am a third year Computer Science student at Western University, specializing in CS with a minor in Software Engineering. I care about the parts of software people skip: tests, accessibility, performance and documentation.",
      "I have a small set of projects so far, and I would rather finish a few things properly than start many. Each one is public, so you can judge the work, not just the description.",
    ],
  },
];

export interface SkillGroup {
  label: string;
  items: readonly string[];
}

export const skills: readonly SkillGroup[] = [
  {
    label: "Languages",
    items: ["TypeScript", "JavaScript", "Python", "Java", "SQL", "C++", "C#", "HTML/CSS"],
  },
  {
    label: "Frameworks",
    items: ["React", "Next.js", "Node.js", "Express", "Django", "Tailwind CSS", "Flutter"],
  },
  { label: "Data", items: ["pandas", "NumPy", "scikit-learn", "matplotlib", "Streamlit"] },
  {
    label: "Tooling",
    items: ["Git", "GitHub Actions", "Vercel", "AWS", "PostgreSQL", "Jest", "Playwright", "LaTeX"],
  },
];
