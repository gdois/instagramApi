# Instagram API

Instagram API, created with Javascript, NodeJS and Playwright.

Initial state, more updates in future.

- [X] Profile Info
- [X] Profile Images
- [ ] Optimize in the browser
- [ ] User Login more easy
- [ ] Images high quality
- [ ] Stories videos

## Endpoints

```shell
# Login User
/login (POST)

# { "username": "exampleuser", "password": "password" }

# Profile Info
/:user (GET)

# Profile Pics
/pics/:user (GET)
```

## How to install?

```shell
# Install Node.js

# Linux and macOS
https://github.com/nvm-sh/nvm

# Windows
https://github.com/coreybutler/nvm-windows

# Install yarn
npm install -g yarn

# Install packages in server
cd server
yarn

# Install packages in client
cd client
yarn

# Execute server
cd server
yarn start

# Execute client
cd client
yarn dev

# Enjoy!

```