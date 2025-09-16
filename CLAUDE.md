# Claude Development Guidelines

## Browser MCP Validation Workflow

### Required for All Web Deployments
- Always use browser MCP to validate web deployments after going live
- Take screenshots before and after key interactions for visual validation
- Check console logs for JavaScript errors and warnings
- Test responsive design and key user flows
- Validate API integrations work in production environment

### Standard Browser MCP Validation Steps
```javascript
// 1. Navigate to deployed application
mcp__browsermcp__browser_navigate("https://app-name.onrender.com")

// 2. Take initial screenshot for visual validation
mcp__browsermcp__browser_screenshot()

// 3. Check console for errors immediately after load
mcp__browsermcp__browser_get_console_logs()

// 4. Test key user interactions (buttons, forms, navigation)
mcp__browsermcp__browser_click("primary button", "button_ref")
mcp__browsermcp__browser_wait(2)

// 5. Take screenshot after interactions
mcp__browsermcp__browser_screenshot()

// 6. Final console check for interaction-related errors
mcp__browsermcp__browser_get_console_logs()
```

## Render Deployment Standards

### Required Configuration
- **Region**: Always use `frankfurt` (Europe) for GDPR compliance and performance
- **Plan**: Use `free` tier for development/testing, `starter` for production
- **Auto-Deploy**: Enable for continuous deployment from main branch

### Static Site Template
```javascript
mcp__render__create_static_site({
  name: "project-name",
  repo: "https://github.com/user/repo-name",
  branch: "main",
  buildCommand: "npm install && npm run build",
  publishPath: "dist",
  region: "frankfurt",  // Europe region
  plan: "free"          // Free tier
})
```

### Web Service Template
```javascript
mcp__render__create_web_service({
  name: "service-name",
  repo: "https://github.com/user/repo-name",
  runtime: "node",
  buildCommand: "npm install",
  startCommand: "npm start",
  plan: "free",         // Free tier
  region: "frankfurt"   // Europe region
})
```

## Development Process Checklist

### Pre-Deployment
- [ ] Build passes locally: `npm run build`
- [ ] Test development server: `npm run dev`
- [ ] Check for TypeScript/linting errors
- [ ] Verify API endpoints work with correct CORS configuration
- [ ] Test responsive design locally

### Deployment
- [ ] Deploy to Render with Frankfurt region and free tier
- [ ] Wait for build completion and live status
- [ ] Note the deployed URL for validation

### Post-Deployment Validation (Required)
- [ ] Navigate to deployed app with browser MCP
- [ ] Take initial screenshot
- [ ] Check console logs for errors
- [ ] Test primary user flows (forms, buttons, navigation)
- [ ] Verify API calls work in production
- [ ] Test responsive behavior if applicable
- [ ] Take final screenshot after testing
- [ ] Document any issues found

## Code Standards

### API Integration Patterns
```javascript
// Always use environment-aware API URLs
const apiUrl = import.meta.env.DEV
  ? '/api/endpoint'  // Development proxy
  : 'https://cors-proxy.onrender.com/proxy?url=' + encodeURIComponent('https://api.external.com/endpoint')
```

### Error Handling
- Always implement proper error states in UI
- Log errors to console for debugging
- Provide user-friendly error messages
- Test error scenarios during validation

### Performance Considerations
- Optimize images and assets for web delivery
- Use lazy loading for non-critical content
- Implement proper loading states
- Test performance on deployed environment

## Chromium Snap Usage

### Local Testing Commands
```bash
# Install Chromium snap
sudo snap install chromium

# Launch for development testing
chromium --disable-web-security --user-data-dir="/tmp/chrome_dev"

# Headless testing
chromium --headless --screenshot=/tmp/test.png https://localhost:5173
```

## Project-Specific Guidelines

### Santander Rental Platform
- Use MotorK WebSpark design principles
- Maintain Santander brand colors (red #DC2626)
- Ensure provider selection system works correctly
- Validate financing table displays properly
- Test vehicle card interactions and details expansion

### Common Patterns
- Dark theme with professional styling
- Responsive grid layouts for vehicle cards
- Provider logo integration in cards and headers
- CORS proxy for external API integration
- Comprehensive filtering and search functionality

## Troubleshooting Guide

### Common Issues
1. **CORS Errors**: Ensure production uses proper CORS proxy format
2. **404 on Deploy**: Check build command and publish directory
3. **API Failures**: Verify environment-specific URL configuration
4. **Image Loading**: Test image fallbacks and proxy URLs

### Validation Failures
- If console shows errors: Fix and redeploy
- If screenshots show broken layout: Check CSS builds
- If interactions fail: Debug JavaScript and event handlers
- If API calls fail: Verify CORS proxy configuration

## Documentation Requirements

### After Successful Deployment
- Update README.md with live demo URL
- Document any new features or changes
- Note deployment configuration used
- Include browser MCP validation results

### Commit Message Format
```
feat: Add new feature

- Detailed description of changes
- Browser MCP validation completed
- Deployed to Render Frankfurt (free tier)
- All console checks passed

🤖 Generated with [Claude Code](https://claude.ai/code)

Co-Authored-By: Claude <noreply@anthropic.com>
```

---

**Remember**: Every web deployment must be validated with browser MCP tools and deployed to Render's Europe region with appropriate tier selection.