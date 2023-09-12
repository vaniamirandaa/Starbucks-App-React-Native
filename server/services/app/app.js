
if(process.env.NODE_ENV !== "production"){
  require('dotenv').config()
}
const express = require('express')
const app = express();
const cors = require('cors');
const port = process.env.PORT || 4002;
const { User, Item, Ingredient, Category } = require('./models/index')
const { sequelize, Sequelize: {Op}} = require('./models');
const { default: slugify } = require('slugify');
const bcrypt = require('bcryptjs');
const { generateToken } = require('./helpers/jwt');
const auth = require('./middlewares/auth');
const authz = require('./middlewares/authz');



app.use(cors());
app.use(express.urlencoded({extended: false}));
app.use(express.json())


app.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ error: "User not found!" });
        }
        const user = await User.findOne({
            where: { email },
        });

        if (!user) {
            return res.status(400).json({ error: "Wrong email!" });
        }
        const pass = bcrypt.compareSync(password, user.password);
        if (!pass) {
            return res.status(400).json({ error: "Wrong password!" });
        }
        const access_token = generateToken(user);
        return res.status(200).json({ access_token, user });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});


app.get('/u/items', async (req, res) => {
  try {
    const items = await Item.findAll({
      order: [
          ['id', 'ASC']
        ],
      include: [
          { model: Ingredient, attributes: ['name']  },  
          { model: User, attributes: ['username'] },
          { model: Category, attributes: ['name'] }  

      ]
    });
    res.status(200).json(items);
  } catch (error) {
    console.log('Error fetching items:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.get('/u/items/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const item = await Item.findOne({
      where: { id },
      // include: [
      //     { model: Ingredient, attributes: ['name']  },
      //     { model: User, attributes: ['username'] }
      // ]
    });

    if (!item) {
      res.status(404).json({ error: 'Item not found' });
      return;
    }

    res.status(200).json(item);
  } catch (error) {
    console.log('Error fetching item:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


// app.use(auth)

app.post('/register', async (req, res) => {
  try {
      const { username, email, password, phoneNumber, address } = req.body;

      const user = await User.create({
          username,
          email,
          password,
          phoneNumber,
          address,
          role: 'admin'
      });

      res.status(201).json({
          message: "Success made an account!",
          user
      });
  } catch (error) {
      if (error.name === 'SequelizeUniqueConstraintError' || error.name === 'SequelizeValidationError') {
          const errors = error.errors.map(err => err.message);
          res.status(400).json({ errors });
      } else {
          console.log(error);
          res.status(500).json({ error: 'Internal Server Error' });
      }
  }
});


app.get('/items', async (req, res) => {
    try {
      const items = await Item.findAll({
        order: [
            ['id', 'ASC']
          ],
        include: [
            { model: Ingredient, attributes: ['name']  },  
            // { model: User, attributes: ['username'] },
            { model: Category, attributes: ['name'] }  

        ]
      });
      res.status(200).json(items);
    } catch (error) {
      console.log('Error fetching items:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

app.get('/items/:id', async (req, res) => {
    const { id } = req.params;
  
    try {
      const item = await Item.findOne({
        where: { id },
        include: [
            { model: Ingredient, attributes: ['name']  },
        //     { model: User, attributes: ['username'] }
          { model: Category, attributes: ['name'] }  

        ]
      });
  
      if (!item) {
        res.status(404).json({ error: 'Item not found' });
        return;
      }
  
      res.status(200).json(item);
    } catch (error) {
      console.log('Error fetching item:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

app.get('/users', async (req, res) => {
    try {
        const users = await User.findAll();
        res.status(200).json(users);
    } catch (error) {
        console.log('Error fetching items:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.get('/categories', async (req, res) => {
    try {
        const categories = await Category.findAll();
        res.status(200).json(categories);
    } catch (error) {
        console.log('Error fetching items:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.post('/categories', async (req, res) => {
    try {
    const { name } = req.body;
      const category = await Category.create(
        { name })

      res.status(201).json(category);
    } catch (error) {  
      console.log(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

app.delete('/categories/:id', async (req, res) => {
  try {
      const { id } = req.params;

      const category = await Category.destroy({
          where: {
              id: id
          }
      });

      if (category === 0) {
        res.status(404).json({ error: 'Category not found' });
      }

      res.status(200).json({
          message: 'Successfully deleted category!'
      });
  } catch (err) {
      console.log(err);
      res.status(500).json({ error: 'Internal Server Error' });
  }
});

  app.put('/items/:id', async (req, res) => {
    const { id } = req.params;
    const {
        name,
        categoryId,
        price,
        description,
        imgUrl,
        Ingredients
    } = req.body;

    const transaction = await sequelize.transaction();

    try {
        const item = await Item.findOne({ where: { id } });

        if (!item) {
            res.status(404).json({ error: 'Item not found' });
            return;
        }

        await Item.update(
            {
                name,
                categoryId,
                price,
                description,
                imgUrl
            },
            { where: { id }, transaction }
        );

        await Ingredient.destroy({ where: { itemId: item.id }, transaction });

        await Ingredient.bulkCreate(
            Ingredients.map((ingredient) => ({
                name: ingredient.name,
                itemId: item.id
            })),
            { transaction }
        );

        await transaction.commit();

        const updatedItem = await Item.findOne({ where: { id } });

        res.status(200).json(updatedItem);    
      } catch (error) {
        await transaction.rollback();
        console.log('Error updating item:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});
  
app.post('/items', async (req, res) => {
    const { name, description, price, authorId, UserMongoId, imgUrl, categoryId, Ingredients } = req.body;
  
    const transaction = await sequelize.transaction();
  
    try {
      // const id = slugify(name, { lower: true });  
      const item = await Item.create(
        {
          name,
          description,
          price,
          imgUrl,
          categoryId,
          UserMongoId,
          authorId,
          // slug, 
          Ingredients
        },
        { transaction }
      );
  
      await Ingredient.bulkCreate(
        Ingredients.map((ingredient) => ({
          name: ingredient.name,
          itemId: item.id,
        })),
        { transaction }
      );
  
      await transaction.commit();
  
      res.status(201).json(item);
    } catch (error) {
      await transaction.rollback();
  
      console.log('Error creating item:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

app.delete('/items/:id', async (req, res) => {
  const transaction = await sequelize.transaction(); 
  
  try {
    const { id } = req.params;

    const item = await Item.findOne({
      where: {
        id: id
      }
    });

    if (!item) {
      throw { name: "Product not found" };
    }

    await Ingredient.destroy({
      where: {
        itemId: item.id
      },
      transaction 
    });

    await Item.destroy({
      where: {
        id: id
      },
      transaction 
    });

    await transaction.commit();
    
    res.status(200).json({
      message: 'Successfully deleted product!'
    });
  } catch (err) {
    await transaction.rollback(); 
    
    if (err.name === "Product not found") {
      res.status(404).json({ error: 'Product not found' });
    } else {
      console.log(err);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
});

app.listen(port, () =>{
    console.log(`server running on port ${port}`);
})

module.exports = app;
