const { PassThrough } = require('stream')
const mapper = require('map-stream');
const Server = require('./server')
const protos = require('./protos')
const { PingClient, NotificationsClient, ChainClient, GrpcClient } = require('./clients')

const host = 'localhost'
const port = 50123
GrpcClient.setDefaultConnection(host, port)

const implementations = require('./implementations')

const server = new Server(host, port, protos, implementations)

server.ready.then(async () => {
  //simple unary
  const pingClient = new PingClient()
  console.log(await pingClient.ping())

  // client or server streaming
  const client = new NotificationsClient()

  const startingTime = Date.now()
  const notificationResponseStream = client.notifyUsers('qwe', [...Array(20)].map((_, i) => i))

  const notificationResponseMapper = mapper(({ id, date, status }, callback) => {
    const notificationResult = { id, status, timeToProcess: date - startingTime }
    console.log(notificationResult)
    callback(null, notificationResult)
  })

  const notificationResultStream = notificationResponseStream.pipe(notificationResponseMapper)
  const stats = await client.notificationStats(notificationResultStream)
  console.log(stats)

  // duplex chaining
  const chainClient = new ChainClient() 
  const stream = new PassThrough({ objectMode: true })

  const resultChainsStream = chainClient.addChain(5, stream)

  resultChainsStream.on('data', (data) => console.log('final chain', data))
  resultChainsStream.on('end', () => console.log('All chains done'))

  stream.push({ chain: 'a' })
  stream.push({ chain: 'b' })
  stream.push({ chain: 'c' })
  stream.end()
  
})