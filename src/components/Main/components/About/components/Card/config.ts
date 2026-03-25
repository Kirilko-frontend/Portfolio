import { IconGitHub1, IconInstagram1, IconLinkedIn1, IconMail1, IconTelegram1 } from '@/icons';
import avatar from './assets/src/avatar.png';
import monkeyGif from './assets/src/monkey.gif';

const cardItems = [
  {
    id: 1,
    title: 'about.card-developer',
  },
  {
    id: 2,
    title: 'about.direction',
  },
  {
    id: 3,
    title: 'about.main-stack',
  },
  {
    id: 4,
    title: 'about.experience',
  },
  {
    id: 5,
    title: 'about.focus',
  },
  {
    id: 6,
    title: 'about.favorite-tech',
  },
  {
    id: 7,
    title: 'about.fun-fact',
  },
];

const links = [
  {
    id: 1,
    title: 'GitHub',
    href: 'https://github.com/Kirilko-frontend',
    icon: IconGitHub1,
  },
  {
    id: 2,
    title: 'LinkedIn',
    href: 'https://www.linkedin.com/in/kyrylo-kakulia-3557b9371/',
    icon: IconLinkedIn1,
  },
  {
    id: 3,
    title: 'Telegram',
    href: 'https://t.me/scally1603',
    icon: IconTelegram1,
  },
  {
    id: 4,
    title: 'Instagram',
    href: 'https://www.instagram.com/kirilos_16/',
    icon: IconInstagram1,
  },
  {
    id: 5,
    title: 'Email',
    href: 'https://mail.google.com/mail/?view=cm&fs=1&to=kkir614@gmail.com',
    icon: IconMail1,
  },
];

export default {
  cardItems,
  avatar,
  links,
  monkeyGif,
};
