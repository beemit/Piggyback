# PiggyBack

PiggyBack is a Mean Stack Test Demo app made by bmit and has been integrated with [Auth0](https://auth0.com), [Angular](https://angular.io) (with the [@angular/cli](https://github.com/angular/angular-cli)), [mongoDB](https://www.mongodb.com/), and [Node.js with npm](http://nodejs.org).

Products can be added by api only at this time using something like Postman and is used as a proof of concept. Once logged in, you can display the top 4 cryptocurrency prices, list products from the database, log into the store, view your user profile, and choose from a list of tv shows. The main point of this app is to demo my coding skills as well as show that it is easy to create an application base to build upon or, PiggyBack onto as a base app. 

Piggyback includes user authentication from auth0 as well as JWT and Mongodb using a separate store login. Both exist as they may be used independantly

## Dependencies

* [mongoDB](https://www.mongodb.com/)
* [Node.js with npm](http://nodejs.org), Node >= 6.9.0, npm >= 3
* [@angular/cli](https://github.com/angular/angular-cli), >= 1.5

## Installation

If you have all the dependancies and an auth0 account try and clone this project. Run the following commands to install dependencies for the server and client-side:

```
$ npm install
$ cd server
$ npm install
```

1. Open `server/config.js` and replace `[CLIENT_DOMAIN]` with your Auth0 domain.
2. Open `src/app/auth/auth0-variables.ts` and replace `[CLIENT_ID]` and `[CLIENT_DOMAIN]` with your Auth0 client ID and domain. if you mess up there is a backup in src/app/auth/auth0-variables.ts.example.

## Serving the project
* Run mongod.exe to prepare the db.
* Node server: run `nodemon serverjs` from the `/server` folder.
* Angular: run `ng serve --host 192.168.x.x --open` from the root folder. This should be set to the ip you set on Auth0.

## License

This project is licensed under the MIT license. See the [LICENSE](LICENSE) file for more info.
