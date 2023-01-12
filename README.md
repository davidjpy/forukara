# Forukara
## Project Background - this is an unfinished project! Still working on it!
Forukara is a place where individuals from all backgrounds and occupations may congregate and exchange ideas.

## Overviews & Stacks (Things that are already done)
Forukara is a MERN stack project with the classic implementation of MVC framwork.
* Typescript & React.js 
  1. Vanilla javascript for animations and effects                   
  2. Redux Toolkit for global states and actions
  3. RTK query for memorized selector and data caching
  4. Craco for configurating webpack & babel in CRA

* Node.js & Express.js
  1. Authentication and Authorization
     1. Rate Limiter for blocking off too many request from the same IP
     
     3. JWT token based Email Login
        1. Email verification
        
     3. JWT token based OAuth 2.0 from scratch
        1. Google
           1. PKCE Authorzation code grant flow
           
        2. Linkedin
           2. Authorzation code grant flow
           3. State checking in client for any potential CSFR
   
  2. logger middleware for debuging
     1. Request logger, error logger and DB error logger
    
  3. Basic CRUD operations

* MongoDB
  1. TTL index for deleting acount without validated email

## More to come! (The react & node app are probably gonna be deployed in Netlify and Vercel)
