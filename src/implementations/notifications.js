const { setTimeout } = require('timers/promises')

module.exports = {
  notifyUsers: async (call) => {
    const { userIds, event } = call.request
    await Promise.all(userIds.map(async id => {
      await setTimeout(Math.random() * 10000)
      call.write({ 
        id,
        status: Math.random() > 0.3 ? 'success' : 'fail',
        date: Date.now()
      })
    }))
    call.end()
  },
  notificationStats: (call, callback) => {
    const statusesCount = {};
    const timeCounts = {};
    let count = 0
    call.on('data', ({ status, timeToProcess }) => {
      if (!statusesCount[status]) statusesCount[status] = 1
      else statusesCount[status]++

      const seconds = timeToProcess / 1000
      const timeKey = `from ${Math.floor(seconds)} to ${Math.ceil(seconds)}`
      if (!timeCounts[timeKey]) timeCounts[timeKey] = 1
      else timeCounts[timeKey]++

      count++
    });
    call.on('end', () => {
      const normalize = (obj, factor) => Object.fromEntries(
        Object.entries(obj)
          .map(([ key, value]) => [key, (value / factor).toFixed(2) ])
      )
      callback(null, {
        count,
        statusDistribution: normalize(statusesCount, count),
        timeToProcessDistribution: normalize(timeCounts, count)
      })
    })
  }
}