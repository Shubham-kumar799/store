const { RESTDataSource } = require('apollo-datasource-rest');

class CouponAPI extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = process.env.REST_API_BASEURL;
  }

  getCoupons() {
    return this.get('/coupons').then(data => data.payload);
  }
}

module.exports = CouponAPI;
