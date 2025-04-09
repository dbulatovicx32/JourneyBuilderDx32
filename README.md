# Journey Builder

A React application that visualizes form workflows as directed acyclic graphs (DAGs) and allows users to configure field mappings between connected forms.

## Features

- Visualize form workflows as interactive nodes and edges
- View and edit form field prefill mappings
- Traverse the DAG to find upstream form fields for prefilling
- React Flow integration for interactive graph visualization

## Tech Stack

- **React** - UI library
- **TypeScript** - Type safety
- **React Flow** - Graph visualization
- **Material UI** - Component library
- **Vite** - Build tool
- **Vitest** - Testing framework

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

## Testing

Run tests with:

```bash
npm test
```

## Extending the Project

### Adding New Data Sources

To add a new data source for form field prefill:

1. Update the `getUpstreamFormsWithSource` function in `src/utils/fieldMappingHelper.ts` to include the new data source.

2. Implement a new utility function in `fieldMappingHelper.ts` that retrieves the data from your new source.

3. Modify the `FieldMappingDialog` component to display the new data source.

### Adding New Form Field Types

To add support for new form field types:

1. Update the `FormField` interface in `src/models/actionBlueprint.model.ts` to include the new field type.

2. Modify the `FormPrefillDialog` component to handle the new field type.

## Design Decisions

- **Context API**: We use React's Context API for state management to avoid prop drilling and make data accessible throughout the component tree.

- **Component Composition**: The UI is built using a composition of smaller, reusable components to improve maintainability and readability.

- **Custom Hooks**: We use custom hooks like `useJourneyBuilder` to encapsulate and share logic between components.

- **DAG Traversal**: We implement graph traversal algorithms to find upstream forms and their fields for prefill mapping.

## License

MIT