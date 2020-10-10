---
title: "Simple Hiding Navbar"
github: "simple-hiding-navbar"
date: "2018-09-21"
---

I wrote this JavaScript for this site, so that it automatically hides or reveals the navigation bar at the top of the screen based on the user's scrolling behavior:

```javascript
let navbarVisible = true;
let prevScrollPos = window.pageYOffset;

function autoHideNavbar() {
  const currentScrollPos = window.pageYOffset;
  if (navbarVisible) {
    // scrolling down
    if (currentScrollPos - prevScrollPos > 10 && currentScrollPos > pageTop) {
      navbar.style.transform = `translateY(-100%)`;
      navbarVisible = false;
    }
  } else {
    // scrolling up  
    if (prevScrollPos - currentScrollPos > 20 || currentScrollPos < pageTop) {
      navbar.style.transform = `translateY(0)`;
      navbarVisible = true;
    }
  }
  prevScrollPos = currentScrollPos;
}
 ```

This makes it so that the viewer of the website can use the full screen to read
content, and if they want to navigate to another page in the site, all they have to do is scroll
up a bit.

It's based on these examples from [w3schools](https://www.w3schools.com/howto/howto_js_navbar_hide_scroll.asp)
and [CodyHouse](https://codyhouse.co/gem/auto-hiding-navigation). I took the best
of these two scripts and made a simple vanilla JS implementation, with only the essential parts.
It uses the `navbarVisible` boolean, declared outside of the function, to keep track of the navbar's state,
so that the `if` and `else if` codeblocks execute only when they
need to do something. Accordingly, it won't execute code to hide
or reveal the navbar when it's already in the appropriate state. This way the
`if` and `else if` codeblocks execute only when the navbar needs to change,
as determined by their respective conditions.

One of these conditions is that the difference between the user's previous and current
scroll positions must be greater than a predetermined buffer, to ignore slower scrolling.
This makes it less sensitive to smaller movements, so that it only does something
when the user is quickly scrolling up or down, and not from a small random swipe.
The scroll buffer improves the user's experience by not having the navbar get in the
way when they didn't mean to scroll up, or when they only wanted to scroll up
a bit to view something earlier in the page. The buffers for scrolling up or down
are set to different values, so that it gets out of the way easily, and only
pops back into view when the user wants it to. `pageTop` is set equal to 1/4 the
height of the window, so that the navbar is always visible when scrolling near the
top of the page.

To improve performance, the animation for hiding or revealing the navbar is handled
by `requestAnimationFrame` if the browser supports it.
This ensures that the CSS animation begins when the browser is ready for it:

```javascript
  if (window.requestAnimationFrame) {
    window.onscroll = () => {
      requestAnimationFrame(autoHideNavbar);
    };
  } else {
    window.onscroll = autoHideNavbar;
  }
```

The navbar is also responsive, so that the links collapse into a dropdown menu
for smaller screen sizes. Notably, most of the navbar serves as the button to toggle
it open or closed, while the functionality of the anchor tag enclosing the navbar's
title remains the same. Doing things this way makes it easier to open or close the
navbar, so that users don't have to tap precisely on the small hamburger button
(which can often be frustrating). It also makes it unnecessary to reach all the way across
the screen to open the menu when using a smartphone with the left hand.

Clearly, there are a multitude of things that must be considered when writing code
for the web, with the many and diverse devices and users that may visit your page.
Even a seemingly simple component, like a navbar, requires thoughtful deliberation
and careful execution in order to provide the best possible user experience.
