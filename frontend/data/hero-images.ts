/** Paths under `public/Hero/` — grouped by page prefix; include every numbered asset for that page. */
export const heroImagesByPage = {
  home: [
    '/Hero/Home1.jpeg',
    '/Hero/Home2.jpeg',
  ],
  about: [
    '/Hero/About1.jpeg',
    '/Hero/About2.jpeg',
    '/Hero/About3.jpeg',
  ],
  clients: [
    '/Hero/Client1.jpeg',
    '/Hero/Client2.jpeg',
    '/Hero/Client3.jpeg',
    '/Hero/Client4.jpeg',
  ],
  projects: [
    '/Hero/Project1.jpeg',
    '/Hero/Project2.jpeg',
    '/Hero/Project3.jpeg',
    '/Hero/Project4.jpeg',
    '/Hero/Project5.jpeg',
  ],
  services: [
    '/Hero/Service1.jpeg',
    '/Hero/Service2.jpeg',
    '/Hero/Service3.jpeg',
    '/Hero/Service4.jpeg',
    '/Hero/Service5.jpeg',
  ],
  team: [
    '/Hero/Team1.jpeg',
    '/Hero/Team2.jpeg',
  ],
  contact: ['/Hero/Contact1.jpeg'],
} as const;

export type HeroPageKey = keyof typeof heroImagesByPage;
