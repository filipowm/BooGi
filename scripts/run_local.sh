#!/bin/bash

echoerr() { echo "$@" 1>&2; }

link_data() {
  echo "Linking $1"
  [[ -n "$2" ]] && subpath=$2 || subpath=""
  [[ -n "$3" ]] && optional=$3 || optional=false
  if [[ -d "/develop/$1" ]]; then
    echo "skip"
    ln -sfn "/develop/$1/*" "/app/$subpath"
  elif [[ -f "/develop/$1" ]]; then
    ln -sfn "/develop/$1" "/app/$subpath"
  elif [ "$optional" = true ]; then
      echo "Optional path $1 does not exist"
  else
    echoerr "Error: Path $1 does not exist"
    exit -1
  fi
    return 0
}

link_data content content
link_data config.js
link_data assets static/assets/ true
link_data theme.js src/theme/main.js true

echo "Starting gatsby in development mode. It will run on your localhost!"
cd /app
gatsby develop --host $(ifconfig eth0 | grep 'inet' | awk '{print $2}')
exit $?
