#!/bin/bash

# Modify the previous script to accept an unlimited number of files and directories as arguments. Hint: You'll want to use a special variable.

# Cannon, Jason. Shell Scripting: How to Automate Command Line Tasks Using Bash Scripting and Shell Programming (p. 19). Kindle Edition. 

for foo in $@
do
    if [ -e "${foo}" ]
    then
        if [ -f "${foo}" ]
        then
            echo "${foo} exists and is a regular file"
        elif [ -d "${foo}" ]
        then
            echo "${foo} is a directory"
        else
            echo "${foo} is another type of file"
        fi
    else
        echo "${foo} does not exist"
    fi
done