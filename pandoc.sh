echo "Creating InCopy files."
for folder in copy-src/*/; do
  echo "  Folder: $folder"
  lang=$(basename "$folder")
  rm ./copy-dest/$lang/*.icml > /dev/null 2>&1 # don't sweat it if there's no files there already
  for file in $folder*.md; do
      name=$(basename "$file" | cut -f 1 -d '.')
      echo "    $file -> ./copy-dest/$lang/$name.icml"
      pandoc "$file" -s -o "./copy-dest/$lang/$name.icml"
  done
done

echo "Creating HTML document."
pandoc $(find copy-src/en -type f | sort) --template="web-template.html"\
  -o "./docs/index.html" --metadata title="Know Your Rights!" -c "main.css"

echo "Done."
