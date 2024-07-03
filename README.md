# Addresses form app

## Setup

1. Create a top-level `.env` file. Copy the contents of `.env.example` into it. Provide your [Google Maps API Key](https://developers.google.com/maps/documentation/javascript/get-api-key) in the VITE_GOOGLE_API_KEY variable.
2. Install node_modules with `yarn`. The repo includes a yarn release, so you don't need to set up yarn on your system.
3. Run the app with `yarn dev`.

## Tests

The app uses vitest (a jest alternative for vite) and React Testing Library. You can run tests with `yarn vitest`.
