#!/bin/bash
cd /home/kavia/workspace/code-generation/devportfolio-hub-98241-6f725ef9/portfolio_frontend
npm run build
EXIT_CODE=$?
if [ $EXIT_CODE -ne 0 ]; then
   exit 1
fi

