'use strict';
module.exports = (sequelize, DataTypes) => {
  var Topic = sequelize.define('Topic', {
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },

    description: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {});
  Topic.associate = function(models) {
    // associations can be defined here
    Topic.hasMany(models.Banner, {
      foreignKey: "topicID",
      as: "banners",
    });

    Topic.hasMany(models.Rules, {
      foreignKey: "topicID",
      as: "rules",
    });

    Topic.hasMany(models.Post, {
      foreignKey: "topicId",
      as: "posts"
    });
  };
  return Topic;
};
