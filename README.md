# Klosh Website Documentation

## File Structure
- `css/`: Contains all styling files
  - `plugins.css`: Third-party plugin styles
  - `colors.css`: Color schemes and variables
  - `darkMode.css`: Dark theme styles
  - `style.css`: Main website styles
  - `custom.css`: Custom overrides
  - `blog.css`: Blog-specific styles
  - `portfolio.css`: Portfolio-specific styles
  - `contact-fix.css`: Contact form fixes

## CSS Organization
Each CSS file serves a specific purpose to maintain clean separation of concerns:
- Base styles are in `style.css`
- Theme-specific styles in `colors.css` and `darkMode.css`
- Component-specific styles in respective files (blog, portfolio)
- Custom overrides should always go in `custom.css`

## JavaScript
Main functionality is in `js/init.js`, which handles:
- Image loading and optimization
- Contact form functionality
- Navigation and menu behavior
- Smooth scrolling
- Mobile responsiveness

## Images
- Blog images are loaded from external sources (Pexels and digital38.com)
- Logo and UI elements are stored locally in `img/` directory
- Images use responsive loading techniques

## Best Practices
1. Always test changes in a local environment first
2. Keep custom styles in `custom.css` for easy maintenance
3. Use cache busting parameter (?v=1) for CSS updates
4. Maintain existing class naming conventions
5. Test across different devices and browsers

## Making Changes
1. For style changes:
   - First try to use existing classes
   - If new styles needed, add to appropriate CSS file
   - Document any complex CSS selectors
2. For JavaScript changes:
   - Test thoroughly as functions may be interconnected
   - Maintain jQuery compatibility
   - Check mobile functionality

## Contact
For support or questions, contact the development team.
