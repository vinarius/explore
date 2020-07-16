#!/bin/bash

# Write a script that executes the command "cat /etc/shadow".  If the command returns a 0 exit status, report "Command succeeded" and exit with a 0 exit status.  If the command returns a non-zero exit status, report "Command failed" and exit with a 1 exit status.

# Cannon, Jason. Shell Scripting: How to Automate Command Line Tasks Using Bash Scripting and Shell Programming (pp. 28-29). Kindle Edition. 

cat /etc/shadow

catExitStatus="$?"

# catExitStatus="0" && echo "Command succeeded"
# catExitStatus!="0" &&  echo "Command failed" && exit 1

if [ "${catExitStatus}" = "0" ]
then
    echo "Command succeeded"
fi

if [ "${catExitStatus}" != "0" ]
then
    echo "Command failed"
    exit 1
fi