const Server = require('./server')
const { services } = require('./protos')
const implementations = require('./implementations')
const { PingClient } = require('./clients')

const host = 'localhost'
const port = 50123

const server = new Server(host, port, services, implementations)

server.ready.then(async () => {
  const client = new PingClient(host, port)
  console.log(await client.ping())
})