function Sheet(sheet_obj, sn) {
  let sheet = {}
  let ss = sheet_obj.object

  try {
    sheet['id'] = ss.getSheetByName(sn).getSheetId()
    sheet['s'] = ss.getSheetByName(sn)
    sheet['exists'] = true
    sheet['header'] = getHeader__(sheet['s'])
    sheet['rows'] = getRows__(sheet['s'])
    sheet['json'] = getJSON__(sheet['header'], sheet['rows'])
    sheet['allRows'] = getAllRows__(sheet['s'])

  }
  catch (err) {
    sheet['exists'] = false
    sheet['error'] = { error: 'Sheet "' + sn + '" not found or has no data!' }
    sheet['err'] = err
  }

  function getHeader__(s) {
    try {
      let uRow = s.getLastRow()
      let uCol = s.getLastColumn()
      return s.getRange(1, 1, uRow, uCol).getValues()[0]
    }
    catch (err) {
      let ret = {}
      return ret
    }
  }

  function getRows__(s) {
    try {
      let uRow = s.getLastRow()
      let uCol = s.getLastColumn()
      let vals = s.getRange(1, 1, uRow, uCol).getValues()

      if (uRow == 1) {
        let ret = []
        return ret
      }

      if (uRow >= 2) {
        return vals.slice(1)
      }
    }
    catch (err) {
      let ret = {}
      return ret
    }
  }

  function getAllRows__(s) {
    try {
      let uRow = s.getLastRow()
      let uCol = s.getLastColumn()
      let vals = s.getRange(1, 1, uRow, uCol).getValues()

      if (uRow < 1) {
        let ret = []
        return ret
      }

      if (uRow >= 1) {
        return vals
      }
    }
    catch (err) {
      let ret = {}
      return ret
    }
  }

  function getJSON__(header, rows) {
    let json = []

    if (header.length > 0 && rows.length > 0) {

      for (i in rows) {
        let row = rows[i]
        let obj = {}
        for (c in row) {
          obj[header[c]] = row[c]
        }
        json.push(obj)
      }
    }

    return json
  }

  return sheet
}