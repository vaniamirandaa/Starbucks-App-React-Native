const { default: axios } = require('axios');
const redis = require('../config/ioredis');
const appUrl = "http://localhost:4002"
const userUrl = "http://localhost:4001"

class Controller {
  static async getItems(req, res) {
    try {
      const itemCache = await redis.get("app:items");
      if (itemCache) {
        const data = JSON.parse(itemCache);
        res.status(200).json(data);
      } else {
        const { data } = await axios.get(`${appUrl}/items`);
        const response = await axios.get(`${userUrl}/users`);

        const items = data.map(item => {
          const user = response.data.users.find(user => user._id === item.UserMongoId);
          return { ...item, users: [user] };
        });

        await redis.set("app:items", JSON.stringify(data));
        // await redis.del("app:items");
        res.status(200).json(items);
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({ msg: "Internal server error" });
    }
  }

  static async getItemById(req, res) {
    try {
      const { id } = req.params;
      const itemCache = await redis.get(`app:items:${id}`);
  
      if (itemCache) {
        const itemData = JSON.parse(itemCache);
  
         const { data: userData } = await axios.get(`${userUrl}/users/${itemData.UserMongoId}`);
  
         const getUserData = { ...itemData, userData };
  
        res.status(200).json(getUserData);
      } else {
        const { data: itemData } = await axios.get(`${appUrl}/items/${id}`);
        const { data: userData } = await axios.get(`${userUrl}/users/${itemData.UserMongoId}`);
  
        const item = { ...itemData, userData };
  
        await redis.set(`app:items:${id}`, JSON.stringify(item));
        await redis.expire(`app:items:${id}`, 60);
  
        res.status(200).json(item);
      }
    } catch (error) {
      console.log('Error fetching item:', error);
      res.status(500).json({ msg: 'Internal server error' });
    }
  }
  
  static async deleteItem(req, res) {
    try {
      const { id } = req.params;
      await axios.delete(`${appUrl}/items/${id}`);
      await redis.del(`app:items`);
      await redis.del(`app:items:${id}`);

      res.status(200).json({ msg: `Item with ID ${id} has been deleted` });
    } catch (error) {
      res.status(500).json({ msg: 'Internal server error' });
    }
  }

  static async updateItem(req, res) {
    try {
      const { id } = req.params;
      const data = req.body;

      await redis.set(`app:items:${id}`, JSON.stringify(data));
      await redis.del("app:items");

      await axios.put(`http://localhost:4002/items/${id}`, data);

      res.status(200).json({ msg: "Item updated successfully" });
    } catch (error) {
      res.status(500).json({ msg: "Internal server error" });
    }
  }

  static async createItem(req, res) {
    try {
      const newItem = req.body;
  
      const { data: userData } = await axios.get(`${userUrl}/users/${newItem.UserMongoId}`);
        const response = await axios.post(`${appUrl}/items`, newItem);
      const newItemId = response.data.id;
      const getUserData = { ...response.data, userData };
  
      await redis.set(`app:items:${newItemId}`, JSON.stringify(getUserData), 'EX', 3600);
  
      await redis.del(`app:items`);
      res.status(201).json(getUserData);
    } catch (error) {
      console.error('Error creating item:', error);
      res.status(500).json({ msg: 'Internal server error' });
    }
  }
  
  static async getUsers(req, res) {
    try {
      const usersCache = await redis.get("app:users");
      
      if (usersCache) {
        const data = JSON.parse(usersCache);
        res.status(200).json(data);
      } else {
        const { data } = await axios.get(`${userUrl}/users`);
        await redis.set("app:users", JSON.stringify(data));
        res.status(200).json(data);
      }
    } catch (error) {
      res.status(500).json({ msg: "Internal server error" });
    }
  }

  static async getUserById(req, res) {
    try {
      const userId = req.params.id;
      const userCache = await redis.get(`app:users:${userId}`);

      if (userCache) {
        const userData = JSON.parse(userCache);
        res.status(200).json(userData);
      } else {
        const { data } = await axios.get(`${userUrl}/users/${userId}`);
        await redis.set(`app:users:${userId}`, JSON.stringify(data));

        res.status(200).json(data);
      }
    } catch (error) {
      res.status(500).json({ msg: "Internal server error" });
    }
  }

  static async createUser(req, res) {
    try {
      const { body } = req;
      const response = await axios.post(`${userUrl}/register`, body);

      await redis.del(`app:users`);
      res.status(201).json(response.data);
    } catch (error) {
      console.log(error);
      res.status(500).json({ msg: "Internal server error" });
    }
  }

  static async deleteUser(req, res) {
    try {
      const { id } = req.params;
      await axios.delete(`${userUrl}/users/${id}`);
      
      await redis.del(`app:users`);
      await redis.del(`app:users:${id}`);

      res.status(204).json({ message: `Success delete user` });
    } catch (error) {
      console.log(error);
      res.status(500).json({ msg: 'Internal server error' });
    }
  }

}

module.exports = Controller;
