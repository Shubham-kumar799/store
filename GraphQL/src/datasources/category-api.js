const { RESTDataSource } = require('apollo-datasource-rest');

class CategoryAPI extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = process.env.REST_API_BASEURL;
  }

  getCategories() {
    return this.get('/category/all').then(data => data.payload);
  }
  getCategoryById(id) {
    return this.get(`/category/single/${id}`).then(data => data.payload);
  }
}

module.exports = CategoryAPI;
