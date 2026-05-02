import preview1 from '/public/projects-videos/project-1.mp4';
import preview2 from '/public/projects-videos/project-2.mp4';
import preview3 from '/public/projects-videos/project-3.mp4';

const projects = [
  {
    id: 1,
    title: 'Rental car',
    description: 'portfolio.project1-description',
    date: 'portfolio.date1',
    linkGithub: 'https://github.com/Kirilko-frontend/RentalCar',
    linkDemo: 'https://rental-car-eight.vercel.app/',
    position: 'left',
    preview: preview1,
  },
  {
    id: 2,
    title: 'DIVelopers',
    description: 'portfolio.project2-description',
    date: 'portfolio.date2',
    linkGithub: 'https://github.com/kulakaa073/DIVelopers-js-project',
    linkDemo: 'https://kulakaa073.github.io/DIVelopers-js-project/',
    position: 'right',
    preview: preview2,
  },
  {
    id: 3,
    title: 'Positivius',
    description: 'portfolio.project3-description',
    date: 'portfolio.date3',
    linkGithub: 'https://github.com/Kirilko-frontend/Positivius',
    linkDemo: 'https://kirilko-frontend.github.io/Positivius/',
    position: 'left',
    preview: preview3,
  },
];

export default {
  projects,
};
