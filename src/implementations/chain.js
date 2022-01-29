const mapper = require('map-stream');

const { ChainClient } = require("../clients");
const chainClient = new ChainClient()

module.exports = {
  addChain: (call) => { 
    const [length] = call.metadata.get('length');
    const mapperStream = mapper(({ chain }, callback) => callback(null, { chain: `chain${length}-${chain}` }))

    const mappedCall = call.pipe(mapperStream)
    
    if (length > 0) {
      const nextCall = chainClient.addChain(length - 1, mappedCall)
      nextCall.pipe(call)
    } else {
      mappedCall.pipe(call)
    }
  },
}