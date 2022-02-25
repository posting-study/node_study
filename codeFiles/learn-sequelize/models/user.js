const Sequelize = require('sequelize');

module.exports = class User extends Sequelize.Model {
    static init(sequelize) {
        return super.init({
          name: {
            type: Sequelize.STRING(20), //VARCHAR(x)
            allowNull: false, // false 값이면 NOTNULL
            unique: true,
          },
          age: {
            type: Sequelize.INTEGER.UNSIGNED, //age 경우엔 TINYINT 써도 가능
            allowNull: false,
          },
          married: {
            type: Sequelize.BOOLEAN, // 1,0이 아닌 true/false
            allowNull: false,
          },
          comment: {
            type: Sequelize.TEXT,
            allowNull: true,
          },
          created_at: {
            type: Sequelize.DATE,
            allowNull: false,
            defaultValue: Sequelize.NOW,
          },
        }, {
          sequelize,
          timestamps: false,
          underscored: false,
          modelName: 'User',
          tableName: 'use    rs',
          paranoid: false,
          charset: 'utf8',
          collate: 'utf8_general_ci',
        });
      }
      static associate(db) {
        db.User.hasMany(db.Comment,{foreignKey:'commenter', sourceKey: 'id'}); 
      }
}