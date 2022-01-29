const grpc = require('@grpc/grpc-js')

let defaultHost 
let defaultPort
class GrpcClient {
  constructor(Client, host = defaultHost, port = defaultPort) {
    this.client = new Client(`${host}:${port}`,
    grpc.credentials.createInsecure())
  }
  unaryPromisify(func) {
    return (data) => {
      return new Promise((resolve, reject) => {
        func.bind(this.client)(data, (error, response) => {
          if (error) reject(error)
          else resolve(response)
        })
      })
    }
  }
  clientStreamPromisify(func) {
    return (inputStream) => {
      return new Promise((resolve, reject) => {
        const call = func.bind(this.client)((error, response) => {
          if (error) reject(error)
          else resolve(response)
        })
        inputStream.pipe(call)
      })
    }
  }
  static setDefaultConnection(host, port) {
    defaultHost = host
    defaultPort = port
  }
}

module.exports = GrpcClient