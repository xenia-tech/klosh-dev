#!/bin/bash

# CSS Audit Script
# This script checks if HTML files follow the standardized CSS loading order

echo "CSS Loading Order Audit"
echo "======================="
echo

# Define the expected CSS loading order
expected_order=(
  "core.css"
  "theme.css"
  "components.css"
  "pages.css"
  "responsive-fixes.css"
)

# Find all HTML files in the project
html_files=$(find /Users/martincartwright/Documents/klosh-github -name "*.html" -not -path "*/node_modules/*" -not -path "*/build/*")

# Check each HTML file
for file in $html_files; do
  echo "Checking: $file"
  
  # Extract CSS links
  css_links=$(grep -o '<link[^>]*href="[^"]*\.css[^"]*"[^>]*>' "$file" | grep -v "font-awesome")
  
  # Check if the file has CSS links
  if [ -z "$css_links" ]; then
    echo "  No CSS links found"
    continue
  fi
  
  # Check if core.css is included
  if ! echo "$css_links" | grep -q "core.css"; then
    echo "  ❌ Missing core.css"
  else
    echo "  ✅ Has core.css"
  fi
  
  # Check for direct imports of files that should be imported through core.css
  if echo "$css_links" | grep -q "plugins.css"; then
    echo "  ⚠️ Directly imports plugins.css (should be imported through core.css)"
  fi
  
  if echo "$css_links" | grep -q "style.css"; then
    echo "  ⚠️ Directly imports style.css (should be imported through core.css)"
  fi
  
  if echo "$css_links" | grep -q "custom.css"; then
    echo "  ⚠️ Directly imports custom.css (should be imported through core.css)"
  fi
  
  echo
done

echo "Audit complete!"
