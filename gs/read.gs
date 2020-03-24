function getSheet(ssid, sn) {
  const ss = new Spreadsheet(ssid)
  let sheet = getSheetObject__(ss)

  if (sheet.exists) {
    return sheet.object
  }
  else {
    return sheet.error
  }

  function getSheetObject__(ss) {
    let ret = {}
    if (ss.exists) {
      let s = new Sheet(ss, sn)

      if (s.exists) {
        ret['exists'] = true
        let obj = {
          sheet: sn,
          header: s.header,
          rows: s.rows,
          json: s.json,
          allRows: s.allRows
        }

        ret['object'] = obj
      }
      else {
        ret['exists'] = false
        ret['error'] = s.error
      }
    }
    else {
      ret['exists'] = false
      ret['error'] = ss.error
    }
    return ret
  }
}

