# Intro

This project was initially created using `npm init` command as is stated. This resulted in `package.json` file with the following content:

```json
{
  "name": "node_backend_example",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "author": "Mark Tomm",
  "license": "ISC"
}
```

Entrypoint is `index.js`.

Simple "HTTP server" supporting single `GET` endpoint using node built-in `http` module.

For first time npm setup: `npm i`. This resulted in `package-lock.json` file.

The `package-lock.json` file is automatically generated by `npm install` and it locks down the versions of the dependencies. When cloning this project, it's generally a good practice to use `npm ci` (clean install) instead of npm install to install dependencies.

The `npm ci` command is designed for continuous integration environments and, when run, it installs dependencies based on the versions specified in the `package-lock.json` file. This ensures that the project gets the exact versions of dependencies that were used during development, providing consistency across different environments.

# Running

After cloning this repo, run `npm ci` once and then `node index.js` everytime the project node app needs to be run. Node v20 was using during development by author.

Now navigate to `http://localhost:3000/hello` in your browser to see the result.

It is also now possible to run the server using `npm run start` after making a single line adjustment in package.json. See commit 2.

3rd commit: Run `npm run dev` to run the code using nodemon, so that when any change is done to `index.js` then the node app is restarted.

4th commit: Run `docker compose up` to run code inside docker container.
