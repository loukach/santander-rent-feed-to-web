# Santander Long Term Rental Platform

A professional vehicle rental marketplace application inspired by MotorK WebSpark design, featuring automatic data fetching from Motorflash API and provider selection system.

## 🚀 Live Demo

**Production URL**: https://santander-rental-app.onrender.com/

## ✨ Features

### Core Functionality
- 🏢 **Provider Selection System**: Multi-tenant marketplace with Santander Consumer Renting integration
- 🚗 **Real-time Vehicle Catalog**: Automatic XML data fetching from Motorflash API (43+ vehicles)
- 💰 **Financing Tables**: Comprehensive rental pricing with multiple duration/mileage options
- 🔍 **Advanced Filtering**: Brand selection, price range, search, and sorting capabilities
- 📱 **Responsive Design**: Optimized for desktop, tablet, and mobile devices

### Design & UX
- 🎨 **MotorK-Inspired Theme**: Dark professional design with red accents
- 🏷️ **Smart Badges**: Emission labels (ECO, C), availability status, promotion banners
- 🖼️ **Intelligent Images**: Vehicle photos with fallbacks and provider logos
- ⚡ **Performance**: Fast loading with optimized asset delivery

### Technical Features
- 🔄 **Automatic Data Sync**: Real-time updates from Motorflash API
- 🌐 **CORS Proxy Integration**: Seamless cross-origin data fetching
- 📊 **Rich Vehicle Data**: Complete specifications, pricing, and financing options
- 🎯 **Provider Branding**: Santander logos on cards and header

## 🛠️ Local Development

```bash
# Install dependencies
npm install

# Start development server with Vite proxy
npm run dev
```

Visit http://localhost:5173

### Development vs Production API

- **Development**: Uses Vite proxy (`/api/motorflash/...`)
- **Production**: Uses CORS proxy (`https://cors-proxy-loukach.onrender.com/proxy?url=...`)

## 🏗️ Production Build

```bash
# Build for production
npm run build

# Preview production build locally
npm run preview
```

## 🚀 Deployment

### Render.com Configuration

The application is deployed on Render.com with the following settings:

- **Build Command**: `npm install && npm run build`
- **Publish Directory**: `dist`
- **Branch**: `main`
- **Auto-Deploy**: Enabled

### Repository Structure

```
santander-rent-feed-to-web/
├── rental-catalog/          # Main React application
│   ├── src/
│   │   ├── components/      # React components
│   │   ├── utils/          # Utilities (XML parser, formatters)
│   │   └── App.jsx         # Main application
│   ├── dist/               # Production build output
│   └── package.json        # Dependencies and scripts
└── package.json            # Root package.json with workspace scripts
```

## 🔧 Environment Configuration

### Production Environment
- **API Endpoint**: Motorflash API via CORS proxy
- **CORS Proxy**: `https://cors-proxy-loukach.onrender.com`
- **CDN**: Render.com global CDN
- **SSL**: Automatic HTTPS

### No Environment Variables Required
All configuration is handled automatically based on build environment.

## 📊 Vehicle Data Structure

The application processes XML data from Motorflash API including:

- **Vehicle Details**: Brand, model, version, specifications
- **Pricing**: Monthly rental rates with multiple options
- **Technical Specs**: Fuel type, transmission, power, emissions
- **Media**: Vehicle images with fallback handling
- **Financing**: Complete rental terms and pricing matrix

## 🎨 Design System

### Color Palette
- **Primary**: Red (#DC2626) - Santander brand color
- **Background**: Dark gray (#111827) - Professional appearance
- **Cards**: White backgrounds with subtle shadows
- **Text**: High contrast for accessibility

### Typography
- **Headings**: Bold, clear hierarchy
- **Body Text**: Optimized for readability
- **Pricing**: Emphasized display typography

## 🔄 Recent Updates

- ✅ **API Integration**: Fixed production CORS proxy configuration
- ✅ **Provider System**: Implemented Santander selection with visual feedback
- ✅ **Financing Display**: Added comprehensive pricing tables
- ✅ **Performance**: Optimized build and deployment process
- ✅ **Responsive Design**: Enhanced mobile and tablet experience

## 📱 Browser Support

- ✅ Chrome/Edge 90+
- ✅ Firefox 90+
- ✅ Safari 14+
- ✅ Mobile browsers (iOS Safari, Chrome Mobile)

## 🤝 Contributing

This application was built as part of the Santander Consumer Renting digital transformation initiative, implementing MotorK WebSpark design principles for an enhanced user experience.