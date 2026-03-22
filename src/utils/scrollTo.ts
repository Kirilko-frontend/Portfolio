export const scrollTo = (target: string) => {
  const element = document.querySelector(target);

  if (!element) return;

  const yOffset = -80;
  const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;

  window.scrollTo({
    top: y,
    behavior: 'smooth',
  });
};
