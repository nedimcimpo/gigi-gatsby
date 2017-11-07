module.exports = {
  siteMetadata: {
    title: 'Gigi School of Coding',
    // TODO - Deployment: Social media tags. If needed change the url. Does not need to be changed if we do not want to test social sharing
    url: 'http://gigischool.mistral.ba/',
    description: 'The new season of Gigi School of Coding is Near, and here is everything you need to know about it.',
  },
  plugins: [
    {
      resolve: 'gatsby-plugin-google-analytics',
      options: {
        trackingId: 'UA-109161458-1',
      },
    },
    {
      resolve: 'gatsby-plugin-sass',
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        path: `${__dirname}/src/pages`,
        name: 'pages',
      },
    },
    'gatsby-transformer-remark',
  ],
};
