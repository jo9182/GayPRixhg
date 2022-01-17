#!/bin/bash

if ! command -v cargo &> /dev/null
then
	echo "You must install Rust and Cargo"
	exit
fi

cd src; cargo run 
