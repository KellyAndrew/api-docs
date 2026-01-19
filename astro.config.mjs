import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

export default defineConfig({
  site: 'https://docs.andrewkelly.de',
  integrations: [
    starlight({
      title: 'My Docs',

      nav: [
        { label: 'Main site', href: 'https://www.andrewkelly.de/' },
      ],

      social: [
        { icon: 'github', label: 'GitHub', href: 'https://github.com/KellyAndrew/api-docs' },
      ],

      sidebar: [
        {
          label: 'Start here',
          items: [
            { label: 'Overview', slug: '' },
            { label: 'Quickstart', slug: 'quickstart' },
            { label: 'Authentication', slug: 'authentication' },
            { label: 'Errors', slug: 'errors' },
          ],
        },
        {
          label: 'Concepts',
          items: [
            { label: 'Core concepts', slug: 'concepts/core-concepts' },
            { label: 'Security considerations', slug: 'concepts/security-considerations' },
          ],
        },
        {
          label: 'Guides',
          items: [
            { label: 'Rate limits', slug: 'guides/rate-limits' },
            { label: 'Webhooks', slug: 'guides/webhooks' },
          ],
        },
        {
          label: 'Reference',
          items: [{ label: 'Endpoints', slug: 'reference/endpoints' }],
        },
        {
          label: 'Help',
          items: [{ label: 'FAQ', slug: 'help/faq' }],
        },
      ],
    }),
  ],
});
