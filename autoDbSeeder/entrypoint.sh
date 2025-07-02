#!/bin/sh

sleep 10

# mkfifo /tmp/mypipe
cd /app
npm ci
node autoSeed.js


# while read SIGNAL; do
#     case "$SIGNAL" in
#         *EXIT*)break;;
#         *)echo "signal  $SIGNAL  is unsupported" >/dev/stderr;;
#     esac
# done < /tmp/mypipe