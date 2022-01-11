# Search Engine

## Config
Add Environment Variable MONGO_URL in a .env file or as an environment variable on your hosting platform.

## Add data to the database - Crawler
- Clone this repository <a href='https://github.com/tharunoptimus/crawlerbot.git'>Crawler Bot</a> to another directory and run it
- Access the /crawl page in the above app to crawl for the data

## Install
`npm install` to install all the dependencies

## Run
`npm start` to start the app in dev server

Enjoy

## General Details

### Packages Used
- <a href='https://github.com/expressjs/express'>Express</a> to create the server and manage routes
- <a href='https://www.npmjs.com/package/pug'>Pug</a> to render the html pages
- <a href='https://www.npmjs.com/package/mongoose'>Mongoose</a> to connect to the database
- <a href='https://www.npmjs.com/package/mongo-sanitize'>Mongo Sanitize</a> to sanitize the text field before searching


### API
- Crawler Bot uses a REST API to crawl the data.
- API uses <a href='https://www.npmjs.com/package/node-fetch'>`node-fetch`</a> and <a href='https://www.npmjs.com/package/cheerio'>`cheerio`</a> to crawl for data

### Text search
- Uses mongoDB text search to search for the data
- The fields are indexed while creating the collection schema in the database

### View Engine - Pug
- HTML is generated using the Pug template engine

### PWA
- The app is served using the service worker while offline
- Passes the lighthouse audit 100%