function doGet(e) {
  // Change Spread Sheet url
  var ss = SpreadsheetApp.openByUrl(
    "https://docs.google.com/spreadsheets/d/1DPkYGboCsB0QW3FtQiB0pIywhp8zaA4GR5WxYg4Bx4c/edit#gid=1158203194"
  );

  // Sheet Name, Chnage Sheet1 to Users in Spread Sheet. Or any other name as you wish
  var sheet = ss.getSheetByName("Sheet1");

  return getUsers(sheet);
}

function getUsers(sheet) {
  var jo = {};
  var dataArray = [];

  // collecting data from 2nd Row , 1st column to last row and last column
  var rows = sheet
    .getRange(2, 1, sheet.getLastRow() - 1, sheet.getLastColumn())
    .getValues();

  for (var i = 0, l = rows.length; i < l; i++) {
    var dataRow = rows[i];
    var record = {};
    record["Name"] = dataRow[0];
    record["Latitude"] = dataRow[1];
    record["Longitude"] = dataRow[2];
    record["Check"] = dataRow[3];
    record["Status"] = dataRow[4];
    record["PropertyType"] = dataRow[5];
    record["City"] = dataRow[6];
    record["Area"] = dataRow[7];
    record["Neighbourhood"] = dataRow[8];

    dataArray.push(record);
  }

  jo.user = dataArray;

  var result = JSON.stringify(jo);

  return ContentService.createTextOutput(result).setMimeType(
    ContentService.MimeType.JSON
  );
}
