---
title: "Building with Gatsby"
date: "2019-08-06"
---

This blog is now built with [Gatsby](https://www.gatsbyjs.org/), a free and open source static-site generator powered by React and GraphQL. Gatsby provides a framework for building modern, performant, production-ready websites that can be hosted anywhere as static files, with no need for a database or backend server.

Static-site generators are popular for this reason, because they don't need a backend server, so they are faster and require less maintenance than a website that needs its own database to generate pages server-side for clients. There are quite a few [static-site generators](https://staticsitegenerators.net/) out there. This blog was previously built with [Jekyll](https://jekyllrb.com/), and I do still appreciate its philosophy, as it simply ["does what you tell it to do — no more, no less."](https://github.com/jekyll/jekyll#philosophy)

I found myself wanting to do things with React and GraphQL, though, so I decided to give Gatsby a try. React can be worked into any static-site generator, as I was using it before with Jekyll, but Gatsby is powered by JavaScript and React, so it makes things a bit more cohesive.

After overcoming a bit of a learning curve, I had a lot of fun getting started with Gatsby. I began with the [`gatsby-starter-blog`](https://github.com/gatsbyjs/gatsby-starter-blog) and borrowed some code from [`overreacted.io`](https://github.com/gaearon/overreacted.io) to handle theming.  I then made a new [`Navbar`](https://github.com/tmshkr/tmshkr.com/blob/master/src/components/navbar.js) using React Hooks and included some new styling.

I did run into an issue while migrating my blog posts from Jekyll. I was using `script` tags in the markdown for a [blog post](/blog/data-visualization/), because it worked with Jekyll in order to include a d3.js chart. Gatsby wasn't allowing the scripts to execute, so I modified the [`BlogPostTemplate`](https://github.com/tmshkr/tmshkr.com/blob/master/src/templates/blog-post.js) component to allow injecting the scripts specified in the [`markdown`](https://github.com/tmshkr/tmshkr.com/blob/master/content/blog/data-visualization/index.md) frontmatter:

```javascript
class BlogPostTemplate extends React.Component {
  componentDidMount() {
    const { scripts } = this.props.data.markdownRemark.frontmatter
    if (scripts) {
      const allowed = {
        "https://cdnjs.cloudflare.com/ajax/libs/d3/5.7.0/d3.min.js":
          "sha384-HL96dun1KbYEq6UT/ZlsspAODCyQ+Zp4z318ajUPBPSMzy5dvxl6ziwmnil8/Cpd",
        "gdp.js":
          "sha384-t0+qGnjixk2g7n49JRle9Ebcoir6hFIL7n5DVhLS41KcSsu/Y1wdILbHSGuOU4fD",
      }

      scripts.forEach(s => {
        if (allowed.hasOwnProperty(s[0]) && allowed[s[0]] === s[1]) {
          const script = document.createElement("script")
          script.async = false
          script.crossOrigin = "anonymous"
          script.integrity = s[1]
          script.src = s[0]
          script.type = "text/javascript"
          document.getElementsByTagName("main")[0].appendChild(script)
        }
      })
    }
  }
  // etc...
}
```

`componentDidMount` injects the scripts specified in the frontmatter, after checking that it is an __allowed script__ (otherwise it could just inject any script, so this would be important, e.g., if an attacker was somehow able to modify the json which specifies the scripts to be loaded). `script.async = false` makes the browser execute the scripts in the order they are injected into the DOM. The chart in `gdp.js` depends on `d3.min.js` so they must be executed in order. It doesn't make sense to bundle them when they are only needed for one blog post, so this code lazy-loads the scripts as necessary. Gatsby can also handle [code splitting](https://www.gatsbyjs.org/docs/how-code-splitting-works/), but I found the way described above to be effective in this particular use case.

Of course, security measures like this on the frontend client can only do so much, since the browser’s environment can be affected by any number of unknown factors, but it seems that if one is going to create an opening into their code, they should also make sure to secure it.

