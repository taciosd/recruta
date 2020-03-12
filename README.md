# Recruta
> A Curriculum and job opportunities app made in React, Node.js and MongoDB.

This project was first created as a form of trainning on current web technologies. It uses React, Material Design (material-ui), Node.js, express, axios, a REST api, MongoDB and mongoose.

Try the running example at: https://recruta-web.herokuapp.com/

## Installation
OS X & Linux:

```sh
// To build
cd recruta-web && yarn install && yarn build
cd recruta-server && yarn install

// To run:
cd recruta-server && yarn start
```

### Front-end static files in production
When running in production mode, the server is configured to serve the front-end static files. To run the app you only need to build the front-end and start the server like below:

## First steps
After instalation, the app starts with an example welcome screen. You can edit this screen by clicking in the floating action button to put your company name and welcome text.

## Development setup
To start the server, run:
```
cd recruta-server && yarn dev
```
To start the front-end, run:
```
cd recruta-web && yarn start
```

### recruta-server: dotenv
This project uses the dotenv module. To develop create a .env file in the root directory of the server and declare the following variables:
```
DB_USER=<username>
DB_PASSWORD=<password>
DB_HOST=<mongodb_host_address>
```

## Meta

Tácio S. Diogo – [LinkedIn](http://www.linkedin.com/taciosd)

Distributed under the MIT license. See ``LICENSE`` for more information.