function doPost(url, params = {}) {
  showLoader()

  fetch(url, {
    method: 'POST',
    mode: 'cors',
    body: JSON.stringify(params)
  })
    .then(response => response.json())
    .then(data => {
      renderData(data, params)
      hiddenLoader()
    })
    .catch(error => {
      renderError(error)
      hiddenLoader()
    })
}

function renderData(data, params) {
  if (data.error) {
    renderError(data.error)
  }
  else {
    renderResponse(data, params)
  }
}

function renderResponse(data, params) {
  if (params.action == 'load') {
    renderLoad(data)
  }
}

function renderError(data) {
  let err = ''
  let display = document.querySelector('.display')
  if (data.error) {
    err = data.error.toString()
  }
  else {
    err = JSON.stringify(data)
  }
  display.innerHTML = `
  <div class="content">
    <p>${err}</p>
  </div>
  `
}   
