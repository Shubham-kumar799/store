const { RESTDataSource } = require('apollo-datasource-rest');

class CartAPI extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = process.env.REST_API_BASEURL;
  }

  getCart(userId) {
    return this.get(`/cart/${userId}`).then(data => data.payload);
  }
}

module.exports = CartAPI;
