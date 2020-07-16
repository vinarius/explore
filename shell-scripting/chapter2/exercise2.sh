#!/bin/bash

# Write a shell script that accepts a file or directory name as an argument. Have the script report if it is a regular file, a directory, or another type of file.  If it is a regular file, exit with a 0 exit status.  If it is a directory, exit with a 1 exit status.  If it is some other type of file, exit with a 2 exit status.

# Cannon, Jason. Shell Scripting: How to Automate Command Line Tasks Using Bash Scripting and Shell Programming (p. 28). Kindle Edition. 

myArgument=$1

if [ -f myArgument ]
then
    echo "${myArgument} is a regular file"
    exit 0
elif [ -d myArgument ]
then
    echo "${myArgument} is a directory"
    exit 1
else
    echo "${myArgument} is another type of file"
    exit 2
fi