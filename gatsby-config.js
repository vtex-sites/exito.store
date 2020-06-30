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
    },
    {
      resolve: require.resolve('gatsby-plugin-loadable-components-ssr'),
    },
  ],
}
