#!/bin/bash

function foo() {
    echo "printing foo"
    bar
}

foo

function bar() {
    echo "printing bar"
}