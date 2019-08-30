const remarkPlugins = [
  {
    resolve: "gatsby-remark-external-links",
    options: {
      target: "_blank",
      rel: "noopener noreferrer",
    },
  },
  {
    resolve: `gatsby-remark-images`,
    options: {
      maxWidth: 590,
    },
  },
  {
    resolve: `gatsby-remark-responsive-iframe`,
    options: {
      wrapperStyle: `margin-bottom: 1.0725rem`,
    },
  },
  `gatsby-remark-prismjs`,
  `gatsby-remark-copy-linked-files`,
  `gatsby-remark-smartypants`,
]

const config = {
  siteMetadata: {
    title: `tmshkr`,
    author: `Tim Shaker`,
    description: `Tim Shaker is a designer/developer based in Orange County, California.`,
    siteUrl: `https://www.tmshkr.com/`,
    social: {
      twitter: `tmshkr`,
    },
  },
  plugins: [
    {
      resolve: "gatsby-plugin-web-font-loader",
      options: {
        custom: {
          families: ["Merriweather"],
        },
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/content/`,
        name: `content`,
      },
    },
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: remarkPlugins,
      },
    },
    {
      resolve: `gatsby-plugin-mdx`,
      options: {
        gatsbyRemarkPlugins: remarkPlugins,
      },
    },
    `gatsby-plugin-emotion`,
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: "gatsby-plugin-react-svg",
      options: {
        rule: {
          include: /\.svg$/,
        },
      },
    },
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        trackingId: `UA-123790385-1`,
      },
    },
    `gatsby-plugin-feed`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `tmshkr.com`,
        short_name: `tmshkr.com`,
        start_url: `/`,
        background_color: `#ffffff`,
        theme_color: `#01579b`,
        display: `minimal-ui`,
        icon: `content/assets/tmshkr.png`,
      },
    },
    `gatsby-plugin-offline`,
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-plugin-typography`,
      options: {
        pathToConfigModule: `src/utils/typography`,
      },
    },
    `gatsby-plugin-sass`,
    `gatsby-plugin-catch-links`,
  ],
}

process.argv.forEach(arg => {
  if (arg === "drafts") {
    config.plugins.push({
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/drafts/`,
        name: `drafts`,
      },
    })
  }
})

module.exports = config
