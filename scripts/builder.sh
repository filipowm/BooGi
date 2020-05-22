#!/bin/bash
theme_file_name=theme.js
theme_path=src/theme/main.js
cd /app

if [[ -f "$theme_file_name" ]]; then
    echo "Copying Theme configuration"
    mv $theme_file_name $theme_path
fi

echo "Executing gatsby"
gatsby build

exit $?
