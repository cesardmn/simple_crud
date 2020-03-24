const btnLoad = document.querySelector('.btn-load')
btnLoad.addEventListener('click', e => {
  e.preventDefault()

  let initialForm = document.querySelector('.initial-form')
  initialForm.classList.add('hidden')
  let dsply = document.querySelector('.display')
  dsply.innerHTML = ''

  let params = {
    action: 'load',
    ssid: document.querySelector('.ssid').value
  }


  let url = 'https://script.google.com/macros/s/AKfycbzeEhgYuV8JlZ8vL9XTwFNwvUGRk_q9FGVbL8hF65FsrZwfz3o/exec'

  doPost(url, params)
})

function renderLoad(data) {
  setSheets(data)
  setMenu(data)
}

function setMenu(sheets) {
  let ul = document.querySelector('.pure-menu-list')
  ul.innerHTML = `
  <li class="pure-menu-item">
    <a href="#home" class="pure-menu-link">
      Home
    </a>
  </li>
  `

  sheets.forEach(key => {
    let sheetName = Object.keys(key)[0]
    setNav(sheetName, ul)
  })
  setLink(ul)
}

function setNav(sheetName, ul) {
  let sheetNameClass = sheetName.replace(/\s/g, '')

  ul.innerHTML += `
    <li class="pure-menu-item">
      <a href="#${sheetNameClass}" class="pure-menu-link">
        ${sheetName}
      </a>
    </li>
  `
}

function setLink(ul){
  ul.addEventListener('click', e => {
    let sheetName = e.target.innerText
    showTable(sheetName)
  })
}

function showTable(sheetName){
  let sheetNameClass = sheetName.replace(/\s/g, '')
  let tables = document.querySelectorAll('.display table')
  tables.forEach( e => e.classList.add('hidden'))

  let table = document.querySelector(`#table-${sheetNameClass}`)
  table.classList.remove('hidden')

}

function setSheets(sheets) {
  let display = document.querySelector('.display')
  display.innerHTML = ''

  sheets.forEach(i => {
    let sheetName = (Object.keys(i)[0]).replace(/\s/g, '')
    let sheet = Object.values(i)[0]

    setSheet(sheet, sheetName)
  })
}

function setSheet(sheet, sheetName) {
  let display = document.querySelector('.display')
  let table = `
    <div class="table-responsive table-display">
      <table class="pure-table pure-table-striped hidden" id=table-${sheetName}>
        <thead id=thead-${sheetName}></thead>
        <tbody id=tbody-${sheetName}></tbody>
      </table>
    </div>
  `
  display.innerHTML += table

  setHeader(sheet, sheetName)
  setRows(sheet, sheetName)
}

function setHeader(sheet, sheetName) {
  let header = sheet.header
  if (header.length > 0) {
    let thead = document.querySelector(`#thead-${sheetName}`)
    for (i in header) {
      let th = document.createElement('th')
      th.innerText = header[i]
      thead.appendChild(th)
    }
  }
}

function setRows(sheet, sheetName) {
  let rows = sheet.rows
  if (rows.length > 0) {
    for (i in rows) {
      let row = rows[i]
      setRow(row, sheetName)
    }
  }
}

function setRow(row, sheetName) {
  let tbody = document.querySelector(`#tbody-${sheetName}`)
  let tr = document.createElement('tr')

  for (i in row) {
    tr.innerHTML += `
      <td>${row[i]}</td>
    `
  }
  tbody.appendChild(tr)
}