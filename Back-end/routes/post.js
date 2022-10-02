const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const multerS3 = require('multer-s3');
const AWS = require('aws-sdk');

const { Post, Image, Comment, User, Hashtag } = require('../models');
const { isLoggedIn } = require('./middlewares');

const router = express.Router();

try {
  fs.accessSync('uploads');
} catch (error) {
  fs.mkdirSync('uploads');
}

try{
	AWS.config.update({
  accessKeyId: process.env.S3_ACCESS_KEY_ID,
  secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
  region: 'ap-northeast-2',
});
} catch(error){
	console.log(error)
}



const upload = multer({
  storage: multerS3({
    s3: new AWS.S3(),
    bucket: 'osam-back',
    key(req, file, cb) {
      cb(null, `original/${Date.now()}_${path.basename(file.originalname)}`)
    }
  }),
  limits: { fileSize: 20 * 1024 * 1024 }, // 20MB
});

router.post('/', isLoggedIn, upload.none(), async (req, res, next) => { // POST /post
  try {
    const hashtags = req.body.content.match(/#[^\s#]+/g);
    const post = await Post.create({
      content: req.body.content,
	  category: req.body.category[1],
      UserId: req.user.id,
	  private_mode: req.body.private_mode
    });
	  
    if (hashtags) {
      const result = await Promise.all(hashtags.map((tag) => Hashtag.findOrCreate({
        where: { name: tag.slice(1).toLowerCase() },
      }))); 
	
      await post.addHashtags(result.map((v) => v[0]));
    }
    if (req.body.image) {
      if (Array.isArray(req.body.image)) { 
        const images = await Promise.all(req.body.image.map((image) => Image.create({ src: image })));
        await post.addImages(images);
      } else {
        const image = await Image.create({ src: req.body.image });
        await post.addImages(image);
      }
    }
    const fullPost = await Post.findOne({
      where: { id: post.id },
      include: [{
        model: Image,
      }, {
        model: Comment,
        include: [{
          model: User, // 댓글 작성자
          attributes: ['id', 'nickname'],
        }],
      }, {
        model: User, // 게시글 작성자
        attributes: ['id', 'nickname'],
      }, {
        model: User, // 좋아요 누른 사람
        as: 'Likers',
        attributes: ['id'],
      }, {
		model: User,
		as : 'Scrappers',
		attribute: ['id'],
	  }]
    })
    res.status(201).json(fullPost);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

router.post('/images', isLoggedIn, upload.array('image'), (req, res, next) => { // POST /post/images
  console.log(req.files);
  res.json(req.files.map((v) => v.location.replace(/\/original\//, '/thumb/')));
});

router.get('/:postId', async (req, res, next) => { // GET /post/1
  try {
    const post = await Post.findOne({
      where: { id: req.params.postId },
    });
    if (!post) {
      return res.status(404).send('존재하지 않는 게시글입니다.');
    }
    const fullPost = await Post.findOne({
      where: { id: post.id },
      include: [{
        model: User,
        attributes: ['id', 'nickname'],
      }, {
        model: User,
        as: 'Likers',
        attributes: ['id', 'nickname'],
      }, {
		model: User,
		as: 'Scrappers',
		attributes: ['id', 'nickname'],
	  }, {
        model: Image,
      }, {
        model: Comment,
        include: [{
          model: User,
          attributes: ['id', 'nickname'],
        }],
      }],
    })
    res.status(200).json(fullPost);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

router.patch('/:postId/scrap', isLoggedIn, async (req, res, next) => { 
  try {
    const post = await Post.findOne({where : {id : req.params.postId}});
	if(!post){
		return res.status(403).send("게시글이 존재하지 않습니다.")
	}
	await post.addScrappers(req.user.id)
	
	const user = await User.findOne({where: {id : req.user.id }})
    await user.addScrapped(post.id)
	  
	console.log({postId: post.id, UserId: req.user.id})
	  
	res.json({PostId: post.id, UserId: req.user.id})
  } catch (error) {
    console.error(error);
    next(error);
  }
});

router.delete('/:postId/scrap', isLoggedIn, async(req, res, next)=>{
	try{
	  const post = await Post.findOne({where: { id: req.params.postId }})
	  if(!post){
		return res.status(403).send("게시글이 존재하지 않습니다.")
	  }
      await post.removeScrappers(req.user.id)
      
	  const user = await User.findOne({where: { id : req.user.id }})
	  await user.removeScrapped(post.id)
		
	  res.json({PostId : post.id, UserId: req.user.id})
	}
	catch(error){
	  console.error(error)
	  next(error)
	}
})

router.post('/:postId/comment', isLoggedIn, async (req, res, next) => { // POST /post/1/comment
  try {
    const post = await Post.findOne({
      where: { id: req.params.postId },
    });
    if (!post) {
      return res.status(403).send('존재하지 않는 게시글입니다.');
    }
    const comment = await Comment.create({
      content: req.body.content,
      PostId: parseInt(req.params.postId, 10),
      UserId: req.user.id,
    })
    const fullComment = await Comment.findOne({
      where: { id: comment.id },
      include: [{
        model: User,
        attributes: ['id', 'nickname'],
      }],
    })
    res.status(201).json(fullComment);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

router.delete('/:commentId/comment', isLoggedIn, async(req, res, next)=>{
  try{
	await Comment.destroy({
      where: {
    	id: req.params.commentId,
        UserId: req.user.id,
      },
    });
	res.status(200).json({ commentId: parseInt(req.params.commentId, 10) });
	}
  catch(error){
	  console.error(error)
	  next(error)
  }
})

router.patch('/:postId/like', isLoggedIn, async (req, res, next) => { // PATCH /post/1/like
  try {
    const post = await Post.findOne({ where: { id: req.params.postId }});
    if (!post) {
      return res.status(403).send('게시글이 존재하지 않습니다.');
    }
    await post.addLikers(req.user.id);
    res.json({ PostId: post.id, UserId: req.user.id });
  } catch (error) {
    console.error(error);
    next(error);
  }
});

router.delete('/:postId/like', isLoggedIn, async (req, res, next) => { // DELETE /post/1/like
  try {
    const post = await Post.findOne({ where: { id: req.params.postId }});
    if (!post) {
      return res.status(403).send('게시글이 존재하지 않습니다.');
    }
    await post.removeLikers(req.user.id);
    res.json({ PostId: post.id, UserId: req.user.id });
  } catch (error) {
    console.error(error);
    next(error);
  }
});

router.patch('/:postId', isLoggedIn, async (req, res, next) => { // PATCH /post/10
  const hashtags = req.body.content.match(/#[^\s#]+/g);
  try {
    await Post.update({
      content: req.body.content
    }, {
      where: {
        id: req.params.postId,
        UserId: req.user.id,
      },
    });
    const post = await Post.findOne({ where: { id: req.params.postId }});
    if (hashtags) {
      const result = await Promise.all(hashtags.map((tag) => Hashtag.findOrCreate({
        where: { name: tag.slice(1).toLowerCase() },
      }))); // [[노드, true], [리액트, true]]
      await post.setHashtags(result.map((v) => v[0]));
    }
    res.status(200).json({ PostId: parseInt(req.params.postId, 10), content: req.body.content });
  } catch (error) {
    console.error(error);
    next(error);
  }
});

router.delete('/:postId', isLoggedIn, async (req, res, next) => { // DELETE /post/10
  try {
    await Post.destroy({
      where: {
        id: req.params.postId,
        UserId: req.user.id,
      },
    });
    res.status(200).json({ PostId: parseInt(req.params.postId, 10) });
  } catch (error) {
    console.error(error);
    next(error);
  }
});

module.exports = router;
