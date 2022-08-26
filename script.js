const shortcodeApp = (function () {
  const inputEl = document.getElementById('link'),
    btnEl = document.getElementById('fetch-btn'),
    linkListEl = document.getElementById('link-list'),
    BTN_COPIED_CLASS = 'btn-dark',
    BTN_COPY_TEXT = 'Copy',
    BTN_COPIED_TEXT = 'Copied!'

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
      const re =
        /(http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/

      if (re.test(inputEl.value)) {
        inputEl.classList.remove('error')

        getShortenLink(inputEl.value)

        inputEl.value = ''
      } else {
        inputEl.classList.add('error')
      }
    })
  }

  function getShortenLink(link) {
    const url = `https://api.shrtco.de/v2/shorten?url=${link}`

    fetch(url)
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

    linkListEl.innerHTML = ''

    state.forEach((link) => {
      const divEl = document.createElement('div')
      divEl.setAttribute('class', 'links-list_link | flex')

      divEl.innerHTML = `<p>${link.original_link}</p>
      <a href="${link.full_short_link}">${link.full_short_link}</a>`

      const buttonEl = document.createElement('button')
      buttonEl.setAttribute('class', 'btn btn-primary btn-small btn-square')
      buttonEl.textContent = BTN_COPY_TEXT
      buttonEl.onclick = (e) => {
        copyLink(e.target)
      }

      divEl.appendChild(buttonEl)

      linkListEl.append(divEl)
    })
  }

  /**
   * @param {Element} buttonEl
   */
  function copyLink(buttonEl) {
    clearButtonState()

    const linkText = buttonEl.parentElement.querySelector('a').innerText

    buttonEl.textContent = BTN_COPIED_TEXT
    buttonEl.classList.add(BTN_COPIED_CLASS)

    try {
      navigator.clipboard.writeText(linkText)
    } catch (error) {
      console.log(error)
    }
  }

  function clearButtonState() {
    const btnEls = linkListEl.querySelectorAll('button')

    btnEls.forEach((el) => {
      el.classList.remove(BTN_COPIED_CLASS)
      el.innerText = BTN_COPY_TEXT
    })
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
