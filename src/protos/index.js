const grpc = require('@grpc/grpc-js')
const { loadSync } = require('@grpc/proto-loader')

const options = {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true
}
const load = (path) => grpc.loadPackageDefinition(loadSync(path, options))

const Ping = load('src/protos/ping.proto').PingService
const Chain = load('src/protos/chain.proto').ChainService
const Notifications = load('src/protos/notifications.proto').NotificationsService

module.exports = {
  Ping,
  Chain,
  Notifications
}