const skills = {
  grid: {
    columns: 6,
    rows: 5,
    gap: 2,
  },
  blocks: [
    {
      // div1
      grid: { column: 'span 3', row: 'span 2', columnStart: 1, rowStart: 1 },
      itemsGrid: { column: 'span 1', row: 'span 1', gap: 2 },
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
      // div2
      grid: { column: 'span 3', row: 'span 2', columnStart: 4, rowStart: 1 },
      itemsGrid: { column: 'span 1', row: 'span 1', gap: 2 },
      items: [
        { title: 'CSS' },
        { title: 'SCSS' },
        { title: 'Tailwind' },
        { title: 'Bootstrap' },
        { title: 'BEM' },
      ],
    },
    {
      // div3
      grid: { column: 'span 3', row: 'span 2', columnStart: 1, rowStart: 3 },
      itemsGrid: { column: 'span 1', row: 'span 1', gap: 2 },
      items: [
        { title: 'Node.js' },
        { title: 'Express' },
        { title: 'MongoDB' },
        { title: 'REST API' },
        { title: 'WebSocket' },
      ],
    },
    {
      // div4
      grid: { column: 'span 3', row: 'span 2', columnStart: 4, rowStart: 3 },
      itemsGrid: { column: 'span 1', row: 'span 1', gap: 2 },
      items: [
        { title: 'React Router' },
        { title: 'React Hook Form' },
        { title: 'Axios' },
        { title: 'Formik' },
        { title: 'Yup' },
      ],
    },
    {
      // div5
      grid: { column: 'span 6', row: 'span 1', columnStart: 1, rowStart: 5 },
      itemsGrid: { column: 'span 1', row: 'span 1', gap: 2 },
      items: [
        { title: 'Git' },
        { title: 'Vite' },
        { title: 'Figma' },
        { title: 'VS Code' },
        { title: 'Cursor' },
      ],
    },
  ],
};

export default {
  skills,
};
