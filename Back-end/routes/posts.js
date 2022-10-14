const express = require('express');
const { Op } = require('sequelize');

const { Post, Image, User, Comment } = require('../models');

const router = express.Router();

router.get('/', async (req, res, next) => {
  try {
    const where = { hidden_mode: false, category: req.query.category };
    if (parseInt(req.query.lastId, 10)) {
      where.id = { [Op.lt]: parseInt(req.query.lastId, 10) };
    }
    let limit = parseInt(req.query.limit, 10);
    if (limit !== 3) {
      limit = 10;
    }
    const posts = await Post.findAll({
      where,
      limit,
      order: [
        ['createdAt', 'DESC'],
        [Comment, 'createdAt', 'DESC'],
      ],
      include: [
        {
          model: User,
          attributes: ['id', 'nickname', 'followers'],
        },
        {
          model: Image,
        },
        {
          model: Comment,
          include: [
            {
              model: User,
              attributes: ['id', 'nickname', 'followers'],
            },
          ],
        },
        {
          model: User,
          as: 'Likers',
          attributes: ['id'],
        },
        {
          model: User,
          as: 'Scrappers',
          attributes: ['id', 'nickname'],
        },
      ],
    });
    res.status(200).json(posts);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

router.get('/hot', async (req, res, next) => {
  try {
    const where = { hidden_mode: false };
    where.like_counts = { [Op.gt]: 2 };
    let limit = 20;
    console.log(req.query.limit);
    if (req.query.limit) {
      limit = req.query.limit;
    }
    const posts = await Post.findAll({
      where,
      limit: 10,
      order: [
        ['createdAt', 'DESC'],
        [Comment, 'createdAt', 'DESC'],
      ],
      include: [
        {
          model: User,
          attributes: ['id', 'nickname', 'followers'],
        },
        {
          model: Image,
        },
        {
          model: Comment,
          include: [
            {
              model: User,
              attributes: ['id', 'nickname', 'followers'],
            },
          ],
        },
        {
          model: User,
          as: 'Likers',
          attributes: ['id'],
        },
        {
          model: User,
          as: 'Scrappers',
          attributes: ['id', 'nickname'],
        },
      ],
    });
    res.status(200).json(posts);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

router.get('/popular', async (req, res, next) => {
  try {
    const where = { hidden_mode: false };
    where.like_counts = { [Op.gt]: 2 };
    let limit = 20;
    console.log(req.query.limit);
    if (req.query.limit) {
      limit = req.query.limit;
    }
    const posts = await Post.findAll({
      where,
      limit: 3,
      order: [
        ['createdAt', 'DESC'],
        [Comment, 'createdAt', 'DESC'],
      ],
      include: [
        {
          model: User,
          attributes: ['id', 'nickname', 'followers'],
        },
        {
          model: Image,
        },
        {
          model: Comment,
          include: [
            {
              model: User,
              attributes: ['id', 'nickname', 'followers'],
            },
          ],
        },
        {
          model: User,
          as: 'Likers',
          attributes: ['id'],
        },
        {
          model: User,
          as: 'Scrappers',
          attributes: ['id', 'nickname'],
        },
      ],
    });
    res.status(200).json(posts);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

router.get('/related', async (req, res, next) => {
  try {
    const followings = await User.findAll({
      attributes: ['id'],
      include: [
        {
          model: User,
          as: 'Followers',
          where: { id: req.user.id },
        },
      ],
    });
    const where = {
      UserId: { [Op.in]: followings.map((v) => v.id) },
      hidden_mode: false,
      private_mode: false,
    };
    if (parseInt(req.query.lastId, 10)) {
      where.id = { [Op.lt]: parseInt(req.query.lastId, 10) };
    }
    const posts = await Post.findAll({
      where,
      limit: 10,
      order: [
        ['createdAt', 'DESC'],
        [Comment, 'createdAt', 'DESC'],
      ],
      include: [
        {
          model: User,
          attributes: ['id', 'nickname', 'followers'],
        },
        {
          model: Image,
        },
        {
          model: Comment,
          include: [
            {
              model: User,
              attributes: ['id', 'nickname', 'followers'],
            },
          ],
        },
        {
          model: User,
          as: 'Likers',
          attributes: ['id'],
        },
        {
          model: User,
          as: 'Scrappers',
          attributes: ['id', 'nickname'],
        },
      ],
    });
    res.status(200).json(posts);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

router.get('/unrelated', async (req, res, next) => {
  try {
    const followings = await User.findAll({
      attributes: ['id'],
      include: [
        {
          model: User,
          as: 'Followers',
          where: { id: req.user.id },
        },
      ],
    });
    const where = {
      UserId: { [Op.notIn]: followings.map((v) => v.id).concat(req.user.id) },
      hidden_mode: false,
    };
    if (parseInt(req.query.lastId, 10)) {
      where.id = { [Op.lt]: parseInt(req.query.lastId, 10) };
    }
    const posts = await Post.findAll({
      where,
      limit: 10,
      order: [
        ['createdAt', 'DESC'],
        [Comment, 'createdAt', 'DESC'],
      ],
      include: [
        {
          model: User,
          attributes: ['id', 'nickname', 'followers'],
        },
        {
          model: Image,
        },
        {
          model: Comment,
          include: [
            {
              model: User,
              attributes: ['id', 'nickname', 'followers'],
            },
          ],
        },
        {
          model: User,
          as: 'Likers',
          attributes: ['id'],
        },
        {
          model: User,
          as: 'Scrappers',
          attributes: ['id', 'nickname'],
        },
      ],
    });
    res.status(200).json(posts);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

module.exports = router;
