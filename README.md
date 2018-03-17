# WatsMyGrade-API

API for the WatsMyGrade iOS application.

#### How it works ####
1. Three primary routes handling all requests/writes.
* Courses at `/v1/course`
* Grades at `/v1/grade`
* Tasks at `/v1/task`
2. One-to-many relationship between course and grades and tasks.
* Grades and tasks all require a corresponding course ID for most operations.

#### Dependencies ####
* npm - the `package.json` file lists all of the npm dependencies.

#### WatsMyGrade App REST API with ES6 and Express ####
* ES6 support via [babel](http://www.babeljs.io)
* Express is Node.js web application framework via [express](https://github.com/expressjs/express)
* Mongoose is a MongoDB object modeling tool via [mongoose](https://github.com/Automattic/mongoose)
* Body parsing via [body-parser](https://github.com/expressjs/body-parser)

#### Run a local instance ####
```sh
# Install dependencies
npm install

# Start local development live-reload server port 3005:
npm run dev

# Requests made in the form http://localhost:3005/v1/endpoint

# To build ES6 code
npm run build

```
