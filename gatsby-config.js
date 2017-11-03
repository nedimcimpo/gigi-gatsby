module.exports = {
  siteMetadata: {
    title: 'Gigi School of Coding',
    url: 'http://gigischool.mistral.ba',
    description: 'The new season of Gigi School of Coding is Near, and here is everything you need to know about it.',
  },
  airTable: {
    endpointUrl: 'https://api.airtable.com',
    apiKey: 'keyEPd0DvAaDqDmuC',
    base: 'appRGZBf5KHDlUley',
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
