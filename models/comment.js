'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Comment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Comment.belongsTo(models.Posts,{
        foreignKey:"post_id"
      })

      Comment.belongsTo(models.User,{
        foreignKey:"user_id"
      })

       Comment.hasMany(models.Comment, {
        as: 'replies',
        foreignKey: 'parent_id',
      });
    }
  }
  Comment.init({
    comment_description: DataTypes.STRING,
    post_id:{
      type: DataTypes.INTEGER,
      references:{
        model:"Posts",
        key:"id"
      }
    },
    user_id:{
      type:DataTypes.INTEGER,
      references:{
        model:"User",
        key:"id"
      }
    },
      parent_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: 'comments', 
          key: 'id',
        }
      }
  }, {
    sequelize,
    modelName: 'Comment',
    tableName:"comments"
  });
  return Comment;
};