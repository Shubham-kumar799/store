const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type Query {
    "Query to get all categories"
    getCategories: [Category!]
    "Query sub categories by their parent category id"
    getSubCategoriesByParentId(parentId: ID!): [SubCategory!]
    "Query to get all products"
    getProducts: [Product!]
    "Query to get single product by its slug"
    getProductBySlug(slug: String!): Product!
    "Query to get user cart by user id"
    getCartByUserId(userId: ID!): Cart
    "Query to get all coupons"
    getCoupons: [Coupon!]
    "Query to get order by userId"
    getOrdersByUserId(userId: String!): [Order!]
  }

  enum OrderStatus {
    Not_Processed
    Fulfilled
    Processing
    Out_For_Delivery
    Cancelled
  }

  type CartProduct {
    product: Product!
    count: Int
  }

  type PaymentIntent {
    id: ID!
    object: String!
    amount: Int!
    capture_method: String!
    client_secret: String!
    currency: String!
    livemode: Boolean
    payment_method: String!
    status: String!
    payment_method_types: [String!]
  }

  type Order {
    _id: ID!
    orderedBy: ID!
    createdAt: String
    updatedAt: String
    products: [CartProduct!]
    orderStatus: OrderStatus!
    paymentIntent: PaymentIntent
  }

  type Coupon {
    _id: ID!
    name: String
    discount: Int
    expiryDate: String
    createdAt: String
    updatedAt: String
  }

  type Cart {
    _id: ID!
    products: [CartProduct!]
    cartTotal: Int
    owner: ID!
    createdAt: String
    updatedAt: String
  }

  type Category {
    "Mongo ID of the category"
    _id: ID!
    "Name of the category"
    name: String
    "slug of the category"
    slug: String
    createdAt: String
    updatedAt: String
  }
  type SubCategory {
    "Mongo ID of the category"
    _id: ID!
    "Name of the category"
    name: String
    "slug of the category"
    slug: String
    "parent id of sub category"
    parent: ID!
    createdAt: String
    updatedAt: String
  }
  type Image {
    public_id: String
    url: String
  }

  type ProductRating {
    star: Float!
    postedBy: ID!
  }

  type Product {
    "Mongo ID of the product"
    _id: ID!
    "Name of the product"
    name: String
    "slug of the product"
    slug: String
    "description of the product"
    description: String
    "price of the product"
    price: Int
    "category of the product"
    category: Category
    "subCategories of the product"
    subCategories: [SubCategory!]
    "Quantity of the products"
    quantity: Int
    "Number of quantities sold"
    sold: Int
    "Images of the product"
    images: [Image!]
    "Is shipping available"
    shipping: Boolean
    "color available"
    color: String
    "brand of the product"
    brand: String
    "Rating of the products"
    ratings: [ProductRating]
    createdAt: String
    updatedAt: String
  }
`;

module.exports = typeDefs;
