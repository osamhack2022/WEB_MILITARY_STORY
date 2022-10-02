const express = require('express');
const { Op } = require('sequelize');

const { Post, Hashtag, Image, Comment, User } = require('../models');

const router = express.Router();

router.get('/:hashtag', async (req, res, next) => { 
  try {
    const where = {};
    if (parseInt(req.query.lastId, 10)) {
      where.id = { [Op.lt]: parseInt(req.query.lastId, 10)}
    }
    const posts = await Post.findAll({
      where,
      limit: 10,
      order: [['createdAt', 'DESC']],
      include: [{
        model: Hashtag,
        where: { name: decodeURIComponent(req.params.hashtag) },
      }, {
        model: User,
        attributes: ['id', 'nickname'],
      }, {
        model: Image,
      }, {
        model: Comment,
        include: [{
          model: User,
          attributes: ['id', 'nickname'],
          order: [['createdAt', 'DESC']],
        }],
      }, {
        model: User,
        as: 'Likers',
        attributes: ['id'],
      }, {
		model : User,
		as:'Scrappers',
		attributes:['id', 'nickname']
	  }],
    });
    res.status(200).json(posts);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

module.exports = router;
