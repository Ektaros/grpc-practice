module.exports = {
  ping: (call, callback) => {
    console.log(call.request)
    callback(null, { ping: 'pong' })
  },
  pingWithData: (call, callback) => {
    console.log(call)
    const { type } = call.request
    const json = JSON.stringify(call.request)
    callback(null, { 
      message: 'Here it is',
      type,
      json
    })
  }
}