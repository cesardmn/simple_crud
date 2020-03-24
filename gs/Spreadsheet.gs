function Spreadsheet(ssid) {
  let spreadsheet = {}

  try {
    spreadsheet['object'] = SpreadsheetApp.openByUrl(
      'https://docs.google.com/spreadsheets/d/' + ssid + '/edit'
    )
    spreadsheet['exists'] = true
  }
  catch (err) {
    spreadsheet['error'] = { error: 'Spreadsheet ID ' + ssid + ' not found or unauthorized!' }
    spreadsheet['exists'] = false
    spreadsheet['object'] = false
  }

  return spreadsheet
}
