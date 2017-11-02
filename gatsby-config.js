module.exports = {
  siteMetadata: {
    title: 'Oliver Benns',
    url: 'https://oliverbenns.com',
    description:
      'Oliver Benns is a freelance web developer working with individuals and agencies across the world.',
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
