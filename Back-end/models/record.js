const DataTypes = require('sequelize');
const { Model } = DataTypes;

module.exports = class Record extends Model {
  static init(sequelize) {
    return super.init(
      {
        category: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        reason: {
          type: DataTypes.STRING(300),
          allowNull: false,
        },
        num_of_days: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
      },
      {
        modelName: 'Record',
        tableName: 'records',
        charset: 'utf8',
        collate: 'utf8_general_ci',
        sequelize,
      }
    );
  }
  static associate(db) {
    db.Record.belongsTo(db.User);
  }
};
