const resolvers = {
  Query: {
    //returns an array of all categories
    getCategories: (_, __, { dataSources }) => {
      return dataSources.categoryAPI.getCategories();
    },
  },
};

module.exports = resolvers;
