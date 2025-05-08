import { defineConfig } from 'dumi';

export default defineConfig({
  outputPath: 'docs-dist',
  themeConfig: {
    name: 'url-state',
    footer: 'Powered by houkunlin',
    socialLinks: {
      github: 'https://github.com/houkunlin/use-url-state',
    }
  },
  cssLoader: {},
  lessLoader: {},
  autoCSSModules: true,
});
