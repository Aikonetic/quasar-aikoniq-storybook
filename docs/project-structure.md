# Project Structure Documentation

This document provides an overview of the folder structure and code organization in our Quasar application.

## Folder Structure

```
src/
├── assets/          # Static assets like images, fonts, etc.
├── boot/            # Boot files for Quasar initialization
├── components/      # Vue components
│   ├── Featured/    # Main feature components used in the application
│   └── Playground/  # Components for development and testing
├── css/             # CSS files for styling
├── data/            # Data files used by the application
├── helpers/         # Helper functions and utilities
├── i18n/            # Internationalization files
├── layouts/         # Layout components
├── pages/           # Page components
│   ├── Error/       # Error pages (404, etc.)
│   └── TestTask/    # Main application pages
├── router/          # Vue Router configuration
└── stores/          # Pinia/Vuex stores
```

## Code Structure

Our Vue components follow a consistent structure according to our coding standards:

### Component Structure (Vue SFC)
