module.exports = {
  siteMetadata: {
    title: 'Gigi School of Coding',
    url: 'https://gigischool.mistral.ba',
    description:
      'Gigi School of Coding official landing page',
  },
  plugins: [
    {
      resolve: 'gatsby-plugin-google-analytics',
      options: {
        trackingId: 'UA-42854706-1',
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
