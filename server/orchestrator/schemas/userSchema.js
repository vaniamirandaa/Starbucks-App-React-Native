const axios = require("axios");
const redis = require("../config/ioredis");
const userUrl = process.env.BASE_URL_USER || "http://localhost:4001"


const typeDefs = `#graphql
  type User {
    _id: String
    username: String
    email: String
    password: String
    role: String
    phoneNumber: String
    address: String
  }

  input NewUser {
    username: String
    email: String
    password: String
    role: String
    phoneNumber: String
    address: String
  }

  type Mutation {
    createUser(newUser: NewUser!): User
    deleteUser(id: ID!): Boolean
  }

  type Query {
    getUsers: [User]
    getUser(id: ID!): User
  }
`;

const resolvers = {
    Query: {
      getUsers: async () => {
          try {
            const cachedUsers = await redis.get("app:users");
            if (cachedUsers) {
              return JSON.parse(cachedUsers);
            }
      
            const response = await axios.get(`${userUrl}/users`);
            const users = response.data.users;
      
            await redis.set("app:users", JSON.stringify(users));
      
            return users;
          } catch (error) {
            console.log(error);
            throw new Error('Failed to fetch users');
          }
        },
        
        getUser: async (_, { id }) => {
          try {
            const cachedUser = await redis.get(`user:${id}`);
    
            if (cachedUser) {
              return JSON.parse(cachedUser);
            }
    
            const response = await axios.get(`${userUrl}/users/${id}`);
            const user = response.data.user;
            await redis.set(`user:${id}`, JSON.stringify(user));
    
            return user;
          } catch (error) {
            console.error(error);
            throw new Error(`Failed to fetch user with ID ${id}`);
          }
        },

    },
    Mutation: {
        createUser: async (_, { newUser }) => {
          try {
            const response = await axios.post(`${userUrl}/register`, newUser);
            const user = response.data.user;
            console.log(user);
    
            await redis.del("app:users"); 
            return user;
          } catch (error) {
            console.log(error);
            throw new Error('Failed to create user');
          }
        },
        deleteUser: async (_, { id }) => {
          try {
            await axios.delete(`${userUrl}/users/${id}`);
    
            await redis.del(`app:users`);
            await redis.del(`app:users:${id}`);            
            
            return true;
          } catch (error) {
            console.log(error);
            throw new Error(`Failed to delete user with ID ${id}`);
          }
        },
  
    },
  };
  

  module.exports = {
    typeDefs,
    resolvers,
  };
  