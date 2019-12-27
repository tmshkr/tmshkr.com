require("dotenv").config()

const gatsbyRemarkPlugins = [
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
  {
    resolve: "gatsby-remark-mermaid",
    options: {
      theme: "forest",
      mermaidOptions: {
        sequence: {
          useMaxWidth: true,
        },
      },
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
      resolve: "gatsby-source-wordpress",
      options: {
        baseUrl: process.env.WP_HOSTNAME,
        protocol: "https",
        hostingWPCOM: false,
        useACF: false,
        includedRoutes: [
          "**/categories",
          "**/posts",
          "**/pages",
          "**/media",
          "**/tags",
          "**/taxonomies",
        ],
      },
    },
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: gatsbyRemarkPlugins,
      },
    },
    {
      resolve: `gatsby-plugin-mdx`,
      options: {
        gatsbyRemarkPlugins,
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
        trackingId: process.env.GA_TRACKING_ID,
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
  proxy: {
    prefix: "/.netlify/functions",
    url: "http://localhost:9000",
  },
}

if (process.env.NODE_ENV === "development") {
  config.plugins.push({
    resolve: `gatsby-source-filesystem`,
    options: {
      path: `${__dirname}/drafts/`,
      name: `drafts`,
    },
  })
}

module.exports = config
