# React + Vite

## Project Setup

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

### Official Plugins

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react): Uses [Babel](https://babeljs.io/) for Fast Refresh.
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc): Uses [SWC](https://swc.rs/) for Fast Refresh.

### Expanding the ESLint Configuration

For production applications, it is recommended to use TypeScript with type-aware lint rules enabled. Refer to the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for integrating TypeScript and [`typescript-eslint`](https://typescript-eslint.io) into your project.

### Setup Commands

```bash
# Create a new Vite React project
npm create vite@latest sentiment-analyzer-fe -- --template react

# Install dependencies
npm install

# Start the development server
npm run dev

# Install Tailwind CSS and related dependencies
npm install -D tailwindcss postcss autoprefixer
# or specify a version
npm install -D tailwindcss@^3.4.17 postcss autoprefixer

# Install TypeScript node types (optional, for TypeScript support)
npm install -D @types/node

# Initialize Tailwind CSS configuration
npx tailwindcss init -p
```