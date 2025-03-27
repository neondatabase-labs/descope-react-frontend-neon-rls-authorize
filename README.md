<img width="250px" src="https://neon.tech/brand/neon-logo-dark-color.svg" />

# Neon RLS + Descope Example (SQL from the Frontend)

A quick start React template demonstrating secure user authentication and authorization using Neon RLS with Descope integration. This guide showcases how to implement client-side row-level security by executing SQL directly from the frontend.

## Features

- React application with Vite
- User authentication powered by Descope
- Row-level security using Neon RLS
- Ready-to-deploy configuration for Vercel, Netlify and Render

## Prerequisites

- [Neon](https://neon.tech) account with a new project
- [Descope](https://www.descope.com) account with a new project
- Node.js installed locally

## One-Click Deploy

Deploy directly to your preferred hosting platform:

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/neondatabase-labs/descope-react-frontend-neon-rls&env=VITE_DESCOPE_PROJECT_ID,VITE_DATABASE_AUTHENTICATED_URL&project-name=neon-rls-descope&repository-name=neon-rls-descope)
[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/neondatabase-labs/descope-react-frontend-neon-rls)
[![Deploy to Render](https://render.com/images/deploy-to-render-button.svg)](https://render.com/deploy?repo=https://github.com/neondatabase-labs/descope-react-frontend-neon-rls)

## Local Development Setup

### Configure Descope

1. Navigate to your Descope dashboard.
2. Get your **Project ID** from the "Project Settings" tab.
   ![Descope Project ID](/images/descope-project-id.png)

### Set Up Neon RLS

1. Open your Neon Console and navigate to "RLS" in your project's settings.
2. Add a new authentication provider.
3. Set the JWKS URL to: `https://api.descope.com/{YOUR_DESCOPE_PROJECT_ID}/.well-known/jwks.json`
   
   > Replace `{YOUR_DESCOPE_PROJECT_ID}` with your Descope Project ID.
   
   ![Neon RLS JWKS URL](/images/neon-rls-jwks-url.png)
   
4. Follow the steps in the UI to setup the roles for Neon RLS. You should ignore the schema related steps if you're following this guide.
5. Note down the connection strings for both the **`neondb_owner` role** and the **`authenticated, passwordless` role**. You'll need both. The `neondb_owner` role has full privileges and is used for migrations, while the `authenticated` role will be used by the application and will have its access restricted by RLS.
   
   ![Neon RLS Connection Strings](/images/neon-rls-env-values.png)

### Local Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/neondatabase-labs/descope-react-frontend-neon-rls
   cd descope-react-frontend-neon-rls
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Create a .env.local file with the following variables:

   ```bash
   cp .env.template .env.local
   ```

   ```bash
   VITE_DESCOPE_PROJECT_ID=YOUR_DESCOPE_PROJECT_ID
   VITE_DATABASE_AUTHENTICATED_URL="YOUR_NEON_DATABASE_AUTHENTICATED_URL"
   ```

4. Get your Neon connection string from the Neon Console. Ensure you are using the authenticated role connection string.

5. Run the database schema:

   #### Option 1: Use the Neon SQL editor

   Open your Neon Console, go to the SQL Editor, and run the queries in schema.sql

   ![Neon SQL Editor](/images/neon-sql-editor.png)

   #### Option 2: Use psql (if you have it configured)

   ```bash
   psql "<YOUR_NEON_DATABASE_URL>" -f schema.sql
   ```

5. Start the development server:

   ```bash
   npm run dev
   ```

6. Visit http://localhost:5173 to see the application running.
   
   ![Descope React App](/images/descope-react-app.png)

## Important: Production Setup

Ensure your Descope project is configured for production and the JWKS URL in Neon RLS is accurate. You can select the production environment in Descope by clicking on the "Production" toggle in the "Environment Settings" tab under "Project Settings".

   ![Descope use in production](/images/descope-use-in-production.png)

## Learn More

- [Neon RLS Tutorial](https://neon.tech/docs/guides/neon-rls-tutorial)
- [Descope Documentation](https://docs.descope.com)
- [Neon RLS + Descope Integration](https://neon.tech/docs/guides/neon-rls-descope)

## Authors

- [Brian Holt](https://github.com/btholt)

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.
