const { RESTDataSource } = require('apollo-datasource-rest');

class TrackAPI extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = process.env.REST_API_BASEURL;
  }

  getCategories() {
    return this.get('/category/all').then(data => data.payload);
  }
}

module.exports = TrackAPI;
