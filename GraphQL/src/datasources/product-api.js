const { RESTDataSource } = require('apollo-datasource-rest');

class ProductAPI extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = process.env.REST_API_BASEURL;
  }

  getProducts() {
    return this.get('/product').then(data => data.payload);
  }

  getProductBySlug(slug) {
    return this.get(`/product/${slug}`).then(data => data.payload);
  }
}

module.exports = ProductAPI;
