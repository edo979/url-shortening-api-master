const shortcodeApp = (function () {
  const inputEl = document.getElementById('link'),
    btnEl = document.getElementById('fetch-btn'),
    linkListEl = document.getElementById('link-list')

  function setEventListener() {
    btnEl.addEventListener('click', (e) => {
      console.log('clik on btn')
    })
  }

  return {
    init: function () {
      setEventListener()
    },
  }
})()

shortcodeApp.init()
