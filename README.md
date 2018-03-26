# Quantified (bby-react)

[![Build Status](https://travis-ci.org/chrstntdd/bby-react.svg?branch=master)](https://travis-ci.org/chrstntdd/bby-react)
[![styled with prettier](https://img.shields.io/badge/styled_with-prettier-ff69b4.svg)](https://github.com/prettier/prettier)

### Table of Contents

* [About](#about)
* [Screenshots](#screenshots)
* [Technology](#front-end-technology)
* [API Documentation](#api-documentation)
* [Icon Credit](#icon-credit)
* [Future Plans](#future-plans)

## About

This is the front end for [bby-react-api](https://github.com/chrstntdd/bby-react-api).

All together these two repositories make up [Quantified](https://quantified.netlify.com/).
Quantified is a complete rewrite/overhaul of [this](https://github.com/chrstntdd/bby-app) prototype application. Quantified is a utility to help reduce shrink and improve accuracy in a retail setting where human error when reading UPCs, SKUs, or model numbers can occur and have costly consequences. Quantified lets users (Employees) organize product data into a filterable and print-ready table by scanning the a UPC bar code to add it to the table. Additionally, the table can (and should) be formatted/ordered before printing to make viewing all the data more comprehensible. New to this project is the ability to save and load tables instead of having the table and all the data exist only for the duration of the browser session.

## Screenshots

![alt text](./config/screens/q1-ss.png 'Main view')
![alt text](./config/screens/q2-ss.png 'Manage view')
![alt text](./config/screens/q3-ss.png 'Formatted print preview')

## Front End Technology

* React
* Redux
* Jest (w/ Enzyme)
* SCSS
* [FuseBox](https://github.com/fuse-box/fuse-box)

## Back End Technology

* TypeScript
* NodeJs (Express)
* MongoDB (Mongoose)
* Bcrypt
* JSON Web Tokens
* Mocha (w/ Chai)
* [Best Buy API ](https://github.com/BestBuyAPIs/bestbuy-sdk-js)

## API Documentation

The API is simple. There are routes for Users, Tables, and one for making the call to the Best Buy API.

### UserRouter `@path = '/api/v1/users`

GET

* `/` get all users
* `/:id` get user by id

POST

* `/` sign up handler
* `/sign-in` sign in handler
* `/verify-email/:token` verify email handler
* `/forgot-password` forgot password handler
* `/reset-password/:token` reset password handler

PUT

* `/:id` update user by id

DELETE

* `/:id` delete user by id

---

### Table Router `@path = '/api/v1/tables'`

_NOTE: All of these endpoints require a valid JWT issued by a successful sign in_

GET

* `/:userId` get all tables for a user by id
* `/:userId/:tableId` get single table for user by table id and user id

POST

* `/:userId/` create a single table for user by id

PUT

* `/:userId/:tableId` update a single table for user by table id and user id

DELETE

* `/:userId/:tableId` delete a single table for user by table id and user id

---

### Best Buy Router `@path = '/api/v1/best-buy'`

_NOTE: This endpoint also requires a valid JWT issued by a successful sign in_

POST

* `/upc` takes upc string and returns product information from the best buy API if the UPC is valid

---

## Icon Credit

**ALL** Icons used in this project are from [The Noun Project](https://thenounproject.com/) and are used under the Creative Commons License. The SVG files themselves were altered to remove the watermark and text elements due to incompatibility issues, so I will list the credit here. BIG thank you to The Noun Project for existing and providing such a wonderful service.

* [Manage Icon](https://thenounproject.com/search/?q=manage&i=1082747)
* [Save Icon](https://thenounproject.com/DewDrops/)
* [Format Icon](https://thenounproject.com/search/?q=clean%20brush&i=796398)
* [Print Icon](https://thenounproject.com/search/?q=print&i=772280)
* [Clear Icon](https://thenounproject.com/search/?q=X&i=926276)
* [Sign Out Icon](https://thenounproject.com/search/?q=logout&i=1155291)
* [Atom Icon](https://thenounproject.com/search/?q=atom&i=1093501)
* [Handshake Icon](https://thenounproject.com/search/?q=handshake&i=1007187)
* [Lock Icon](https://thenounproject.com/search/?q=Lock%20check&i=821171)
* [Rocket Icon](https://thenounproject.com/search/?q=Rocket%20ship&i=658468)
* [Shuffle Icon](https://thenounproject.com/search/?q=shuffle&i=1104277)
* [Other Padlock Icon by by Gabriele Malaspina](https://thenounproject.com/search/?q=shield%20check%20mark&i=195234)

## Future Plans

* Shrink application footprint
  * Swap in Preact for React
  * Remove duplicate/dead code
  * Code split along routes
  * Use CSSModules
* Incorporate Web Workers
* Polish UI
* Improve tests
* Incorporate some Elm 🤔
