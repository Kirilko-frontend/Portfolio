const block = (id: number, items: number, hasStack = true) => ({
  id,
  role: `experience.role${id}`,
  company: `experience.company${id}`,
  period: `experience.period${id}`,
  stack: hasStack ? `experience.stack${id}` : '',
  description: Array.from({ length: items }, (_, i) => `experience.item${id}-description${i + 1}`),
});

// Сверху — самое свежее место работы
const experienceBlocks = [
  block(1, 4), // emdula
  block(2, 6), // Verba GTA
  block(3, 4), // фриланс
  block(4, 5, false), // GoIT
];

export default {
  experienceBlocks,
};
