const { RESTDataSource } = require('apollo-datasource-rest');

class SubCategoryAPI extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = process.env.REST_API_BASEURL;
  }

  getSubCategories() {
    return this.get('/subCategory/all').then(data => data.payload);
  }

  getSubCategoriesByParentId(parentId) {
    return this.get(`/subcategory/${parentId}`).then(data => data.payload);
  }

  getSubCategoryById(id) {
    return this.get(`/subcategory/single/${id}`).then(data => data.payload);
  }
}

module.exports = SubCategoryAPI;
