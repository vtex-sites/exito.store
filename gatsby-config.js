const getStaticPaths = () => require('./staticPaths.json')

module.exports = {
  siteMetadata: {
    author: 'Emerson Laurentino',
  },
  plugins: [
    {
      resolve: require.resolve('@vtex/gatsby-theme-vtex'),
      options: {
        title: 'Bisco industries',
        description: 'Bisco industries',
        getStaticPaths,
      },
    },
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        name: 'Bisco industries',
        short_name: 'Bisco.ind',
        start_url: '/',
        background_color: '#0a034e',
        theme_color: '#0a034e',
        display: 'minimal-ui',
      },
    },
    {
      // This plugin works in conjunction with the
      // '@vtex/gatsby-theme-vtex' and sources the cms's json files
      resolve: require.resolve('gatsby-source-filesystem'),
      options: {
        path: './src/cms/',
      },
    },
    {
      resolve: require.resolve('gatsby-plugin-netlify'),
      options: {
        headers: {
          '/preview': [
            'Content-Security-Policy: frame-src https://*.myvtex.com/',
          ],
        },
        transformHeaders: (headers, path) => {
          const DEFAULT_SECURITY_HEADERS = [
            'X-XSS-Protection: 1; mode=block',
            'X-Content-Type-Options: nosniff',
            'Referrer-Policy: same-origin',
          ]

          return path.includes('/preview')
            ? [...DEFAULT_SECURITY_HEADERS, ...headers]
            : ['X-Frame-Options: DENY', ...DEFAULT_SECURITY_HEADERS, ...headers]
        },
        mergeSecurityHeaders: false,
        generateMatchPathRewrites: true,
      },
    },
    {
      resolve: require.resolve('@vtex/gatsby-plugin-vtex-nginx'),
      options: {
        transformHeaders: (headers, path) => {
          const DEFAULT_SECURITY_HEADERS = [
            'X-XSS-Protection: 1; mode=block',
            'X-Content-Type-Options: nosniff',
            'Referrer-Policy: same-origin',
          ]
          return path.includes('/preview')
            ? [...DEFAULT_SECURITY_HEADERS, 'Content-Security-Policy: frame-src https://*.myvtex.com/', ...headers]
            : ['X-Frame-Options: DENY', ...DEFAULT_SECURITY_HEADERS, ...headers]
        },
      }
    },
  ],
}
