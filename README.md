# Neon Authorize + Descope Demo (SQL from the frontend)

This demo aims to show off Descope and Neon Authorize together. In particular this shows how you can use Neon Authorize to run SQL directly from the frontend with the safety and security of RLS making sure that your data remains safe!

## Setup

1. Sign up and create a new database on [Neon.tech](https://neon.tech).
2. Choose AWS for the cloud
3. Sign up for [Descope](https://descope.com) and create a new flow using their defaults. I used passkey and socials for the login methodologies.
4. Get your Descope project ID from the Project tab.
5. Put your Descope project ID in the .env file (or make a copy of .env to .env.local and put it there, either works) in the VITE_DESCOPE_PROJECT_ID
6. With that same Descope project ID, go to the the Neon console, go the the Authorize tab on the side nav, click "Add Provider" and paste in the URL https://api.descope.com/YOUR_DESCOPE_PROJECT_ID/.well-known/jwks.json (it will select the correct provider for you)
7. From the get started drawer that pops out (which you can get back to from the Neon Authorize page later if you close it) – run all the blocks under Setup Roles header.
8. From the "Setup Environment Variables" heading, copy the authenticated URL and paste that into your .env/.env.local. You will have to add VITE_ in the front of what's copied because that's how Vite knows which secrets can be used in the frontend. Notice this connection string has no password.
9. Clone this repo
10. In the Neon console, open the SQL Editor and run the queries in schema.sql (or via psql).
11. Run `npm install`
12. Run `npm run dev`
13. Navigate to [localhost:5173](http://localhost:5173)