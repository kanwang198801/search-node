### Overview

Search data from tickets.json and users.json in command line and output human readable format. 
(JSON files are located in /src/data)

- Where the data exists, values from any related entities should be included in the results, i.e. searching tickets should return their assigned user and searching users should return their assigned tickets.
- The user should be able to search on any field. Full value matching is ﬁne (e.g. "mar" won't return "mary").
- The user should also be able to search for missing values, e.g. where a ticket does not have an assignee_id.

### Project Structure
.
├── ...
├── src                   
│   ├──  constants              #all constants files
│   │    ├── message.ts         #messages for search program
│   ├──  data                   #data for search
│   │    ├── tickets.json       #tickets data for search
│   │    ├── users.json         #users data for search
│   ├──  services               #services
│   │    ├── Search.ts          #search class includes private variables and functions
│   ├──  testData               #data for search testing
│   │    ├── tickets.json       #tickets data for search testing
│   │    ├── users.json         #users data for search testing
│   ├──  types                  #types includes typescript interfaces and enums
│   │    ├── dataModal.ts       #typescript interfaces
│   │    ├── enums.ts           #typescript enums
│   ├──  utils                  #utils functions
│   │    ├── search.ts          #utils functions for search
│   │    ├── logger.ts          #utils functions for log, can be replaced with any log system easily
│    ...
└── ...

### Prerequisites

This project uses node.js + typescript
node.js v12.13.0
npm 6.12.0

### How to start

```npm install```

Install the dependencies.

```npm run build```

Files will be built in Build folder.

```npm start```

In order to run `npm start`, we need to run `npm run build` first.
This will run the project in local. 

```npm run dev```

This will run the project in dev mode with nodemon in local.
nodemon is a tool that helps develop node.js based applications by automatically restarting the node application when file changes in the directory are detected.
[nodemon] (https://www.npmjs.com/package/nodemon)

### Testing 

It has > 75% overall coverage of all code in the application by unit tests and integration tests.
This project uses Jest as the unit test framework and runner. 
The config is located in '/jest.config.js'
[jest] (https://jestjs.io/)

```npm test```

Launches the test runner.

```npm run test:watch```

Launches the test runner in the interactive watch mode.

```npm run test:coverage```

Runs the Jest test runner, running all tests and produces a code coverage report.

### Code standard

We use eslint + prettier to make sure the code is clean and in good standard 
The config for eslint is located in '/.eslintrc.js'
The config for folders that we do not want to get checked by eslint which is located in '/.eslintignore.js'
The config for .prettier is located in '/.prettierrc.js'
[eslint] (https://eslint.org/)
[prettier] (https://prettier.io/)

### Potential Improvements

1. Add inverted index to make search more efficient: 
an inverted index object that takes a JSON array of text objects and creates an index from the array. The index allows a user to search for text blocks in the array that contain a specified collection of words.
[InvertedIndex] (https://en.wikipedia.org/wiki/Inverted_index)

2. Add fs.createReadStream with JSONStream to read large JSON file:
process large data file in chucks, so our data can process without running out of memory as this just up a very large amount of unresolved promises to keep in memory until they completed.
[fs.createReadStream()] (https://nodejs.org/api/fs.html#fs_fs_createreadstream_path_options)
[JSONStream] (https://www.npmjs.com/package/JSONStream)

