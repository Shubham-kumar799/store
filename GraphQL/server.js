const { ApolloServer } = require('apollo-server');
require('dotenv').config();
const typeDefs = require('./src/schema');
const resolvers = require('./src/resolvers');

//API's
const CategoryAPI = require('./src/datasources/category-api');
const SubCategoryAPI = require('./src/datasources/subCategory-api');
const ProductAPI = require('./src/datasources/product-api');
const CartAPI = require('./src/datasources/cart-api');
const CouponAPI = require('./src/datasources/coupon-api');
const OrderAPI = require('./src/datasources/order-api');

const server = new ApolloServer({
  typeDefs,
  resolvers,
  dataSources: () => {
    return {
      categoryAPI: new CategoryAPI(),
      subCategoryAPI: new SubCategoryAPI(),
      productAPI: new ProductAPI(),
      cartAPI: new CartAPI(),
      couponAPI: new CouponAPI(),
      orderAPI: new OrderAPI(),
    };
  },
});

server.listen().then(() => {
  console.log(`
    🚀  Server is running!
    🔉  Listening on port 4000
    📭  Query at https://studio.apollographql.com/dev
  `);
});
