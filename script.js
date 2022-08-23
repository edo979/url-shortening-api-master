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
    if (state.length === 0) return

    let linkEls = ''

    state.forEach((link) => {
      linkEls += getLinkTemplate(link.original_link, link.full_short_link)
    })

    linkListEl.innerHTML = linkEls
  }

  function getLinkTemplate(original_link, shorten_link) {
    return `
    <div class="links-list_link | flex">
      <p>${original_link}</p>
      <a href="${shorten_link}">${shorten_link}</a>
      <button class="btn btn-square">Copy</button>
    </div>
    `
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
