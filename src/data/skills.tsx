
export const GROUP_SKILLS = [
  { "id": "languages", "label": "Languages", "icon": "Code2" },
  { "id": "frontend", "label": "Frontend", "icon": "Layout" },
  { "id": "backend", "label": "Backend", "icon": "Server" },
  { "id": "devops", "label": "DevOps", "icon": "Infinity" },
  { "id": "cloud", "label": "Cloud", "icon": "Cloud" },
  { "id": "tools", "label": "Tools", "icon": "Wrench" },
  { "id": "ai_ml", "label": "AI/ML", "icon": "Cpu" },
  { "id": "others", "label": "Others", "icon": "MoreHorizontal" }
]

export const MY_SKILLS = [
  // languages
  { "id": "javascript", "label": "JavaScript", "group": "languages" },
  { "id": "typescript", "label": "TypeScript", "group": "languages" },
  { "id": "python", "label": "Python", "group": "languages" },
  { "id": "dart", "label": "Dart", "group": "languages" },
  { "id": "c", "label": "C", "group": "languages" },
  { "id": "c-plus-plus", "label": "C++", "group": "languages" },
  { "id": "sql", "label": "SQL", "group": "languages" },
  { "id": "t-sql", "label": "T-SQL", "group": "languages" },

  // frontend
  { "id": "html", "label": "HTML", "group": "frontend" },
  { "id": "css", "label": "CSS", "group": "frontend" },
  { "id": "react-js", "label": "React.JS", "group": "frontend" },
  { "id": "flutter", "label": "Flutter", "group": "frontend" },
  { "id": "tailwind-css", "label": "Tailwind CSS", "group": "frontend" },
  { "id": "bootstrap-css", "label": "Bootstrap", "group": "frontend" },
  { "id": "vite", "label": "Vite", "group": "frontend" },

  // backend
  { "id": "node-js", "label": "Node.js", "group": "backend" },
  { "id": "express-js", "label": "Express.js", "group": "backend" },
  { "id": "typeorm", "label": "TypeORM", "group": "backend" },
  { "id": "mysql", "label": "MySQL", "group": "backend" },
  { "id": "postgresql", "label": "PostgreSQL", "group": "backend" },
  { "id": "firebase", "label": "Firebase", "group": "backend" },
  { "id": "cloud-firestore", "label": "Cloud Firestore", "group": "backend" },
  { "id": "rest-api", "label": "REST API", "group": "backend" },
  { "id": "open-api", "label": "OpenAPI", "group": "backend" },
  { "id": "auth-jwt", "label": "Auth (JWT)", "group": "backend" },
  { "id": "odoo", "label": "Odoo", "group": "backend" },

  // devops
  { "id": "git", "label": "Git", "group": "devops" },
  { "id": "github", "label": "GitHub", "group": "devops" },
  { "id": "vercel", "label": "Vercel", "group": "devops" },
  { "id": "render", "label": "Render", "group": "devops" },

  // tools
  { "id": "vs-code", "label": "VS Code", "group": "tools" },
  { "id": "postman", "label": "Postman", "group": "tools" },
  { "id": "figma", "label": "Figma", "group": "tools" },
  { "id": "canva", "label": "Canva", "group": "tools" },
  { "id": "clickup", "label": "ClickUp", "group": "tools" },
  { "id": "notion", "label": "Notion", "group": "tools" },
  { "id": "ms-power-bi", "label": "MS Power BI", "group": "tools" },
  { "id": "ms-power-automate", "label": "Power Automate", "group": "tools" },

  // others
  { "id": "agile-scrum", "label": "Agile/Scrum", "group": "others" },
  { "id": "ms-office", "label": "MS Office", "group": "others" },
  { "id": "google-workspace", "label": "Google Workspace", "group": "others" },
  { "id": "markdown", "label": "Markdown", "group": "others" },
  { "id": "latex", "label": "LaTeX", "group": "others" }
]

export const skills = Object.fromEntries(
  MY_SKILLS.map(skill => [skill.id, skill.label])
);
