rm ./copy-dest/*.icml

for file in copy-src/*.md; do
    name=$(basename "$file" | cut -f 1 -d '.')
    echo "$file -> ./copy-dest/$name.icml"
    pandoc "$file" -s -o "./copy-dest/$name.icml"
done
