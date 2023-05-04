# Findeatre

[Click here to see deployed app](https://findeatre.adaptable.app/)

## Description

Findeatre is websiteconcept of finding theatre shows in one`s residental area. The website allows the create new users. The user (and only a user) can to add new shows, artists, directors, and any castmembers to its favourites. Data for the shows and artist are static and created by us.

Authors
[<p align="center"><img src="https://github.com/solenwa.png" width="90px;"/><br/><a href="https://github.com/solenwa">Solen W</a></p><p align="center"><img src="https://github.com/aturike.png" width="90px;"/><br/><a href="https://github.com/aturike">Adam Turi</a></p>]()

## MVP

- User log-in and sign-up model
- Seeding changing basedate to the database
- Model relations and datastructure
- Rendering favourites on various sites
- Search function
- Edit and upload user profile picture

## Backlog

- Mobile responsiveness
- Admin page with data-upload // API
- Advanced search function
- Purchasing tickets for shows

### Data structure

#### database

- artistdata.json

  > Static data of the artists

- showdata.json

  > Static data of the shows

#### db

- index.js
  > Connection to the Mongo database and seeding logic of the json files

### App structure

#### config

- index.js

  > configuration of the app

- session.config.js

  > configuration of the login-cookie

#### error-handling

- index.js

  > HTTP requests error handeling logic

#### middleware

- cloudinary.config.js

  > Handles the picture upload request as a middleware

- route-guard.middleware.js

  > Handles the logged-in/logged-out status request as a middleware

#### models

- Artist.model.js

  > Database interraction logic for artist elements

- Show.model.js

  > Database interraction logic for show elements

- User.model.js
  > Database interraction logic for user elements

#### public

- images

  > Used images by the app (logo`s etc.)

- js

  > Front-end logic

- stylesheets
  > CSS styling of the website

#### routes

- auth.routes.js

  > HTTP request handeling for log-in and sign up. It also handles all the 'add to favourite' requests

- index.routes.js

  > HTTP request handeling for rendering the public pages. Handles the logic of showing the favourites when the user is logged in.

- profile.routes.js

  > HTTP request handeling for rendering the user specific pages.

- search.routes.js

  > HTTP request handeling for search page and search-logic which it triggered by the Front-end

#### utils

- capitalize.js

  > captilazes the first letter of the incoming string parameter

- favFilter.js

  > returns an user-specific array with objects of all database elements (or just an element of the database) expanded witht the parameter favourite: true/false

#### views

- partials

  > elements which will be rendered on all the pages (navbar.ejs)

- allartists.ejs
- artistdetail.ejs
- error.ejs
- index.ejs
- landing.ejs
- layout.ejs (HTML template)
- login.ejs
- myartists.ejs
- not-found.ejs
- profile.ejs
- search.ejs
- showdetail.ejs

#### .envdefault

> All the necessary .env parameters which is needed for the website to work

#### app.js

> Connection of the routing logic, the server settings and the app`s configuration

#### server.js

> Server settings logic

## Links

- [Slides Link](https://www.canva.com/design/DAFh9MZW05g/_geXPYFD4tI7ahGZNJXN5A/edit?utm_content=DAFh9MZW05g&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton)
- [Github repository Link](https://github.com/aturike/findeatre)
- [Adam`s github](https://github.com/aturike)
- [Solen`s github](https://github.com/solenwa)
- [Deployment Link](https://findeatre.adaptable.app/)
