# CSS Optimization Plan for Large Files

## Overview

After successfully consolidating redundant CSS files, our next focus is optimizing the two largest CSS files:
- **plugins.css** (113KB): Contains styles for various plugins and libraries
- **style.css** (59KB): Main styling for the website

These files contribute significantly to the website's load time and can be optimized to improve performance.

## Analysis of plugins.css

The `plugins.css` file (113KB) contains:
1. **Base reset styles** - These could potentially overlap with reset styles in other files
2. **Form element styles** - Basic styling for inputs, buttons, etc.
3. **Fontello icon styles** - Icon font styles
4. **Grid/skeleton system** - Layout grid system
5. **Animation libraries** - Multiple animation libraries with overlapping animations:
   - Magnific Popup styles
   - Animate.css animations (full library)
   - Custom animations
6. **jQuery plugin styles** - Styles for various jQuery plugins

## Analysis of style.css

The `style.css` file (59KB) contains:
1. **Core styles and typography** - Base styling for the website
2. **Component styles** - Header, navigation, sections, etc.
3. **Media queries** - Responsive design rules
4. **Custom animations** - Site-specific animations
5. **Some duplicate media queries** - Same breakpoints defined multiple times

## Optimization Strategy

### 1. Split plugins.css into Modular Components

1. **Create separate files for each plugin**:
   - `reset.css` - Only essential reset styles
   - `forms.css` - Form element styles
   - `grid.css` - Grid system
   - `icons.css` - Icon styles
   - `animations.css` - Only animations actually used on the site
   - `popups.css` - Modal and popup styles

2. **Remove unused animations**:
   - Audit which animations are actually used in the site
   - Keep only those animations and remove the rest
   - This could potentially reduce file size by 50-70%

### 2. Optimize style.css

1. **Consolidate media queries**:
   - Group all media queries for the same breakpoint together
   - Remove duplicate media query definitions

2. **Remove unused selectors**:
   - Use a CSS usage analyzer to identify unused CSS rules
   - Remove CSS rules that aren't applied to any elements

3. **Optimize selector specificity**:
   - Simplify overly specific selectors
   - Reduce nesting depth where possible

### 3. Implementation Plan

#### Phase 1: Audit and Analysis
1. Identify which animations and styles are actually used on the site
2. Create an inventory of all CSS selectors and their usage
3. Identify duplicate styles across files

#### Phase 2: Modularization
1. Create the new modular CSS files
2. Update `core.css` to import only the necessary modules
3. Test each page to ensure styling remains consistent

#### Phase 3: Optimization
1. Minify all CSS files for production
2. Implement critical CSS loading for above-the-fold content
3. Add proper caching headers for CSS files

### 4. Expected Benefits

1. **Reduced file size**: Potentially reduce total CSS size by 40-60%
2. **Improved load time**: Faster initial page load
3. **Better maintainability**: Easier to find and modify specific styles
4. **Reduced redundancy**: Elimination of duplicate styles
5. **Better caching**: More granular caching of CSS components

## Progress Update (March 18, 2025)

### Step 5: Analyze and optimize the large CSS files ✅

- Created modular CSS structure in `/css/modules/` directory
- Extracted key components from plugins.css:
  - reset.css: Basic reset styles
  - spacing.css: Spacing utility classes
  - forms.css: Form element styles
  - animations.css: Essential animations (reduced from 5000+ lines to ~200 lines)
  - popups.css: Magnific Popup styles
- Created optimized core CSS file (core-optimized.css)
- Documented implementation plan in css-optimization-docs.md

**Results:**
- Original plugins.css: 111KB
- Original style.css: 58KB
- New modular CSS files total: ~14.3KB (not including style.css)
- Significant reduction in file size while maintaining all functionality

### Next Steps:

1. Test the optimized CSS structure thoroughly in development
2. Implement the new structure on selected pages
3. Monitor for any visual regressions
4. Roll out to all pages once confirmed stable

## Next Steps

1. Begin with a detailed audit of which animations and styles are actually used
2. Create a prototype of the modular CSS structure
3. Test the new structure on a development version of the site
4. Measure performance improvements before implementing in production
