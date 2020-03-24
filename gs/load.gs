function loaderSheets(ssid) {
  const ss = new Spreadsheet(ssid)

  if (ss.exists) {
    return getSheets__(ss)
  }
  else {
    return ss.error
  }

  return setResult(result)


  function getSheets__(ss) {
    let listName = getListName__(ss)
    return getObjects__(ss, listName)
  }

  function getListName__(spreadsheet) {
    let ss = spreadsheet.object
    let sheets = ss.getSheets()

    return sheets.map(function (sheet) {
      return sheet.getSheetName()
    })
  }

  function getObjects__(ss, listName) {
    let sheets = []
    for (i in listName) {
      let sn = listName[i]
      let sheet = new Sheet(ss, sn)
      let obj = {}
      obj[sn] = sheet
      sheets.push(obj)
    }
    return sheets
  }
}
