const port = 3333;

const { application } = require("express");
//imports
const express = require("express");
const es6Renderer = require("express-es6-template-engine");
const app = express();
const db = require('./db');

//view engine required
app.engine("html", es6Renderer);
app.set("views", "views");
app.set("view engine", "html");


//routes
app.get('/', (req, res) => {
  res.render('template', {
    locals: {
      title: "My Address Book"
    },
    partials: {
      head: '/partials/head',
      component: '/partials/home'
    }
  });
})

app.get('/friends/:handle', (req, res) => {
  console.log(req.params)
  const { handle } = req.params
  console.log(handle);
  const friend = db.find(singleFriend => singleFriend.handle === handle)
  
  // if (friend) {
  //   let htmlData = ``;
  //   htmlData += `<h1>${friend.name}</h1>`;
  //   htmlData += `<h3>${friend.handle}</h3>`;
  //   htmlData += `<h3>${friend.skill}</h3>`;
  //   res.send(htmlData)
  // } else {
  //   res.status(404).send("No Friend found");
  // }
  if (friend) {
    res.render("template", {
      locals: {
        title: "My Address Book",
        friend: friend,
      },
      partials: {
        head: "/partials/head",
        component: "/partials/oneFriend",
      },
    });
    
  } else {
    res.status(404).render('404', {
      partials: {
        head: '/partials/head'
      }
    });
  }
})

app.get("/friends", (req, res) => {

  res.render("template", {
    locals: {
      title: "My Friends List",
      friends: db,
      path: req.path
    },
      partials: {
        head: "/partials/head",
        component: "/partials/friends-list"
      },
  })

});


app.listen(port, () => {
  console.log(`YO JOE!!  Coming in hot at http://localhost:${port}`)
})