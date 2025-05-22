#!/bin/bash
cd /home/kavia/workspace/code-generation/moodmeal-tracker-95028-95033/main_container_for_moodmeal_tracker
npm run build
EXIT_CODE=$?
if [ $EXIT_CODE -ne 0 ]; then
   exit 1
fi

