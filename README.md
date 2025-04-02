## Mars Rover Photos

## Requirements

To execute the project, you must have the following programs:

- Git
- Node.js (v22 recommended)

## Installation

1. Clone the repository:

```bash
 git clone https://github.com/adonyssantos/images-app-with-pagination.git
```

2. Navigate to the project directory:

```bash
 cd images-app-with-pagination
```

3. Install the dependencies:

```bash
 npm install
```

## Environment variables configuration

Create a `.env` file in the root of the project with the following content:

```
VITE_API_URL=https://api.nasa.gov
VITE_API_KEY=YOUR_API_KEY
```

You can use the `cp .env.example .env` command to copy the example file or you can copy it manually.

## Run the project under development

```bash
 npm run dev
```

The project will be available at: `http://localhost:5173`.

## Compile the project for production

```bash
 npm run build
```

The production files will be generated in the ``dist`` folder.

## Preview the build to production

```bash
 npm run preview
```

This will raise a server to preview the built application.

## Project Structure
- `src/services/` - Services to interact with APIs and manage application state.
- `src/models/` - TypeScript types and interfaces used by services.
- `src/components/` - Reusable application components.
- `src/hooks/` - Includes a custom hook to handle application logic.
- `src/App.tsx` - Main component of the application where the user interface is built.
- `src/index.css` - Global styles of the application to reset the default styles of the browsers. Although MUI is being used for the UI.