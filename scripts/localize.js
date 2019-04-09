/* global app ExportFormat SaveOptions */

app.linkingPreferences.checkLinksAtOpen = false;

const path = app.activeScript.path;
const file = new File(path + "/KYR-Pamphlet.indd");

app.open(file);
const doc = app.activeDocument;

doc.links.everyItem().update();

const exportFileName = `${path}/export-${getFormattedTime(new Date())}.pdf`;

doc.exportFile(ExportFormat.PDF_TYPE, new File(exportFileName));

app.documents.everyItem().close(SaveOptions.NO);

// //////////////////////////////////////////

function pad(num) {
  const str = num.toString();
  return ("00" + str).substring(str.length);
}

// https://stackoverflow.com/a/44485468
function getFormattedTime(date) {
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
