const { ObjectId } = require('mongodb');
const { connect } = require('../config/mongoConnection');
const bcrypt = require('bcryptjs');


module.exports = class Controller {

  static async findAll(req, res) {
    try {

      const db = await connect()

      const users = await db.collection('users').find().toArray();
      console.log(users);

      res.json({users})
    } catch (error) {
      console.log(error);
      res.status(500).json({ msg: 'Internal Server Error'})
    }
  }

  static async findById(req, res) {
    try {

      const { id } = req.params
      const db = await connect()

      const user = await db.collection('users').findOne({
        _id: new ObjectId(id),
      })
      console.log(user);

      res.json({user})
    } catch (error) {
      console.log(error);
      res.status(500).json({ msg: 'Internal Server Error'})
    }
  }

  static async register(req, res) {
    try {
      const { username, email, password, phoneNumber, address } = req.body
      const db = await connect()

      const hash = await bcrypt.hash(password, 10)

      const newUser = {
        username,
        email,
        password: hash,
        role: 'admin',
        phoneNumber,
        address,
      };

      const user = await db.collection('users').insertOne(newUser)
      const registeredUser = {
        username: newUser.username,
        email: newUser.email,
        password: newUser.password,
        role: newUser.role,
        phoneNumber: newUser.phoneNumber,
        address: newUser.address,
      };
  
      res.json({ message: 'Register success', user: registeredUser });    
    } catch (error) {
      console.log(error);
      res.status(500).json({ msg: 'Internal Server Error'})
    }
  }

  static async delete(req, res){
    try {
      const { id } = req.params
      const db = await connect()

      const user = db.collection('users').deleteOne({
        _id: new ObjectId(id) 
      })
      res.json({ message: "User deleted", user });

    } catch (error) {
      console.log(error);
      res.status(500).json({ msg: 'Internal Server Error'})
    }
  }

}

