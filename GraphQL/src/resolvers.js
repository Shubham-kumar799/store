const resolvers = {
  Query: {
    //returns an array of all categories
    getCategories: (_, __, { dataSources }) => {
      return dataSources.categoryAPI.getCategories();
    },
    //returns the category of given id
    // getCategoryById: (_, { id }, { dataSources }) => {
    //   return dataSources.categoryAPI.getCategoryById(id);
    // },
    // getSubCategories: (_, __, { dataSources }) => {
    //   return dataSources.subCategoryAPI.getSubCategories();
    // },
    getSubCategoriesByParentId: (_, { parentId }, { dataSources }) => {
      return dataSources.subCategoryAPI.getSubCategoriesByParentId(parentId);
    },
    getProducts: (_, __, { dataSources }) => {
      return dataSources.productAPI.getProducts();
    },
  },
  Product: {
    category: ({ category }, _, { dataSources }) => {
      return dataSources.categoryAPI.getCategoryById(category);
    },
    subCategories: ({ subCategories }, _, { dataSources }) => {
      let finalsubCategories = [];
      //INSTEAD OF MAKING A NUMBER OF REQUESTS , MAKE AN ENDPOINT THAT RETURNS MULTIPLE SUBCATEGORIES WHEN GIVEN AN ARRAY OF SUBCATEGORIES'S ID
      subCategories.forEach(c => {
        finalsubCategories.push(
          dataSources.subCategoryAPI.getSubCategoryById(c)
        );
      });
      return finalsubCategories;
    },
  },
};

module.exports = resolvers;
