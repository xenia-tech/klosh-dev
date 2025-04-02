const fs = require('fs');
const path = require('path');
const cheerio = require('cheerio');

// Configuration
const htmlDir = path.join(__dirname);
const cssDir = path.join(__dirname, 'css');
const outputFile = path.join(__dirname, 'css-usage-report.md');

// Find all HTML files
function findHtmlFiles(dir, fileList = []) {
  const files = fs.readdirSync(dir);
  
  files.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    
    if (stat.isDirectory() && file !== 'node_modules') {
      findHtmlFiles(filePath, fileList);
    } else if (file.endsWith('.html')) {
      fileList.push(filePath);
    }
  });
  
  return fileList;
}

// Extract class names from HTML files
function extractClassesFromHtml(htmlFiles) {
  const allClasses = new Set();
  
  htmlFiles.forEach(file => {
    const html = fs.readFileSync(file, 'utf8');
    const $ = cheerio.load(html);
    
    $('[class]').each((i, el) => {
      const classNames = $(el).attr('class').split(/\s+/);
      classNames.forEach(className => {
        if (className.trim()) {
          allClasses.add(className.trim());
        }
      });
    });
  });
  
  return Array.from(allClasses).sort();
}

// Extract animation names from CSS files
function extractAnimationsFromCss(cssFiles) {
  const animations = new Set();
  
  cssFiles.forEach(file => {
    const css = fs.readFileSync(file, 'utf8');
    
    // Find animation-name declarations
    const animNameRegex = /animation-name:\s*([a-zA-Z0-9_-]+)/g;
    let match;
    while ((match = animNameRegex.exec(css)) !== null) {
      animations.add(match[1]);
    }
    
    // Find @keyframes declarations
    const keyframesRegex = /@keyframes\s+([a-zA-Z0-9_-]+)/g;
    while ((match = keyframesRegex.exec(css)) !== null) {
      animations.add(match[1]);
    }
  });
  
  return Array.from(animations).sort();
}

// Find CSS files
function findCssFiles(dir) {
  return fs.readdirSync(dir)
    .filter(file => file.endsWith('.css'))
    .map(file => path.join(dir, file));
}

// Check which animations are actually used
function findUsedAnimations(htmlClasses, cssAnimations, cssFiles) {
  const usedAnimations = new Set();
  const unusedAnimations = new Set(cssAnimations);
  
  cssFiles.forEach(file => {
    const css = fs.readFileSync(file, 'utf8');
    
    htmlClasses.forEach(className => {
      const classSelector = `.${className}`;
      if (css.includes(classSelector)) {
        // Check if this class uses any animations
        const classRegex = new RegExp(`${classSelector}[^}]*animation-name:\\s*([a-zA-Z0-9_-]+)`, 'g');
        let match;
        while ((match = classRegex.exec(css)) !== null) {
          usedAnimations.add(match[1]);
          unusedAnimations.delete(match[1]);
        }
      }
    });
  });
  
  return {
    used: Array.from(usedAnimations).sort(),
    unused: Array.from(unusedAnimations).sort()
  };
}

// Generate report
function generateReport(htmlFiles, cssFiles, htmlClasses, cssAnimations, animationUsage) {
  let report = '# CSS Usage Analysis Report\n\n';
  
  report += '## Overview\n\n';
  report += `- Total HTML files analyzed: ${htmlFiles.length}\n`;
  report += `- Total CSS files analyzed: ${cssFiles.length}\n`;
  report += `- Total unique class names found: ${htmlClasses.length}\n`;
  report += `- Total animations defined: ${cssAnimations.length}\n`;
  report += `- Used animations: ${animationUsage.used.length}\n`;
  report += `- Unused animations: ${animationUsage.unused.length}\n\n`;
  
  report += '## CSS Files Analyzed\n\n';
  cssFiles.forEach(file => {
    const stats = fs.statSync(file);
    const sizeKB = (stats.size / 1024).toFixed(2);
    report += `- ${path.basename(file)} (${sizeKB} KB)\n`;
  });
  
  report += '\n## Used Animations\n\n';
  animationUsage.used.forEach(anim => {
    report += `- ${anim}\n`;
  });
  
  report += '\n## Unused Animations\n\n';
  animationUsage.unused.forEach(anim => {
    report += `- ${anim}\n`;
  });
  
  return report;
}

// Main function
async function analyzeCSS() {
  console.log('Finding HTML files...');
  const htmlFiles = findHtmlFiles(htmlDir);
  
  console.log('Finding CSS files...');
  const cssFiles = findCssFiles(cssDir);
  
  console.log('Extracting classes from HTML...');
  const htmlClasses = extractClassesFromHtml(htmlFiles);
  
  console.log('Extracting animations from CSS...');
  const cssAnimations = extractAnimationsFromCss(cssFiles);
  
  console.log('Analyzing animation usage...');
  const animationUsage = findUsedAnimations(htmlClasses, cssAnimations, cssFiles);
  
  console.log('Generating report...');
  const report = generateReport(htmlFiles, cssFiles, htmlClasses, cssAnimations, animationUsage);
  
  fs.writeFileSync(outputFile, report);
  console.log(`Report saved to ${outputFile}`);
}

// Run the analysis
analyzeCSS().catch(err => console.error(err));
