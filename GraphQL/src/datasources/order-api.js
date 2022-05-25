const { RESTDataSource } = require('apollo-datasource-rest');

class OrderAPI extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = process.env.REST_API_BASEURL;
  }

  getOrdersByUserId(userId) {
    return this.get(`/orders/${userId}`).then(data => data.payload);
  }
}

module.exports = OrderAPI;
