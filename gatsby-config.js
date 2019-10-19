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
        /*
         * The base URL of the WordPress site without the trailingslash and the protocol. This is required.
         * Example : 'gatsbyjsexamplewordpress.wordpress.com' or 'www.example-site.com'
         */
        baseUrl: process.env.WP_HOSTNAME,
        // The protocol. This can be http or https.
        protocol: "https",
        // Indicates whether the site is hosted on wordpress.com.
        // If false, then the assumption is made that the site is self hosted.
        // If true, then the plugin will source its content on wordpress.com using the JSON REST API V2.
        // If your site is hosted on wordpress.org, then set this to false.
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
