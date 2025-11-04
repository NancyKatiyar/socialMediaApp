'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Posts extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Posts.belongsTo(models.User,{
        foreignKey:"user_id"
      })

      Posts.hasMany(models.Comment,{
        foreignKey:"post_id"
      })
    }
  }
  Posts.init({
    post_title: DataTypes.STRING,
    image: DataTypes.STRING,
    user_id: {
      type:DataTypes.INTEGER,
      references:{
        model:"User",
        key:"id"
      }
    },
    visibility:DataTypes.ENUM("EveryOneCan view","Only Me")
  }, {
    sequelize,
    modelName: 'Posts',
    tableName:"posts"
  });
  return Posts;
};