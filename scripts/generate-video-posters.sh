#!/bin/bash

# Script to generate poster images from video files
# Extracts a frame at 5 seconds from each video at 640x480 resolution
# (Skips intro graphics that appear at the beginning)

VIDEO_DIR="public/video"
POSTER_DIR="public/video/poster"
cd "$(dirname "$0")/.."

if [ ! -d "$VIDEO_DIR" ]; then
  echo "Error: $VIDEO_DIR directory not found"
  exit 1
fi

# Create poster directory if it doesn't exist
mkdir -p "$POSTER_DIR"

echo "Generating 640x480 poster images from videos..."
echo "-------------------------------------------"

for video in "$VIDEO_DIR"/*.mp4; do
  if [ -f "$video" ]; then
    # Get the base filename without extension
    basename=$(basename "$video" .mp4)
    output="${POSTER_DIR}/${basename}.jpg"
    
    echo "Processing: $basename.mp4"
    
    # Extract frame at 5 seconds, scale to 640x480
    ffmpeg -i "$video" -ss 00:00:05 -vframes 1 -s 640x480 -q:v 2 "$output" -y 2>/dev/null
    
    if [ $? -eq 0 ]; then
      echo "  ✓ Created: poster/${basename}.jpg"
    else
      echo "  ✗ Failed to create poster for ${basename}.mp4"
    fi
  fi
done

echo "-------------------------------------------"
echo "Done! Poster images saved to $POSTER_DIR/"
