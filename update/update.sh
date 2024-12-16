#!/bin/bash

file_path="./update/version"

# Read the number from the file
current_number=$(<"$file_path")

# Increment the number by 1
new_number=$((current_number + 1))

# Write the updated number back to the file
echo "$new_number" > "$file_path"

echo "Number successfully incremented and written to the file."
