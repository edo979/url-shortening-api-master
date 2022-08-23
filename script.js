const shortcodeApp = (function () {
  const inputEl = document.getElementById('link'),
    btnEl = document.getElementById('fetch-btn'),
    linkListEl = document.getElementById('link-list')

  let state = []

  function init() {
    const data = getFromLS()

    if (data) {
      state = JSON.parse(data)
      updateView()
    }

    setEventListener()
  }

  function setEventListener() {
    btnEl.addEventListener('click', (e) => {
      getShortenLink(inputEl.value)
    })
  }

  function getShortenLink(link) {
    fetch('./data.json')
      .then((response) => {
        if (response.ok) return response.json()
        throw new Error('Network Error!')
      })
      .then((data) => setState(data.result))
      .catch((e) => console.log(e))
  }

  function setState(data) {
    const { original_link, full_short_link } = data

    state = [{ original_link, full_short_link }, ...state]

    if (state.length > 3) {
      state = state.slice(0, 3)
    }

    saveToLS()
    updateView()
  }

  function updateView() {
    console.log('update view fnc')
  }

  /** Get data from Local storage */
  function getFromLS() {
    return localStorage.getItem('shortcodeApp')
  }

  /** Save data to Local storage */
  function saveToLS() {
    localStorage.setItem('shortcodeApp', JSON.stringify(state))
  }

  return {
    init,
  }
})()

shortcodeApp.init()
