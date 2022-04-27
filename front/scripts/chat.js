import { appendMessage } from './dom'
import { fetchAPI } from './api';

import { appendH1 } from './dom'


// Afficher le pseudo en haut

/** @param {MessageEvent} event */
function handleWSPseudo(event) {
  // '{"title": "hello}"'
  const data = JSON.parse(event.data)

  if (data?.type === 'NEW_MESSAGE') {
    appendH1(data.payload)
  }
  
}


const wsPseudo = new WebSocket('ws://127.0.0.1:5000/chat')
wsPseudo.onopen = function open() {
  console.log('ws connected')
}
wsPseudo.onmessage = handleWSPseudo





/** @param {MessageEvent} event */
function handleWSMessage(event) {
  // '{"title": "hello}"'
  const data = JSON.parse(event.data)

  if (data?.type === 'NEW_MESSAGE') {
    appendMessage(data.payload)
  }

  if (data?.type === 'ERROR2') {
    alert("Pseudo et/ou message trop long"); 
    // créer une pop up peut etre
  }
  
}


const ws = new WebSocket('ws://127.0.0.1:5000/chat')
ws.onopen = function open() {
  console.log('ws connected')
}
ws.onmessage = handleWSMessage





export function initChat() {
  /** @type {HTMLFormElement | null} */
  const messageForm = document.querySelector('#new-message')

  if (!messageForm) throw new Error('missing form')

  messageForm.addEventListener('submit', (event) => {
    event.preventDefault()

    const pseudo = messageForm.pseudo.value
    const body = messageForm.body.value
    if (!pseudo || !body) return // ici return rien parce que ya pas pseudo ou pas body(texte) //
    localStorage.setItem('pseudo', pseudo)

    ws.send(JSON.stringify({ pseudo, body }))
    messageForm.body.value = null
  })

  messageForm.pseudo.value = localStorage.getItem('pseudo')

}

async function getHistory() {
  const messages = await fetchAPI('/chat/history')
  messages.forEach(appendMessage)
}
getHistory()

// messageForm.body.value = null pour vider la case apres avoir envoyer //




 