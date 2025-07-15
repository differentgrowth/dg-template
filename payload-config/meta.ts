import type { Config } from 'payload';

export const meta: NonNullable<Config['admin']>['meta'] = {
  titleSuffix: '| Different Growth',
  title: 'Creando algo diferente',
  description:
    'En Different Growth, te ayudamos a impulsar el crecimiento de tu marca con soluciones digitales. Desde diseño web a medida hasta estrategias SEO.',
  icons: [
    {
      rel: 'icon',
      type: 'image/x-icon',
      url: '/icon.ico',
    },
  ],
  openGraph: {
    title: 'Creando algo diferente',
    description:
      'En Different Growth, te ayudamos a impulsar el crecimiento de tu marca con soluciones digitales. Desde diseño web a medida hasta estrategias SEO.',
    images: [
      {
        height: 600,
        url: '/public/opengraph-image.png',
        width: 800,
      },
    ],
  },
};
