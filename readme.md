## Local run

You can't use the usual `node app.js` because the code is in ES6. To successfully run, compile with `babel-node` wchih will compile it to ES65:

```
node_modules/.bin/babel-node app.js
```

## Installs

* *express* - Some kind of Node.js framework?
* *babel-cli* - Compiles ES6 code down to ES5 for older browsers
* *babel-preset-es2015* - For ES6 features and their ES5 equivalent
* *nodemon* - For hot reload during development. Include this line inside `package.json`: `"start": "node_modules/.bin/nodemon app.js --exec babel-node --"`
* *body-parser* - parses incoming JSONs into `request.body`

## Response codes
* 2xx - all okay
* 3xx - resource was moved
* 4xx - request cannot be fulfilled due to client-side error
* 5xx - API error

See Wikipedia for a full list of status codes.

## Use Rate Limitation

Used to control how many requests a given user can send to the API. To tell users how many requests they have left, set the following headers:

* `X-Rate-Limit-Limit`, the number of requests allowed in a given time interval
* `X-Rate-Limit-Remaining`, the number of requests remaining in the same interval,
* `X-Rate-Limit-Reset`, the time when the rate limit will be reset.
