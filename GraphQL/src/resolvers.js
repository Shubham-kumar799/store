const resolvers = {
  Query: {
    //returns an array of all categories
    getCategories: (_, __, { dataSources }) => {
      return dataSources.categoryAPI.getCategories();
    },
    getSubCategoriesByParentId: (_, { parentId }, { dataSources }) => {
      return dataSources.subCategoryAPI.getSubCategoriesByParentId(parentId);
    },
    getProducts: (_, __, { dataSources }) => {
      return dataSources.productAPI.getProducts();
    },
    getProductBySlug: (_, { slug }, { dataSources }) => {
      return dataSources.productAPI.getProductBySlug(slug);
    },
    getCartByUserId: (_, { userId }, { dataSources }) => {
      return dataSources.cartAPI.getCart(userId);
    },
    getCoupons: (_, __, { dataSources }) => {
      return dataSources.couponAPI.getCoupons();
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
