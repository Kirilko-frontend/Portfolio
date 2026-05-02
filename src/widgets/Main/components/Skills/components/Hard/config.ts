const skills = [
  {
    id: 1,
    title: 'Frontend',
    groups: [
      {
        title: 'Markup',
        items: [{ name: 'HTML' }, { name: 'JSX' }],
      },
      {
        title: 'Styling',
        items: [
          { name: 'CSS' },
          { name: 'Sass' },
          { name: 'TailwindCSS' },
          { name: 'Bootstrap' },
          { name: 'Responsive Design' },
          { name: 'Flexbox / Grid' },
        ],
      },
      {
        title: 'Frameworks & State',
        items: [
          { name: 'React' },
          { name: 'Redux' },
          { name: 'Redux Toolkit' },
          { name: 'SolidJS' },
        ],
      },
      {
        title: 'Language',
        items: [{ name: 'TypeScript' }, { name: 'JavaScript' }],
      },
    ],
  },

  {
    id: 2,
    title: 'Backend',
    groups: [
      {
        title: 'Runtime & Framework',
        items: [{ name: 'Node.js' }, { name: 'Express' }],
      },
      {
        title: 'Database',
        items: [{ name: 'MongoDB' }],
      },
      {
        title: 'API',
        items: [
          { name: 'REST API' },
          { name: 'Swagger' },
          { name: 'Axios' },
          { name: 'Fetch API' },
        ],
      },
    ],
  },
  {
    id: 3,
    title: 'Other',
    groups: [
      {
        title: 'Tools',
        items: [
          { name: 'Git' },
          { name: 'GitHub' },
          { name: 'Vite' },
          { name: 'Figma' },
          { name: 'NPM' },
          { name: 'VS Code' },
          { name: 'Cursor' },
        ],
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
          { name: 'English Intermediate' },
          { name: 'Russian Native' },
          { name: 'Ukrainian Native' },
          { name: 'Polish Intermediate' },
        ],
      },
    ],
  },
];

export default {
  skills,
};
