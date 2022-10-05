const DataTypes = require('sequelize');
const { Model } = DataTypes;

module.exports = class Userid extends Model {
  static init(sequelize) {
    return super.init(
      {
        my_id: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
      },
      {
        modelName: 'Userid',
        tableName: 'userids',
        charset: 'utf8mb4',
        collate: 'utf8mb4_general_ci',
        sequelize,
      }
    );
  }

  static associate(db) {
    db.Userid.belongsTo(db.Post);
  }
};
