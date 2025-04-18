# Voting App Frontend

A modern web application built with Next.js that allows voters to cast their votes and administrators to manage the voting process.

## Features

- **Public Voting Interface**: Simple and intuitive interface for voters to cast their votes
- **Dark/Light Theme**: Fully responsive UI with support for both dark and light modes for better user experience
- **Admin Dashboard**: Secure admin area with the following features:
  - View all submitted votes
  - Track top candidates
  - Register new voters
  - Manage voter and candidate information

## Setup and Installation

### Repository
- Repository URL: https://github.com/CamiloRami/voting-app-frontend
- Clone with SSH: `git clone git@github.com:CamiloRami/voting-app-frontend.git`

### Prerequisites
- Node.js (v20 or higher)
- Package manager: pnpm (recommended) or npm


### Application Setup
1. Install dependencies:
```bash
pnpm install
```

2. Start in development mode:
```bash
pnpm dev
```

The application will be available at `http://localhost:3001`. If you want to run it on a different port, you can set it in package.json, **however**, the default port is 3001 because the **backend runs on port 3000**, and it's **cors configuration allows requests from port 3001.**

### Running in Production
For production deployment:
```bash
pnpm start
```

## Project Structure

```
src/
├── app/               # Next.js app directory
│   ├── admin/        # Admin dashboard pages
│   ├── ui/           # Shared UI components
│   └── page.jsx      # Main voting page
├── contexts/         # React contexts
├── hooks/            # Custom React hooks
└── services/         # API service functions
```

## Available Scripts

The following commands can be run with either `pnpm` or `npm run`:

- `dev`: Runs the development server
- `build`: Builds the application for production
- `start`: Runs the built application
- `lint`: Runs ESLint to check code quality
- `lint:fix`: Runs ESLint and automatically fixes issues
