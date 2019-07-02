# Know Your Rights Pamphlet
# GWU Montreal & S'ATTAQ

## Instructions

With [`pandoc`](https://pandoc.org/) installed on your system and available on
your path, run `pandoc.sh` from a bash-compatible prompt. (On Windows this could
be the Git Bash included with Git for Windows.) This will convert all the
Markdown files in the `copy-src` directory to files compatible with InDesign,
which will be placed in the `copy-dest` folder.

You can then place these files in your InDesign document using the `Place...`
command. The placed documents will be "linked," meaning if they change in the
future the links can be updated without needing to manually go back into
InDesign and keep the copy in sync.

The `pandoc.sh` script will also generate a basic HTML file and place it at
`docs/index.html` (using the template named `web-template.html` in the root of
this repo). This makes it easy to publish a simple web version via GitHub Pages.

[Read more](https://github.com/jgm/pandoc/wiki/Importing-Markdown-in-InDesign)
about usage of Markdown with InDesign.

## Localization

An experimental script for creating localized PDFs for print based on InDesign
files is included. On Windows, double-click "export-localized.bat" (or run it
from the command-line). It will open the project file in InDesign, replace all
document links with their localized versions for each language, and export a PDF
and InDesign file of the result (into the `pdfs/` and `localized-indd/` folders
respectively). **Note that you may have to close InDesign before running the
script.**

Note that this script has no guarantee of producing visually pleasing documents!
You will likely have to further modify the InDesign file and re-export it -- the
script exists to help scaffold the initial work, and should be considered
experimental.
