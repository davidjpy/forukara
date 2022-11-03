# Forukara
## Project Background - this is an unfinished project! Still working on it!
Forukara is a place where individuals from all backgrounds and occupations may congregate and exchange ideas.

## Overviews & Stacks (Things that are already done)
Forukara is a MERN stack project with classic implementation of MVC framwork.
* Typescript & React.js 
  1. Vanilla javascript for animations and effects                   
  2. Redux Tookit for global states and actions
  3. RTK query for memorized selector and data caching
  4. Craco for configurating webpack & babel in CRA

* Node.js & Express.js
  1. jwt token & bcrypt for authentication and authorization
     1. Server validation with custom error code
     2. Nodemailer for email verification
     3. Rate Limiter for blocking off too many request from the same IP
  2. logger middleware for debuging
     1. Request logger, error logger and DB error logger
  3. Basic CRUD operations

* MongoDB
  1. TTL index for deleting acount without validated email
