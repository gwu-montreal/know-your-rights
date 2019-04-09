var _map = function _map(array, callback) {
  var newArray = [];

  for (var i = 0; i < array.length; i++) {
    newArray.push(callback(array[i], i, array));
  }

  return newArray;
};

/* global app ExportFormat SaveOptions */
app.linkingPreferences.checkLinksAtOpen = false;
var path = app.activeScript.path;
var file = new File(path + "/KYR-Pamphlet.indd");
app.open(file);
var doc = app.activeDocument;
doc.links.everyItem().update();
var exportFileName = "".concat(path, "/export-").concat(getFormattedTime(new Date()), ".pdf");
doc.exportFile(ExportFormat.PDF_TYPE, new File(exportFileName));
app.documents.everyItem().close(SaveOptions.NO); // //////////////////////////////////////////

function pad(num) {
  var str = num.toString();
  return ("00" + str).substring(str.length);
} // https://stackoverflow.com/a/44485468


function getFormattedTime(date) {
  return date.getFullYear() + "-" + _map([// JavaScript months are 0-based.
  date.getMonth() + 1, date.getDate(), date.getHours(), date.getMinutes(), date.getSeconds()], pad).join("-");
}
