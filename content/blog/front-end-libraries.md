---
title: "Mastering React"
subtitle: "Through freeCodeCamp's Front End Libraries Certification"
date: "2019-01-24"
---

I recently completed the Front End Libraries certification program offered by freeCodeCamp:

<a href="https://www.freecodecamp.org/certification/tmshkr/front-end-libraries" alt="Front End Libraries Certification" target="_blank">
<img src="../assets/blog/images/fcc-frontend-libraries-cert.png" />
</a>

I learned a lot. It was a great opportunity to practice my frontend skills, especially with React. I've been tinkering with React for awhile, through online learning resources and projects, so it was mostly reinforcing what I was already familiar with, in order to develop my skills to a professional level. I used React for all of the projects:

- [Quote Machine](https://codepen.io/tmshkr/full/XoZzvR)
- [Drum Machine](https://codepen.io/tmshkr/full/WLzBNG)
- [Markdown Previewer](https://codepen.io/tmshkr/full/dwmNaZ)
- [Calculator](https://codepen.io/tmshkr/full/OrEbEM)
- [Pomodoro Timer](https://codepen.io/tmshkr/full/Orajrg)

React is definitely my favorite thing about web development right now. It makes it fun and easy to make engaging and interactive user interfaces through React's reusable component architecture, which defines how DOM elements are rendered to a page, making web applications more organized and performant.

It does this through what is called the **Virtual DOM** --- a lightweight representation of actual DOM elements in memory, to determine how DOM elements should be updated. The React way of doing things is to modify JSX elements through React, which then renders these representations to actual HTML DOM elements on a webpage, rather than updating DOM elements directly (which can take a toll on performance and is a pain to code). Things happen in React by modifying the application's **state** --- a special JavaScript object in React, used to keep track of data in the application. State is updated with `this.setState` which causes the component to update, so that it re-renders the component and performs any associated lifecycle methods --- for example, `componentDidUpdate` fires every time after the component renders.

This merely scratches the surface of React, but with this basic knowledge, one can begin to create useful and powerful web applications, especially with the help of a backend service. I took the opportunity to improve and extend my freeCodeCamp Pomodoro Timer with backend functionality through Firebase, so that it can sync application state, keeping track of sessions between multiple desktop and mobile devices --- affording the user with the ability, for example, to start a session on their desktop browser and then pause it on their phone.

You can try it out at [focus-on-this.firebaseapp.com](https://focus-on-this.firebaseapp.com/). It's a work in progress, and there are more improvements I'd like to make (perhaps making it into a React Native mobile app). For now, it works quite well as a simple pomodoro timer (though there may still be some issues that need to be resolved).
