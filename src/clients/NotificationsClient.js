const { Notifications } = require("../protos");
const GrpcClient = require("./GrpcClient");

class NotificationsClient extends GrpcClient {
  constructor(host, port) {
    super(Notifications, host, port)
  }
  notifyUsers = (event, userIds) => this.client.notifyUsers({ event, userIds })
  
  notificationStats = this.clientStreamPromisify(this.client.notificationStats)
} 
module.exports = NotificationsClient