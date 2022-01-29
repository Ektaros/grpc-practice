const { Ping } = require("../protos");
const GrpcClient = require("./GrpcClient");

class PingClient extends GrpcClient {
  constructor(host, port) {
    super(Ping, host, port)
    this.unary = {
      ping: this.unaryPromisify(this.client.ping),
      pingWithData: this.unaryPromisify(this.client.pingWithData)
    }
  }
  async ping() {
    return this.unary.ping({})
  }
  async pingWithData() {
    const getSub = (message) => ({ message, number: Math.random(), names: [message, message, message] })
    return this.unary.pingWithData({
      type: "LOCAL",
      testMap: {
        'asd': getSub('hi'),
        'fds':  getSub('qwe')
      },
      subMessage: getSub('upper'),
      details: { a: 321 }
    })
  }
} 
module.exports = PingClient