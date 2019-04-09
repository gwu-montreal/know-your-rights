rm ./copy-dest/*.icml

for file in copy-src/*.md; do
    name=$(basename "$file" | cut -f 1 -d '.')
    echo "$file -> ./copy-dest/$name.icml"
    pandoc "$file" -s -o "./copy-dest/$name.icml"
done

echo "writing text.md and who-are-we.md to html..."
pandoc "./copy-src/text.md" "./copy-src/who-are-we.md" --template="web-template.html"\
  -o "./docs/index.html" --metadata pagetitle="Know Your Rights!" -c "main.css"
