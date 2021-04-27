#! /bin/bash

for file in $1/*.jpg
do
convert $file -resize 540x360\> "$(echo $file |sed 's/\.jpg$//g')".thumb.jpg
done