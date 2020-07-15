#!/bin/bash

# Write a shell script that prompts the user for a name of a file or directory and reports if it is a regular file, a directory, or another type of file. Also perform an ls command against the file or directory with the long listing option.

# Cannon, Jason. Shell Scripting: How to Automate Command Line Tasks Using Bash Scripting and Shell Programming (pp. 18-19). Kindle Edition. 

read -p "Name of file or directory:" foo

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