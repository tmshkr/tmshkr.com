---
title: "Data Visualization"
subtitle: "with D3.js"
scripts: ["https://cdnjs.cloudflare.com/ajax/libs/d3/5.7.0/d3.min.js", '/gdp.js']
date: "2018-10-24"
---

I've recently learned some valuable skills, building upon previous knowledge in
web development, by completing the Data Visualization
Certification program offered by [freeCodeCamp](https://learn.freecodecamp.org/).

[![cert](/fcc-dataviz-cert.png)](https://www.freecodecamp.org/certification/tmshkr/data-visualization)

Data visualization is simply the visual representation of information, e.g.,
charts, graphs, tables, and so forth, which makes it easier for humans to interpret
and reason about data in order to make informed decisions. For example, one might
reasonably assume that the upward trend in GDP, which has lasted for over 65 years
as demonstrated in the chart below, will likely continue to persist in the future:

<style>
#gdp {
  text-align: center;
  font-family: sans-serif;
  color: #fff;
}

#gdp svg {
  transform: translateX(-40px);
}

rect.bar {
  fill: #007f80;
}

#tooltip {
  position: absolute;
  font-family: sans-serif;
  text-align: center;
  padding: 0.5em;
  white-space: nowrap;
  background-color: #00f;
  visibility: hidden;
  opacity: 0;
}

#tooltip text {
  display: block;
}

@media screen and (max-width: 960px) {
  
  #gdp div {
    overflow-x: scroll;
  }
  #gdp svg {
  transform: none;
}
}
</style>
<div id="gdp">
  <h1 id="title">United States GDP</h1>
</div>

Based on such a reasonable assumption, that the monetary value of goods and services
produced by the United States will continue to grow, rational agents can make informed financial
decisions, e.g., to hire employees, purchase a home, and so forth. Of course this
could also be accomplished with raw data, but when
data is presented in a visually engaging format, certain trends and patterns become
much more apparent (and much more enjoyable to work with).

The certification program involved several different kinds of data visualization
projects, which are available to view and fork on my [CodePen](https://codepen.io/tmshkr/) profile:

- [Bar Chart](https://codepen.io/tmshkr/pen/aRmPxz) (displayed above)
- [Heat Map](https://codepen.io/tmshkr/pen/bmqKNW)
- [Scatter Plot](https://codepen.io/tmshkr/pen/qJrZJZ)
- [Choropleth Map](https://codepen.io/tmshkr/pen/EdbQBQ)
- [Tree Map](https://codepen.io/tmshkr/pen/zmWYMp)

While I'm by no means a D3 master at this point, the program did get me thoroughly
acquainted with the D3 API, so that I have a solid understanding of the basics:
setting up axes, scales, working with datasets, and rendering data with the SVG
coordinate system. I am most grateful to freeCodeCamp for making these exercises
available, so that I could become competent with this popular and
useful JavaScript library in a relatively short period of time.

Knowledge is useless if it can't be accessed, and through techniques like data
visualization, information can be made much more accessible and digestible,
so that it can become more widely useful. This is a valuable skill that I am
excited to be learning.
