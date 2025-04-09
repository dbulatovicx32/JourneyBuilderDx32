# Journey Builder

My take on the challenge, not too happy with it >.> shouldve taken a day off to work on it rather than doing 2-3 hour increments per day.

## Features

- React Flow integration for interactive graph visualization
- View and edit form field prefill mappings
- Traverse the DAG to find upstream form fields for prefilling

## Libs

- **React** - UI library
- **TypeScript** - Type safety
- **React Flow** - Graph visualization
- **Material UI** - Component library
- **Vite** - Build tool

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/journey-builder.git
cd journey-builder
```

2. Install dependencies:
```bash
npm i
```

3. Start the development server:
```bash
npm run dev
```

4. Open [http://localhost:5173](http://localhost:5173) in your browser.

### Backend Setup

This project requires a backend server to provide the form workflow data. You can use the mock server provided at [frontendchallengeserver](https://github.com/mosaic-avantos/frontendchallengeserver).

1. Clone the mock server repository:
```bash
git clone https://github.com/mosaic-avantos/frontendchallengeserver.git
cd frontendchallengeserver
npm i
npm start
```

2. Ensure the `VITE_HOST_URL` in your `.env` file points to the mock server address (default: http://localhost:3000).

## Project Structure

```
src/
├── api/                    # API client functions
├── components/             # React components
│   ├── dialogs/            # Dialog components
│   └── ...                 # Other components
├── context/                # React contexts
├── hooks/                  # Custom React hooks
├── models/                 # TypeScript interfaces
├── utils/                  # Utility functions
├── App.tsx                 # Main App component
└── main.tsx               # Entry point
```

## Extending the Project

### Reusability

At its current state, components arent really reusable, lack of time.
It would be best to create generic wrappers for eg: dialogs, lists and list items if they are going to be used elsewhere in the project.

### Testing

Was planning to do Vitests, but the deadline prevents me from doing that.
