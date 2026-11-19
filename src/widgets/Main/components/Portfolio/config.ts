import preview1 from '/projects-videos/project-1.mp4';
import preview2 from '/projects-videos/project-2.mp4';
import preview3 from '/projects-videos/project-3.mp4';
import poster1 from '/projects-videos/project-1.jpg';
import poster2 from '/projects-videos/project-2.jpg';
import poster3 from '/projects-videos/project-3.jpg';

const projects = [
  {
    id: 1,
    title: 'Rental car',
    date: 'portfolio.date1',
    linkGithub: 'https://github.com/Kirilko-frontend/RentalCar',
    linkDemo: 'https://rental-car-eight.vercel.app/',
    preview: preview1,
    poster: poster1,
  },
  {
    id: 2,
    title: 'DIVelopers',
    date: 'portfolio.date2',
    linkGithub: 'https://github.com/kulakaa073/DIVelopers-js-project',
    linkDemo: 'https://kulakaa073.github.io/DIVelopers-js-project/',
    preview: preview2,
    poster: poster2,
  },
  {
    id: 3,
    title: 'Positivius',
    date: 'portfolio.date3',
    linkGithub: 'https://github.com/Kirilko-frontend/Positivius',
    linkDemo: 'https://kirilko-frontend.github.io/Positivius/',
    preview: preview3,
    poster: poster3,
  },
];

export default {
  projects,
  githubProfile: 'https://github.com/Kirilko-frontend',
};
