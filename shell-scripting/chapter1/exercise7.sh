#!/bin/bash

# Modify the previous script so that it accepts the file or directory name as an argument instead of prompting the user to enter it.

# Cannon, Jason. Shell Scripting: How to Automate Command Line Tasks Using Bash Scripting and Shell Programming (p. 19). Kindle Edition. 

foo=$1

if [ -e "${foo}" ]
then
    if [ -f "${foo}" ]
    then
        echo "it exists and is a regular file"
    elif [ -d "${foo}" ]
    then
        echo "this is a directory"
    else
        echo "it is another type of file"
    fi
else
    echo "this file does not exist"
fi