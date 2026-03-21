const skills = {
  grid: {
    columns: 3,
    rows: 2,
  },

  items: [
    {
      title: 'Communication',
      grid: { col: 1, row: 1 },
      points: [
        'Explain complex things simply',
        'Ask questions when something is unclear',
        'Give clear and structured answers',
      ],
    },
    {
      title: 'Problem Solving',
      grid: { col: 2, row: 1 },
      points: [
        'Break tasks into smaller parts',
        'Search and test solutions independently',
        'Debug step by step instead of guessing',
      ],
    },
    {
      title: 'Work Approach',
      grid: { col: 1, row: 2, colSpan: 1 },
      points: [
        'Write clean and readable code',
        'Focus on understanding, not copying',
        'Refactor when necessary',
      ],
    },
    {
      title: 'Learning',
      grid: { col: 3, row: 1, colSpan: 1 },
      points: [
        'Learn new technologies quickly',
        'Use documentation as primary source',
        'Practice consistently',
      ],
    },
    {
      title: 'Teamwork',
      grid: { col: 2, row: 2, colSpan: 1 },
      points: [
        'Open to feedback and suggestions',
        'Respect team decisions',
        'Share knowledge when possible',
      ],
    },
    {
      title: 'Responsibility',
      grid: { col: 3, row: 2, colSpan: 1 },
      points: ['Meet deadlines', 'Communicate blockers early', 'Take ownership of tasks'],
    },
  ],
};

export default skills;
