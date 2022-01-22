module.exports = {
  ping: (call, callback) => {
    console.log(call.request)
    callback(null, { ping: 'pong' })
  }
}