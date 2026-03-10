const skills = {
  grid: {
    columns: 6,
    rows: 5,
  },

  blocks: [
    {
      id: 1,
      grid: { column: 'span 3', row: 'span 2', columnStart: 1, rowStart: 1 },
      itemsGrid: { columns: 3, rows: 2 },
      items: [
        { title: 'HTML' },
        { title: 'JavaScript' },
        { title: 'TypeScript' },
        { title: 'React' },
        { title: 'Redux' },
        { title: 'Solid.js' },
      ],
    },
    {
      id: 2,
      grid: { column: 'span 3', row: 'span 2', columnStart: 4, rowStart: 1 },
      itemsGrid: { columns: 3, rows: 2 },
      items: [
        { title: 'CSS' },
        { title: 'SCSS' },
        { title: 'Tailwind' },
        { title: 'Bootstrap' },
        { title: 'BEM' },
        { title: 'CSS Modules' },
      ],
    },
    {
      id: 3,
      grid: { column: 'span 3', row: 'span 2', columnStart: 1, rowStart: 3 },
      itemsGrid: { columns: 3, rows: 2 },
      items: [
        { title: 'Node.js' },
        { title: 'Express' },
        { title: 'MongoDB' },
        { title: 'REST API' },
        { title: 'WebSocket' },
        { title: 'JWT Auth' },
      ],
    },
    {
      id: 4,
      grid: { column: 'span 3', row: 'span 2', columnStart: 4, rowStart: 3 },
      itemsGrid: { columns: 3, rows: 2 },
      items: [
        { title: 'React Router' },
        { title: 'React Hook Form' },
        { title: 'React Context' },
        { title: 'Axios' },
        { title: 'Formik' },
        { title: 'Yup' },
      ],
    },
    {
      id: 5,
      grid: { column: 'span 6', row: 'span 1', columnStart: 1, rowStart: 5 },
      itemsGrid: { columns: 10, rows: 1 },
      items: [
        { title: 'Git' },
        { title: 'GitHub' },
        { title: 'Vite' },
        { title: 'Figma' },
        { title: 'VS Code' },
        { title: 'Cursor' },
        { title: 'npm' },
        { title: 'Postman' },
        { title: 'Chrome DevTools' },
        { title: 'CLI / Terminal' },
      ],
    },
  ],
};

export default {
  skills,
};
