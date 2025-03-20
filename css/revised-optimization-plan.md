# Revised CSS Optimization Plan

## Goal: Reduce to 7-8 CSS Files Total

Based on our analysis, we need to consolidate our CSS into fewer, more logical files instead of creating additional module files.

## Target CSS Structure (7 files)

1. **reset.css**
   - Basic reset styles
   - Normalize styles
   - Typography base

2. **core.css**
   - Layout fundamentals
   - Grid system
   - Common elements
   - Forms
   - Buttons

3. **components.css**
   - Navigation
   - Cards
   - Modals/popups
   - Accordions
   - Tabs
   - Other reusable UI components

4. **theme.css**
   - Colors
   - Fonts
   - Theme-specific styling
   - Dark mode support

5. **pages.css**
   - Page-specific styles
   - Unique layouts
   - Special sections

6. **project-styles.css**
   - Project-specific overrides
   - Portfolio styles
   - Case study layouts

7. **responsive.css**
   - All media queries
   - Mobile-specific adjustments
   - Print styles

## Implementation Strategy

### Phase 1: Consolidation
1. Merge all consolidated files (blog-consolidated.css, colors-consolidated.css, etc.) into their appropriate target files
2. Merge modules/* files into their logical target files
3. Remove plugins.css by distributing its contents to appropriate target files
4. Merge style.css and custom.css into core.css

### Phase 2: Cleanup
1. Remove duplicate styles
2. Standardize naming conventions
3. Organize each file with clear sections and comments

### Phase 3: Implementation
1. Update HTML files to reference only the 7 target CSS files
2. Test thoroughly on all pages
3. Remove all unused CSS files

## File Mapping (Current → Target)

- plugins.css → split between reset.css and core.css
- style.css → core.css
- custom.css → core.css
- modules/* → appropriate target files
- blog-consolidated.css → pages.css
- colors-consolidated.css → theme.css
- contact-consolidated.css → pages.css
- portfolio-consolidated.css → project-styles.css
- project-pages-consolidated.css → project-styles.css
- darkMode.css → theme.css
- responsive-fixes.css → responsive.css

This approach will result in 7 well-organized CSS files that follow a logical structure and are easier to maintain.
