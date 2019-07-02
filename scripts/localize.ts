// configure these here (for now)
const locales = ["fr"];
const inddFilename = "KYR-Pamphlet.indd";
const exportDirectory = "pdfs"; // must exist!
const saveDirectory = "localized-indd"; // must exist!
// //////////////

const path = app.activeScript.path + "/";
const savePath = path + saveDirectory + "/";
const exportPath = path + exportDirectory + "/";
const inddFile = new File(`${path}${inddFilename}`);

// we'd rather polyfill this with babel, but the extendscript preset doesn't do it
if (!String.prototype.endsWith) {
  String.prototype.endsWith = function(search, this_len) {
    if (this_len === undefined || this_len > this.length) {
      this_len = this.length;
    }
    return this.substring(this_len - search.length, this_len) === search;
  };
}
// ////////////////////

// indesign always claims that links are modified -- seems based on mtime rather
// than content
app.linkingPreferences.checkLinksAtOpen = false;

const now = new Date();

// Main doc
function exportMain() {
  app.open(inddFile);
  const doc = app.activeDocument;
  doc.links.everyItem().update();
  const exportFileName = `${exportPath}/en-${getFormattedTime(now)}.pdf`;
  doc.exportFile(ExportFormat.PDF_TYPE, new File(exportFileName));
  doc.close(SaveOptions.NO);
}
exportMain();

// Locales
locales.forEach(locale => {
  app.open(inddFile);
  const doc = app.activeDocument;

  for (let i = 0; i < doc.links.length; i++) {
    const link = doc.links[i];
    if (link.name.endsWith(".icml")) {
      const p = link.filePath as string;
      const newFile = new File(p.replace("\\en\\", `\\${locale}\\`));
      if (newFile.exists) {
        link.relink(newFile);
      }
    }
  }

  const saveFileName = `${savePath}/${locale}-${getFormattedTime(now)}.indd`;
  doc.saveACopy(new File(saveFileName));

  const exportFileName = `${exportPath}/${locale}-${getFormattedTime(now)}.pdf`;

  doc.exportFile(ExportFormat.PDF_TYPE, new File(exportFileName));
  doc.close(SaveOptions.NO);
});

// //////////////////////////////////////////

function pad(num: number) {
  const str = num.toString();
  return ("00" + str).substring(str.length);
}

function getFormattedTime(date: Date) {
  return (
    date.getFullYear() +
    "-" +
    [
      // JavaScript months are 0-based.
      date.getMonth() + 1,
      date.getDate(),
      date.getHours(),
      date.getMinutes(),
      date.getSeconds()
    ]
      .map(pad)
      .join("-")
  );
}
