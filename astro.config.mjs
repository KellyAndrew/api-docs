import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

export default defineConfig({
  site: 'https://andrewkelly.github.io',
  base: '/api-docs',
  integrations: [
    starlight({
      title: 'My Docs',
      social: [
        { icon: 'github', label: 'GitHub', href: 'https://github.com/withastro/starlight' }
      ],
      pagination: true,
      customCss: ['./src/styles/custom.css'],
      sidebar: [
        {
          label: 'Start here',
          items: [
            { label: 'Quickstart', slug: 'quickstart' },
            { label: 'Authentication', slug: 'auth' },
            { label: 'Example Guide', slug: 'guides/example' }
          ]
        },
        {
          label: 'Reference',
          autogenerate: { directory: 'reference' }
        }
      ]
    })
  ]
});
