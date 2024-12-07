# SingleClic Store

A modern e-commerce application built with React, TypeScript, and Tailwind CSS, showcasing clean architecture principles and best practices in frontend development.

## Features

- Browse products with category filtering
- View detailed product information
- Shopping cart functionality
- Responsive design
- Clean and modern UI
- Type-safe development with TypeScript
- State management with React Context
- Data fetching with React Query

## Tech Stack

- React
- TypeScript
- Tailwind CSS
- React Router
- React Query
- Axios
- Hero Icons

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/abdelmonem88/singleclic-store.git
cd singleclic-store
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:5173`

## Project Structure

```
src/
├── components/     # Reusable UI components
├── context/       # React Context for state management
├── features/      # Feature-specific components
├── hooks/         # Custom React hooks
├── layouts/       # Layout components
├── services/      # API services
├── types/         # TypeScript type definitions
└── utils/         # Utility functions
```

## Architecture Decisions

- **Clean Architecture**: The project follows a clean architecture pattern with clear separation of concerns.
- **Feature-based Structure**: Components are organized by features for better scalability.
- **Type Safety**: TypeScript is used throughout the project to ensure type safety.
- **State Management**: React Context is used for global state management (shopping cart).
- **Data Fetching**: React Query is used for efficient data fetching and caching.
- **Styling**: Tailwind CSS for utility-first styling approach.

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License.
