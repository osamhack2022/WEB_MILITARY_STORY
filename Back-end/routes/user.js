const express = require('express');
const bcrypt = require('bcrypt');
const passport = require('passport');
const { Op } = require('sequelize');

const { User, Post, Image, Comment } = require('../models');
const { isLoggedIn, isNotLoggedIn } = require('./middlewares');

const router = express.Router();

router.get('/', async (req, res, next) => {
  try {
    if (req.user) {
      const fullUserWithoutPassword = await User.findOne({
        where: { id: req.user.id },
        attributes: {
          exclude: ['password'],
        },
        include: [
          {
            model: Post,
            attributes: ['id'],
          },
          {
            model: User,
            as: 'Followings',
            attributes: ['id'],
          },
          {
            model: User,
            as: 'Followers',
            attributes: ['id'],
          },
          {
            model: Post,
            as: 'Scrapped',
            attributes: ['id'],
          },
        ],
      });
      res.status(200).json(fullUserWithoutPassword);
    } else {
      res.status(200).json(null);
    }
  } catch (error) {
    console.error(error);
    next(error);
  }
});

router.get('/comments', isLoggedIn, async (req, res, next) => {
  try {
    let my_comments = [];
    const user = await User.findOne({
      where: { id: req.user.id },
      include: [
        {
          model: Comment,
          as: 'Comments',
        },
      ],
    });
    if (!user) {
      res.status(403).send('없는 사람을 찾으려고 하시네요?');
    }

    const comments = await user.getComments();
    for (let i = 0; i < comments.length; i++) {
      if (comments[i].dataValues.PostId !== null) {
        const my_post = await Post.findOne({
          where: { id: comments[i].dataValues.PostId, hidden_mode: false },
          attributes: ['id', 'content', 'updatedAt', 'createdAt'],
          include: [
            {
              model: User,
              attributes: ['id', 'nickname'],
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
            {
              model: Comment,
              attributes: ['id'],
            },
            {
              model: Image,
            },
          ],
        });
        if (my_post) {
          my_comments.push([comments[i], my_post]);
        }
      }
    }
    res.status(200).json(my_comments);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

router.get('/scrap', isLoggedIn, async (req, res, next) => {
  try {
    const user = await User.findOne({ where: { id: req.user.id } });
    if (!user) {
      res.status(403).send('없는 사람을 찾으려고 하시네요?');
    }
    const scrapped = await user.getScrapped();

    let my_scrapped = [];

    for (let i = 0; i < scrapped.length; i++) {
      console.log(scrapped[i]);
      const post = await Post.findOne({
        where: { id: scrapped[i].dataValues.id, hidden_mode: false },
        order: [
          ['createdAt', 'DESC'],
          [Comment, 'createdAt', 'DESC'],
        ],
        include: [
          {
            model: User,
            attributes: ['id', 'nickname'],
          },
          {
            model: Image,
          },
          {
            model: Comment,
            include: [
              {
                model: User,
                attributes: ['id', 'nickname'],
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
      my_scrapped.push(post);
    }

    res.status(200).json(my_scrapped);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

router.get('/followers', isLoggedIn, async (req, res, next) => {
  try {
    const user = await User.findOne({ where: { id: req.user.id } });
    if (!user) {
      res.status(403).send('없는 사람을 찾으려고 하시네요?');
    }
    const followers = await user.getFollowers({
      limit: parseInt(req.query.limit, 10),
    });
    res.status(200).json(followers);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

router.get('/followings', isLoggedIn, async (req, res, next) => {
  try {
    const user = await User.findOne({ where: { id: req.user.id } });
    if (!user) {
      res.status(403).send('없는 사람을 찾으려고 하시네요?');
    }
    const followings = await user.getFollowings({
      limit: parseInt(req.query.limit, 10),
    });
    res.status(200).json(followings);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

router.get('/:userId', async (req, res, next) => {
  try {
    const fullUserWithoutPassword = await User.findOne({
      where: { id: req.params.userId },
      attributes: {
        exclude: ['password'],
      },
      include: [
        {
          model: Post,
          attributes: ['id'],
        },
        {
          model: User,
          as: 'Followings',
          attributes: ['id'],
        },
        {
          model: User,
          as: 'Followers',
          attributes: ['id'],
        },
        {
          model: Post,
          as: 'Scrapped',
          attributes: ['id'],
        },
      ],
    });
    if (fullUserWithoutPassword) {
      const data = fullUserWithoutPassword.toJSON();
      data.Posts = data.Posts.length;
      data.Followers = data.Followers.length;
      data.Followings = data.Followings.length;
      res.status(200).json(data);
    } else {
      res.status(404).json('존재하지 않는 사용자입니다.');
    }
  } catch (error) {
    console.error(error);
    next(error);
  }
});

router.get('/me/posts', async (req, res, next) => {
  try {
    if (req.user) {
      const where = { UserId: req.user.id, hidden_mode: false };
      const posts = await Post.findAll({
        where,
        limit: 10,
        order: [['createdAt', 'DESC']],
        include: [
          {
            model: User,
            attributes: ['id', 'nickname'],
          },
          {
            model: Image,
          },
          {
            model: Comment,
            include: [
              {
                model: User,
                attributes: ['id', 'nickname'],
                order: [['createdAt', 'DESC']],
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
      console.log(posts);
      res.status(200).json(posts);
    } else {
      console.log('no req.user');
      res.status(200).json(null);
    }
  } catch (error) {
    console.error(error);
    next(error);
  }
});

router.get('/:userId/posts', async (req, res, next) => {
  try {
    const where = {
      UserId: req.params.userId,
      private_mode: false,
      hidden_mode: false,
    };
    if (parseInt(req.query.lastId, 10)) {
      where.id = { [Op.lt]: parseInt(req.query.lastId, 10) };
    }
    const posts = await Post.findAll({
      where,
      limit: 10,
      order: [['createdAt', 'DESC']],
      include: [
        {
          model: User,
          attributes: ['id', 'nickname'],
        },
        {
          model: Image,
        },
        {
          model: Comment,
          include: [
            {
              model: User,
              attributes: ['id', 'nickname'],
              order: [['createdAt', 'DESC']],
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

router.post('/login', isNotLoggedIn, (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    if (err) {
      console.error(err);
      return next(err);
    }
    if (info) {
      return res.status(401).send(info.reason);
    }
    return req.login(user, async (loginErr) => {
      if (loginErr) {
        console.error(loginErr);
        return next(loginErr);
      }
      const fullUserWithoutPassword = await User.findOne({
        where: { id: user.id },
        attributes: {
          exclude: ['password'],
        },
        include: [
          {
            model: Post,
            attributes: ['id'],
          },
          {
            model: User,
            as: 'Followings',
            attributes: ['id'],
          },
          {
            model: User,
            as: 'Followers',
            attributes: ['id'],
          },
          {
            model: Post,
            as: 'Scrapped',
            attributes: ['id'],
          },
        ],
      });
      return res.status(200).json(fullUserWithoutPassword);
    });
  })(req, res, next);
});

router.post('/', isNotLoggedIn, async (req, res, next) => {
  try {
    const exUser = await User.findOne({
      where: {
        email: req.body.email,
      },
    });
    if (exUser) {
      return res.status(403).send('이미 사용 중인 아이디입니다.');
    }
    const hashedPassword = await bcrypt.hash(req.body.password, 12);
    await User.create({
      email: req.body.email,
      nickname: req.body.nickname,
      password: hashedPassword,
    });
    res.status(201).send('ok');
  } catch (error) {
    console.error(error);
    next(error);
  }
});

router.post('/logout', isLoggedIn, (req, res) => {
  req.logout();
  req.session.destroy();
  res.send('ok');
});

router.patch('/nickname', isLoggedIn, async (req, res, next) => {
  try {
    await User.update(
      {
        nickname: req.body.nickname,
      },
      {
        where: { id: req.user.id },
      }
    );
    res.status(200).json({ nickname: req.body.nickname });
  } catch (error) {
    console.error(error);
    next(error);
  }
});

router.patch('/:userId/following', isLoggedIn, async (req, res, next) => {
  try {
    const user = await User.findOne({ where: { id: req.params.userId } });
    if (!user) {
      res.status(403).send('없는 사람을 팔로우하려고 하시네요?');
    }
    await user.addFollowers(req.user.id);
    res.status(200).json({ UserId: parseInt(req.params.userId, 10) });
  } catch (error) {
    console.error(error);
    next(error);
  }
});

router.delete('/:userId/following', isLoggedIn, async (req, res, next) => {
  try {
    const user = await User.findOne({ where: { id: req.params.userId } });
    if (!user) {
      res.status(403).send('없는 사람을 언팔로우하려고 하시네요?');
    }
    await user.removeFollowers(req.user.id);
    res.status(200).json({ UserId: parseInt(req.params.userId, 10) });
  } catch (error) {
    console.error(error);
    next(error);
  }
});

router.delete('/follower/:userId', isLoggedIn, async (req, res, next) => {
  try {
    const user = await User.findOne({ where: { id: req.params.userId } });
    if (!user) {
      res.status(403).send('없는 사람을 차단하려고 하시네요?');
    }
    await user.removeFollowings(req.user.id);
    res.status(200).json({ UserId: parseInt(req.params.userId, 10) });
  } catch (error) {
    console.error(error);
    next(error);
  }
});

module.exports = router;
