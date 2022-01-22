const grpc = require('@grpc/grpc-js')

class GrpcClient {
  constructor(Client, host, port) {
    this.client = new Client(`${host}:${port}`,
    grpc.credentials.createInsecure())
  }
}

module.exports = GrpcClient