const grpc = require('@grpc/grpc-js')


class GrpcServer {
  constructor(host, port, services, implementations) {
    this.server = new grpc.Server()
    this.ready = new Promise(resolve => {
      Object.keys(services).forEach(name => this.server.addService(services[name], implementations[name]))

      this.server.bindAsync(`${host}:${port}`, grpc.ServerCredentials.createInsecure(), (error, port) => {
        console.log('error', error)
        console.log('port', port)
        console.log(`Server running at ${host}:${port}`)
        this.server.start()
        resolve()
      })
    })
  }
}

module.exports = GrpcServer