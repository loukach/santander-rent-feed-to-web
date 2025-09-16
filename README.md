# Rental Catalog Application

A responsive web application for displaying vehicle rental catalogs from Motorflash XML files.

## Features

- 📱 Fully responsive design (1-4 columns based on screen size)
- 🔍 Advanced filtering (brand, price, search)
- 📊 Sorting options
- 🖼️ CORS proxy integration for external images
- 🚗 Beautiful vehicle cards with specifications
- ⚡ Fast XML parsing
- 🎨 Modern UI with Tailwind CSS

## Local Development

```bash
npm install
npm run dev
```

Visit http://localhost:3000

## Production Build

```bash
npm run build
npm run preview
```

## Deployment to Render

This app is configured for static site deployment on Render.com.

## Environment Variables

No environment variables required. The app uses a deployed CORS proxy at:
`https://cors-proxy-loukach.onrender.com`