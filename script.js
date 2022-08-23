const shortcodeApp = (function () {
  const inputEl = document.getElementById('link'),
    btnEl = document.getElementById('fetch-btn'),
    linkListEl = document.getElementById('link-list'),
    state = []

  function setEventListener() {
    btnEl.addEventListener('click', (e) => {
      getShortenLink(inputEl.value)
    })
  }

  async function getShortenLink(link) {
    console.log('fetching')
    setState()
  }

  function setState() {
    console.log('set state fnc')
    saveToLS()
    updateView()
  }

  function updateView() {
    console.log('update view fnc')
  }

  /** Get data from Local storage */
  function getFromLS() {
    console.log('checing LS')
  }

  /** Save data to Local storage */
  function saveToLS() {
    console.log('save to LS')
  }

  return {
    init: function () {
      setEventListener()
      getFromLS()
    },
  }
})()

shortcodeApp.init()
