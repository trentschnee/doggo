# Doggo Finder

A React application that helps users find their perfect dog match from available shelter dogs.

## Features

- User authentication
- Browse available dogs with filtering options
- Pagination for dog listings
- Filter by breed and age
- Sort results alphabetically by breed, age, or name
- Favorite dogs you're interested in
- Generate a match from your favorites

## Tech Stack

- React 19
- TypeScript
- Vite
- TanStack Query (React Query) for data fetching
- React Router for navigation
- Shadcn UI components
- Tailwind CSS for styling
- Vitest for testing

## Prerequisites

- Node.js (v16+)
- npm or yarn
## Installation

Clone the repository:
`git clone https://github.com/trentschnee/doggo-finder.git`

`cd doggo-finder`

Install dependencies:

`npm install`

Create a .env file in the root directory with the following content:
VITE_FETCH_FETAKEHOME_BASE_API_URL=https://frontend-take-home-service.fetch.com

## Running the Application
To start the development server:
`npm run dev`
## Building for Production
To create a production build:
`npm run build`
The build will be available in the dist directory.
## Testing
To run tests:
`npm test`
To run tests in watch mode:
`npm run test:watch`
To check test coverage:
`npm run test:coverage`
## Project Structure
```
src/
├── app/                  # Application routing and pages
├── components/           # Shared UI components
├── features/             # Feature modules
│   ├── auth/             # Authentication feature
│   ├── dogs/             # Dog search and display feature
│   └── location/         # Location-related functionality
├── lib/                  # Utility libraries
├── providers/            # Context providers
└── main.tsx              # Application entry point
```
