#!/bin/bash

# Script to ensure we're always on the main branch
# Created on: March 25, 2025

echo "🔍 Checking current Git branch..."
CURRENT_BRANCH=$(git branch --show-current)

if [ "$CURRENT_BRANCH" != "main" ]; then
    echo "⚠️ Currently on branch: $CURRENT_BRANCH"
    echo "🔄 Switching to main branch..."
    git checkout main
    
    if [ $? -eq 0 ]; then
        echo "✅ Successfully switched to main branch"
    else
        echo "❌ Failed to switch to main branch. Please resolve any conflicts manually."
        exit 1
    fi
else
    echo "✅ Already on main branch"
fi

echo "📊 Current branch status:"
git status -s

echo ""
echo "🔔 REMINDER: Always verify you're on the main branch before making commits!"
echo "   Run 'git branch' to check your current branch at any time."
echo ""
