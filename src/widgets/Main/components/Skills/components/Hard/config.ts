const skills = [
  {
    id: 1,
    title: 'Frontend',
    groups: [
      {
        title: 'Language',
        items: [{ name: 'TypeScript' }, { name: 'JavaScript (ES6+)' }],
      },
      {
        title: 'Frameworks & State',
        items: [
          { name: 'React' },
          { name: 'SolidJS' },
          { name: 'Next.js' },
          { name: 'Redux Toolkit' },
          { name: 'React Router' },
          { name: 'i18next' },
        ],
      },
      {
        title: 'Styling',
        items: [
          { name: 'HTML5' },
          { name: 'CSS3' },
          { name: 'SCSS / Sass' },
          { name: 'SCSS Modules' },
          { name: 'Tailwind CSS' },
          { name: 'Responsive Design' },
        ],
      },
      {
        title: 'Real-time & Motion',
        items: [{ name: 'WebSocket' }, { name: 'GSAP' }, { name: 'Figma to code' }],
      },
    ],
  },

  {
    id: 2,
    title: 'Backend',
    groups: [
      {
        title: 'Runtime & Framework',
        items: [{ name: 'Node.js' }, { name: 'NestJS' }, { name: 'Express' }],
      },
      {
        title: 'Database',
        items: [{ name: 'PostgreSQL' }, { name: 'Prisma' }, { name: 'SQL' }, { name: 'MongoDB' }],
      },
      {
        title: 'API & Auth',
        items: [{ name: 'REST API' }, { name: 'JWT' }, { name: 'Swagger' }, { name: 'Axios' }],
      },
    ],
  },
  {
    id: 3,
    title: 'Other',
    groups: [
      {
        title: 'Tools & Deploy',
        items: [
          { name: 'Git' },
          { name: 'GitHub' },
          { name: 'Vite' },
          { name: 'Docker' },
          { name: 'Figma' },
          { name: 'Vercel' },
          { name: 'Render' },
        ],
      },
      {
        title: 'AI-assisted development',
        items: [{ name: 'Claude Code' }, { name: 'GitHub Copilot' }, { name: 'Cursor' }],
      },
    ],
  },
  {
    id: 4,
    title: 'Languages',
    groups: [
      {
        title: 'Language',
        items: [
          { name: 'Ukrainian Native' },
          { name: 'Russian Native' },
          { name: 'Polish Professional' },
          { name: 'English B1' },
        ],
      },
    ],
  },
];

export default {
  skills,
};
