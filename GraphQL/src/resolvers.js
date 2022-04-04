const resolvers = {
  Query: {
    //returns an array of all categories
    getCategories: (_, __, { dataSources }) => {
      return dataSources.categoryAPI.getCategories();
    },
    getSubCategories: (_, __, { dataSources }) => {
      return dataSources.subCategoryAPI.getSubCategories();
    },
    getSubCategoriesByParentId: (_, { parentId }, { dataSources }) => {
      return dataSources.subCategoryAPI.getSubCategoriesByParentId(parentId);
    },
  },
};

module.exports = resolvers;
