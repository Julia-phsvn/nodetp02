const main = document.querySelector('main')

/** @param {Record<string, string>} data */
export function appendMessage(data) {
  const msgEl = document.createElement('div')
  msgEl.classList.add('message')

  // ca créer <div class = "message"></div>

  const pseudoSpan = document.createElement('span')
  pseudoSpan.textContent = data.pseudo
  msgEl.append(pseudoSpan)

  // <span>Hugo</span>

  /* 
  <div class = "message">
    <span>Hugo</span>
  </div>
  */

  const bodyP = document.createElement('p')
  bodyP.textContent = data.body

  msgEl.append(bodyP)

  // <p>Hello world</p>

  /* 
  <div class = "message">
    <span>Hugo</span>
    <p>Hello world</p>
  </div>
  */

  const dateP = document.createElement('p')
  dateP.textContent = data.date

  msgEl.append(dateP)

  

  main?.appendChild(msgEl)
  main?.scrollTo(0, main.scrollHeight)
}
