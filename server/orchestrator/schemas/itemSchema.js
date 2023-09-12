
const axios = require("axios");
const redis = require("../config/ioredis");
const appUrl = process.env.BASE_URL_APP || "http://localhost:4002"
const userUrl = process.env.BASE_URL_USER || "http://localhost:4001"


const typeDefs = `#graphql
  type Ingredient {
    name: String
  }

  type Category {
    name: String
  }

  input NewIngredient {
    name: String
  }

  type User {
    _id: String
    username: String
    email: String
    password: String
    role: String
    phoneNumber: String
    address: String
  }

  type Item {
    id: ID
    name: String
    description: String
    price: Int
    imgUrl: String
    authorId: Int
    UserMongoId: String
    categoryId: Int
    slug: String
    Ingredients: [Ingredient]
    Category: Category
    User: User
  }

  input NewItem {
    name: String
    description: String
    price: Int
    imgUrl: String
    authorId: Int
    UserMongoId: String
    categoryId: Int
    slug: String
    Ingredients: [NewIngredient]
  }

  input EditItem {
    id: ID
    name: String
    description: String
    price: Int
    imgUrl: String
    authorId: Int
    UserMongoId: String
    categoryId: Int
    slug: String
    Ingredients: [NewIngredient]
  }

  type Mutation {
    createItem(newItem: NewItem!): Item
    deleteItem(id: ID!): Boolean
    editItem(editedItem: EditItem!): Item
  }

  type Query {
    getItems: [Item]
    getItem(id: ID!): Item
  }
`;

const resolvers = {
  Query: {
    getItems: async () => {
      try {
        const cachedData = await redis.get('app:items');

        if (cachedData) {
          return JSON.parse(cachedData);
        } else {
          const { data: itemsData } = await axios.get(`${appUrl}/items`);

          await redis.set('app:items', JSON.stringify(itemsData));
          return itemsData;
        }
      } catch (error) {
        console.log('Error fetching items:', error);
        throw new Error('Failed to fetch items');
      }
    },
    
    getItem: async (_, { id }) => {
      try {
        const cachedItem = await redis.get(`app:item:${id}`);
        if (cachedItem) {
          return JSON.parse(cachedItem);
        }
    
        const response = await axios.get(`${appUrl}/items/${id}`);
        const item = response.data;
        console.log(item);
    
        const userResponse = await axios.get(`${userUrl}/users/${item.UserMongoId}`);
        const user = userResponse.data;
        console.log(user);
        
        item.User = user.user; 
        await redis.set(`app:item:${id}`, JSON.stringify(item));
    
        return item;
      } catch (error) {
        console.log(error);
        throw new Error("Failed to fetch item by ID");
      }
    },

    
    
  },
  Mutation: {
    createItem: async (_, { newItem }) => {
      try {
        const response = await axios.post(`${appUrl}/items`, newItem);
        const addItem = response.data;

        await redis.del("app:items");
        await redis.del(`app:item:${addItem.id}`);

          addItem.Ingredients = newItem.Ingredients;

          return addItem;
      } catch (error) {
        console.log("Error creating item:", error);
        throw new Error("Failed to create item");
      }
    },
    deleteItem: async (_, { id }) => {
      try {
        await axios.delete(`${appUrl}/items/${id}`);
        
          await redis.del("app:items"),
          await redis.del(`app:item:${id}`)

        return true;
      } catch (error) {
        console.log("Error deleting item:", error);
        throw new Error("Failed to delete item");
      }
    },
    editItem: async (_, { editedItem }) => {
      try {
        console.log("Received edited item:", editedItem);
        const response = await axios.put(`${appUrl}/items/${editedItem.id}`, editedItem);
        const editItem = response.data;
        console.log(editItem);
        editItem.Ingredients = editedItem.Ingredients;

        await redis.del("app:items");
        await redis.del(`app:item:${editedItem.id}`);


        return editedItem;
      } catch (error) {
        console.log("Error editing item:", error);
        throw new Error("Failed to edit item");
      }
    },
  },
};


  module.exports = {
    typeDefs,
    resolvers,
  };
  
