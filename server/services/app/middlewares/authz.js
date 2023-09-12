const { Item } = require('../models')

module.exports = async (req, res, next) => {
    try {
      const data = await Item.findOne({
        where: {
          slug: req.params.slug
        }
      });
      if (!data) {
        throw { name: "Item not found" };
      }
  
      if (req.user && req.user.id === data.authorId) {
        next();
      } else {
        throw { name: "Forbidden" };
      }
    } catch (err) {
      if (err.name === "ItemNotFound") {
        res.status(404).json({ error: 'Item not found' });
      } else if (err.name === "Forbidden") {
        res.status(403).json({ error: 'Forbidden' });
      } else {
        console.log(err);
        res.status(500).json({ error: 'Internal Server Error' });
      }
    }
  };
  