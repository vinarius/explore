#!/bin/bash

# Write a shell script to check to see if the file "/etc/shadow" exists.  If it does exist, display "Shadow passwords are enabled."  Next, check to see if you can write to the file.  If you can, display "You have permissions to edit /etc/shadow."  If you cannot, display "You do NOT have permissions to edit /etc/shadow."

# Cannon, Jason. Shell Scripting: How to Automate Command Line Tasks Using Bash Scripting and Shell Programming (p. 18). Kindle Edition. 

if [ -e /etc/shadow ]
then
    echo "Shadow passwords are enabled."
    if [ -w /etc/shadow ]
    then
        echo "You have permissions to edit /etc/shadow."
    else
        echo "You do NOT have permissions to edit /etc/shadow."
    fi
fi