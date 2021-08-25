# i-HOPe-im-IN

This project aims to test the Customer App developed by Hopin.

## Pre-requirements

To run this project, you will need:

- [git](https://git-scm.com/downloads) (I've used version `2.26.2` while writing this doc)
- [nodejs](https://nodejs.org/en/) (I've used version `14.17.3` while writing this doc)
- NPM (I've used version `6.14.13` while writing this doc)

**Note:** When installing nodejs, NPM is automatically installed too.

## Installation

To install the dev dependencies, run `npm install` (or `npm i` for short.)

## Tests

Run `npm run test:api` to run the API tests

Run `npm run test:ui` to run the UI tests in headless mode

> Note: When running in headless mode, Cypress automatically saves videos of the executions at `cypress/videos/`, and if tests fail, Cypress automatically saves screenshots of the failures at `cypress/screenshots/`.

### Interactive mode

Run `npm run cy:open` to open the Cypress Test Runner to run tests in interactive.

___

Made with ❤️ by [Walmyr](https://walmyr.dev).
