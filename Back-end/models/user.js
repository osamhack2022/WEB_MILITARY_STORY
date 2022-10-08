const DataTypes = require('sequelize');
const { Model } = DataTypes;

module.exports = class Post extends Model {
  static init(sequelize) {
    return super.init({
      email: {
        type: DataTypes.STRING(30),
        allowNull: false,
        unique: true,
      },
      nickname: {
        type: DataTypes.STRING(30),
        allowNull: false,
      },
      password: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
	  annual: {
	    type: DataTypes.INTEGER,
	    allowNull: false,
	  },
	  reward: {
	    type: DataTypes.INTEGER,
	    allowNull: false,
	  },
	  compensation:{
	    type: DataTypes.INTEGER,
	    allowNull: false,
	  },
	  consolation: {
	    type: DataTypes.INTEGER,
	    allowNull: false,
	  },
	  petition: {
	    type: DataTypes.INTEGER,
	    allowNull: false,
	  },
	  start_date: {
		type: DataTypes.DATE,
		allowNull: false,
	  },
      end_date: {
		type: DataTypes.DATE,
		allowNull: false,
	  }
    }, {
      modelName: 'User',
      tableName: 'users',
      charset: 'utf8',
      collate: 'utf8_general_ci', 
      sequelize,
    });
  }
  static associate(db) {
    db.User.hasMany(db.Post);
    db.User.hasMany(db.Comment, {as : 'Comments'});
    db.User.hasMany(db.Record);
	db.User.belongsToMany(db.Post, { through: 'Scrap', as : 'Scrapped'})
    db.User.belongsToMany(db.Post, { through: 'Like', as: 'Liked' })
    db.User.belongsToMany(db.User, { through: 'Follow', as: 'Followers', foreignKey: 'FollowingId' });
    db.User.belongsToMany(db.User, { through: 'Follow', as: 'Followings', foreignKey: 'FollowerId' });
  }
};
