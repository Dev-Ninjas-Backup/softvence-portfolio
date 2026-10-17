#!/bin/zsh
# Render a section and diff it against its Figma baseline.
# Usage: scripts/cmp.sh <765-xxxx> <css-selector> [cols] [rows] [threshold]
set -e
key=$1
sel=$2
cols=${3:-16}
rows=${4:-24}
thr=${5:-0.1}
base=.figma/shots/$key.png
mkdir -p .figma/render .figma/base
if [ ! -f .figma/base/$key.png ]; then
  node scripts/flatten.mjs "$base" ".figma/base/$key.png" >/dev/null
fi
HIDE=header node scripts/shoot.mjs .figma/render/$key.raw.png "$sel" | tail -1
node scripts/flatten.mjs .figma/render/$key.raw.png .figma/render/$key.png >/dev/null
node scripts/diffgrid.mjs .figma/base/$key.png .figma/render/$key.png "$cols" "$rows" "$thr"
