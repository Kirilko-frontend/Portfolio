import {
  IconGitHub1,
  IconInstagram1,
  IconLinkedIn1,
  IconMail1,
  IconTelegram1,
} from '@shared/icons';

// Единый список соцсетей — используется в Header, About, Contact и Footer
export const socials = [
  {
    id: 'github',
    title: 'GitHub',
    href: 'https://github.com/Kirilko-frontend',
    icon: IconGitHub1,
  },
  {
    id: 'linkedin',
    title: 'LinkedIn',
    href: 'https://www.linkedin.com/in/kyrylo-kakulia-3557b9371/',
    icon: IconLinkedIn1,
  },
  {
    id: 'telegram',
    title: 'Telegram',
    href: 'https://t.me/scally1603',
    icon: IconTelegram1,
  },
  {
    id: 'instagram',
    title: 'Instagram',
    href: 'https://www.instagram.com/kirilos_16/',
    icon: IconInstagram1,
  },
  {
    id: 'email',
    title: 'Email',
    href: 'https://mail.google.com/mail/?view=cm&fs=1&to=kkir614@gmail.com',
    icon: IconMail1,
  },
];

export const EMAIL = 'kkir614@gmail.com';
