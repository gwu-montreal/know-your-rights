var _map = function _map(array, callback) {
  var newArray = [];

  for (var i = 0; i < array.length; i++) {
    newArray.push(callback(array[i], i, array));
  }

  return newArray;
};

var _forEach = function _forEach(array, callback) {
  for (var i = 0; i < array.length; i++) {
    callback(array[i], i, array);
  }
};

// configure these here (for now)
var locales = ["la"];
var inddFilename = "KYR-Pamphlet.indd";
var exportDirectory = "pdfs"; // must exist!
// //////////////

/* global app ExportFormat SaveOptions */

var path = app.activeScript.path + "/";
var exportPath = path + exportDirectory + "/";
var inddFile = new File("".concat(path).concat(inddFilename)); // we'd rather polyfill this with babel, but the extendscript preset doesn't do it

if (!String.prototype.endsWith) {
  String.prototype.endsWith = function (search, this_len) {
    if (this_len === undefined || this_len > this.length) {
      this_len = this.length;
    }

    return this.substring(this_len - search.length, this_len) === search;
  };
} // ////////////////////
// indesign always claims that links are modified -- seems based on mtime rather
// than content


app.linkingPreferences.checkLinksAtOpen = false;
var now = new Date(); // Main doc

function exportMain() {
  app.open(inddFile);
  var doc = app.activeDocument;
  doc.links.everyItem().update();
  var exportFileName = "".concat(exportPath, "/en-").concat(getFormattedTime(now), ".pdf");
  doc.exportFile(ExportFormat.PDF_TYPE, new File(exportFileName));
  doc.close(SaveOptions.NO);
}

exportMain(); // Locales

_forEach(locales, function (locale) {
  app.open(inddFile);
  var doc = app.activeDocument;

  for (var i = 0; i < doc.links.length; i++) {
    var link = doc.links[i];

    if (link.name.endsWith(".icml")) {
      var p = link.filePath;
      var newFile = new File("".concat(p.substring(0, p.indexOf(".icml")), "-").concat(locale, ".icml"));

      if (newFile.exists) {
        link.relink(newFile);
      }
    }
  }

  var exportFileName = "".concat(exportPath, "/").concat(locale, "-").concat(getFormattedTime(now), ".pdf");
  doc.exportFile(ExportFormat.PDF_TYPE, new File(exportFileName));
  doc.close(SaveOptions.NO);
}); // doc.links.everyItem().update();
// //////////////////////////////////////////


function pad(num) {
  var str = num.toString();
  return ("00" + str).substring(str.length);
}

function getFormattedTime(date) {
  return date.getFullYear() + "-" + _map([// JavaScript months are 0-based.
  date.getMonth() + 1, date.getDate(), date.getHours(), date.getMinutes(), date.getSeconds()], pad).join("-");
}
