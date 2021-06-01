#! /bin/bash

for file in $1/*.jpg
do
convert $file -resize 1920x1280\> "$(echo $file |sed 's/\.jpg$//g')".jpg
done