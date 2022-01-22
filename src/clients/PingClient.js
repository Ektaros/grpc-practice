const { promisify } = require('util');
const { Ping } = require("../protos");
const GrpcClient = require("./GrpcClient");

class PingClient extends GrpcClient {
  constructor(host, port) {
    super(Ping, host, port)
  }
  async ping() {
    return new Promise((resolve, reject) => {
      this.client.ping({}, (error, response) => {
        if (error) reject(error)
        else resolve(response)
      })
    })
  }
} 
module.exports = PingClient