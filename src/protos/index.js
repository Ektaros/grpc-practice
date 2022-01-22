const grpc = require('@grpc/grpc-js')
const { loadSync } = require('@grpc/proto-loader')

const Ping = grpc.loadPackageDefinition(loadSync('src/protos/ping.proto')).PingService

module.exports = {
  services: {
    ping: Ping.service
  },
  Ping
}