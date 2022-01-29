const { Metadata } = require('@grpc/grpc-js')
const { Chain } = require("../protos");
const GrpcClient = require("./GrpcClient");

class ChainClient extends GrpcClient {
  constructor(host, port) {
    super(Chain, host, port)
  }
  addChain(chainLength, inputStream) {
    const meta = new Metadata();
    meta.add('length', chainLength);

    const call = this.client.addChain(meta)
    inputStream.pipe(call)
    return call
  }
} 
module.exports = ChainClient