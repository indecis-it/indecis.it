#!/bin/bash

MESSAGE=$(git log -1 HEAD --pretty=format:%s)

if [[ "$MESSAGE" == *\[skip\]* ]]; then
  # Don't build
  echo "🛑 - Build cancelled"
  exit 0;
else
  # Proceed with the build
  echo "✅ - Build can proceed"
  exit 1;
fi
