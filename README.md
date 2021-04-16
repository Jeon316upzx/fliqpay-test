# FLIQPAY TEST

## Welcome to Fliqpay backend Test

## Description:

This project is a demostration of my backend skillset in accordance with the
instructions/guide given for the project. It is a mini ticket management backend
with 4 modules:

Admin: This module helps in admin authentication, user and other database object management

Comment: This module helps customers to create comments only when a user agent has commented.

Useragent: This module manages user agent activities like processing support requests, generating reports, and making comments on support requests created by customers

Auth/Authentication: This module manages authentication for customers.

### INSTALLATION AND LOCAL SETUP

To get started :

1. Clone the repository by running git clone <url>

2. Run `yarn` or `npm install` to install all required dependencies.

3. The .env file was intentionally pushed so no need to worry about that

4. Run `yarn test` or `npm run test` to run tests and before the test starts a seeder.ts will seed the database for appropriate testing. -> src/seeder/seeder.ts

5. Run `yarn start` or `npm start` to run the project.

6. The project could be better in the following way:

   - Making appropriate use of Interfaces and not abusing the any type
   - In terms of modularity, using a separate validator.ts file would have been better.
   - Proper naming of objects and functions
   - Making proper use of my logger instead of console.log()
   - Using Jest for testing instead of chai.
   - World class commenting would have made it better.
   - More testing.
   - The generated pdf could be uploaded to cloudinary and be made browser downloadable.
   - Made it csv exportable but laziness. :(
   - Better Optimized functions
   - More logic in the sense that a comment could be a String | Url | another Comment.
   - I could have created an authentication route for admins and user agents but I made use of the normal login route. :(

   ### AVAILABLE ENDPOINTS

   ```markdown
   POST fliqpay/api/v1/auth/login - login a registered user
   ```

   ```markdown
   POST fliqpay/api/v1/auth/register - register a new user
   ```

   ```markdown
   POST /fliqpay/api/v1/support-requests/create - create support requests | tickets
   ```

   ```markdown
   GET /fliqpay/api/v1/support-requests/requests - fetch support requests | tickets
   ```

   ```markdown
   GET /fliqpay/api/v1/support-requests/requests - fetch support requests to view status
   ```

   ```markdown
   GET /fliqpay/api/v1/agent/support-requests - fetch support requests by agents to process
   ```

   ```markdown
   POST /fliqpay/api/v1/agent/support-request/:id/close - close a support request | ticket by agents
   ```

   ```markdown
   POST /fliqpay/api/v1/agent/generate-report - generate reports pdf for tickets in the last month / 30 days by agents
   ```

   ```markdown
   POST /fliqpay/api/v1/agent/support-request/:id/comment - comment on a support request | ticket by agents
   ```

   ```markdown
   GET /fliqpay/api/v1/agent/support-request/:id/comments - fetch comments on support requests | ticket by agents
   ```

   ```markdown
   GET /fliqpay/api/v1/admin/users - fetch users by admin
   ```

   ```markdown
   GET /fliqpay/api/v1/admin/users/:id - fetch a user by admin
   ```

   and more like remove a user e.t.c
