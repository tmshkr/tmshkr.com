/*
https://joelhooks.com/a-handy-npm-script-for-creating-a-new-gatsby-blog-post
*/

const fs = require("fs")
const slugify = require("slug")
const dateFns = require("date-fns")

const title = process.argv[2]
if (!title) {
  return console.error("a title is required!")
}

const slug = slugify(title.toLowerCase())
const date = dateFns.format(new Date(), "yyyy-MM-dd")
const dir = `./drafts/blog/${slug}`

if (fs.existsSync(dir)) {
  return console.error("That post already exists!")
} else {
  fs.mkdirSync(dir)
}

fs.writeFile(
  `${dir}/index.md`,
  `---
title: "${title}"
date: "${date}"
---`,
  function(err) {
    if (err) {
      return console.error(err)
    }
    console.log(`${title} was created!`)
  }
)
