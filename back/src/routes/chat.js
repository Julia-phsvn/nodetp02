import { randomUUID } from 'crypto'

/**
 * @typedef {Object} Message
 * @property {string} id - an uuid
 * @property {string} pseudo - sender pseudo
 * @property {string} body - body of the message
 */

/** @type { Message[] } */
const messages = []

/**
 * @param {string} pseudo
 * @param {string} body
 */
function handleNewMessage(pseudo, body) {
  const message = {
    id: randomUUID(),
    pseudo,
    body,
    date: new Date()
  }
  messages.push(message)
  return message
}

// id randomUUID => comment changer pour id unique , chercher UUID //

/**
 * @type { import('fastify').FastifyPluginCallback }
 */
export async function chatRoutes(app) {
  /**
   * @param {{ type: string, payload: object }} data
   */
  function broadcast(data) {
    console.log(
      app.websocketServer.clients.forEach((client) => {
        client.send(JSON.stringify(data))
      }),
    )
  }

  // client.send(JSON.stringify(data) renvoie à tout le monde meme celui qui envoie, voir pour les lus délivrer etc... //


  // trc websocket en bas : root : /chat/ //

  app.get('/', { websocket: true }, (connection, req) => {
    connection.socket.on('message', (message) => {
      const data = JSON.parse(message.toString('utf-8'))
      broadcast({
        type: 'NEW_MESSAGE',
        payload: handleNewMessage(data.pseudo, data.body),
      })
    })
  })

  // ligne un peu au dessis pour les reaction le type (NEW_MESSAGE) ce sera peut etre "reaction" //

  app.get('/history', (request, reply) => {
    reply.send(messages.slice(-30))
  })
}

// on message ; broadcast pour le renvoyer à tout le monde //
