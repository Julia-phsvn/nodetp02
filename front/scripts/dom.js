import { formatDistanceToNowStrict } from 'date-fns'

const main = document.querySelector('main')
const hPseudo = document.querySelector('h1')

//  METTRE LE NOM DE LAUTRE EN H1

/** @param {Record<string, string>} data */
export function appendH1(data) {

  const hdrEl= document.createElement('h1')
  hdrEl.classList.add('pseudochat')

  const currentPseudo = document.querySelector('#pseudo')?.value
  currentPseudo.p
  hdrEl.classList.add(data.pseudo === currentPseudo ? 'moih' : 'autreh')

  if(hdrEl.classList.contains("autreh")){

    const pseudoH = document.createElement('h1')
    pseudoH.textContent = data.pseudo 
    hdrEl.append(pseudoH)

    hPseudo?.replaceWith(hdrEl)
    }
}

/** @param {Record<string, string>} data */
export function appendMessage(data) {
  const msgEl = document.createElement('div')
  msgEl.classList.add('message')

  // ca créer <div class = "message"></div>

  // message droite gauche à faire

  const currentPseudo = document.querySelector('#pseudo')?.value
  currentPseudo.p
  msgEl.classList.add(data.pseudo === currentPseudo ? 'moi' : 'autre')

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
  
  const dateP = document.createElement('span')
  dateP.textContent = formatDistanceToNowStrict(new Date(data.date), {
    addSuffix: true,
  })

  msgEl.append(dateP)
  dateP.classList.add('date')

  main?.appendChild(msgEl)
  main?.scrollTo(0, main.scrollHeight)
}


